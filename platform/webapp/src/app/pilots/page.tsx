'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { apiFetch, type Envelope, type ListEnvelope } from '@/lib/api';
import type { Pilot } from '@/lib/types';

export default function PilotsPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    name: '',
    sponsorId: 'usr_demo_sponsor',
    successMetric: '',
  });
  const [charter, setCharter] = useState({
    pilotId: '',
    sponsorId: 'usr_demo_sponsor',
    objectives: '',
    realWorldHoldoutMetric: '',
  });

  const list = useQuery({
    queryKey: ['pilots'],
    queryFn: () => apiFetch<ListEnvelope<Pilot>>('/v1/pilots'),
  });

  const create = useMutation({
    mutationFn: () =>
      apiFetch<Envelope<Pilot>>('/v1/pilots', {
        method: 'POST',
        idempotencyKey: `plt-${Date.now()}`,
        body: JSON.stringify(form),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['pilots'] });
      setForm((f) => ({ ...f, name: '', successMetric: '' }));
    },
  });

  const upsertCharter = useMutation({
    mutationFn: () =>
      apiFetch(`/v1/pilots/${charter.pilotId}/charter`, {
        method: 'PUT',
        idempotencyKey: `chr-${charter.pilotId}-${Date.now()}`,
        body: JSON.stringify({
          sponsorId: charter.sponsorId,
          objectives: charter.objectives,
          realWorldHoldoutMetric: charter.realWorldHoldoutMetric,
        }),
      }),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink">Pilots and charters</h1>
        <p className="mt-2 text-steel">
          APMF charter with named sponsor and real-world holdout metrics.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <input
          placeholder="Pilot name"
          className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          placeholder="Sponsor id"
          className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
          value={form.sponsorId}
          onChange={(e) => setForm((f) => ({ ...f, sponsorId: e.target.value }))}
        />
        <input
          placeholder="Real-world success metric"
          className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
          value={form.successMetric}
          onChange={(e) => setForm((f) => ({ ...f, successMetric: e.target.value }))}
        />
      </div>
      <button
        type="button"
        onClick={() => create.mutate()}
        className="rounded-md bg-chalk px-4 py-2 text-sm font-medium text-graphite-950"
      >
        Create pilot
      </button>

      <div className="space-y-2">
        {(list.data?.data.items ?? []).map((p) => (
          <button
            key={p.pilotId}
            type="button"
            onClick={() =>
              setCharter((c) => ({
                ...c,
                pilotId: p.pilotId,
                sponsorId: p.sponsorId,
                realWorldHoldoutMetric: p.successMetric,
              }))
            }
            className="flex w-full items-center justify-between rounded-md border border-white/10 bg-graphite-900 px-4 py-3 text-left hover:border-chalk/40"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="font-mono text-xs text-steel">{p.pilotId}</p>
            </div>
            <span className="text-sm text-steel">{p.status}</span>
          </button>
        ))}
      </div>

      {charter.pilotId && (
        <section className="rounded-md border border-chalk/30 bg-graphite-900 p-4">
          <h2 className="font-display text-xl text-brand">Sponsor charter lock</h2>
          <p className="mt-1 text-sm text-steel">
            Production data stays locked until sponsor + charter are set.
          </p>
          <textarea
            className="mt-3 w-full rounded-md border border-white/10 bg-graphite-950 px-3 py-2"
            rows={3}
            placeholder="Objectives"
            value={charter.objectives}
            onChange={(e) => setCharter((c) => ({ ...c, objectives: e.target.value }))}
          />
          <input
            className="mt-2 w-full rounded-md border border-white/10 bg-graphite-950 px-3 py-2"
            placeholder="Real-world holdout metric"
            value={charter.realWorldHoldoutMetric}
            onChange={(e) =>
              setCharter((c) => ({ ...c, realWorldHoldoutMetric: e.target.value }))
            }
          />
          <button
            type="button"
            onClick={() => upsertCharter.mutate()}
            className="mt-3 rounded-md bg-passport/20 px-4 py-2 text-sm text-passport"
          >
            Submit charter
          </button>
        </section>
      )}
    </div>
  );
}
