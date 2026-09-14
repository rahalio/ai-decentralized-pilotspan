'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { apiFetch, type ListEnvelope } from '@/lib/api';
import type { ShadowAiSystem } from '@/lib/types';

export default function ShadowPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: '', department: '', riskNotes: '' });

  const list = useQuery({
    queryKey: ['shadow'],
    queryFn: () => apiFetch<ListEnvelope<ShadowAiSystem>>('/v1/shadow-ai-systems'),
  });

  const create = useMutation({
    mutationFn: () =>
      apiFetch('/v1/shadow-ai-systems', {
        method: 'POST',
        idempotencyKey: `sha-${Date.now()}`,
        body: JSON.stringify(form),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['shadow'] });
      setForm({ name: '', department: '', riskNotes: '' });
    },
  });

  const remediate = useMutation({
    mutationFn: ({ id, action }: { id: string; action: string }) =>
      apiFetch(`/v1/shadow-ai-systems/${id}/remediation`, {
        method: 'POST',
        idempotencyKey: `shar-${id}-${action}-${Date.now()}`,
        body: JSON.stringify({ action }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['shadow'] }),
  });

  const items = list.data?.data.items ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink">Shadow AI register</h1>
        <p className="mt-2 text-steel">
          Discover piecemeal department tools — claim, remediate, or retire.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        <input
          className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
          placeholder="System name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
        />
        <button
          type="button"
          onClick={() => create.mutate()}
          className="rounded-md bg-chalk px-4 py-2 text-sm text-graphite-950"
        >
          Register discovery
        </button>
      </div>

      {items.length === 0 ? (
        <p className="rounded-md border border-dashed border-white/15 px-4 py-8 text-center text-steel">
          Monitored clear — no open shadow systems.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((s) => (
            <div
              key={s.systemId}
              className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-graphite-900 px-4 py-3"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-steel">
                  {s.department} · {s.status}
                </p>
              </div>
              <div className="flex gap-2">
                {(['claim', 'remediate', 'retire', 'onboard'] as const).map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => remediate.mutate({ id: s.systemId, action })}
                    className="rounded-md border border-white/10 px-2 py-1 text-xs text-steel hover:text-ink"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
