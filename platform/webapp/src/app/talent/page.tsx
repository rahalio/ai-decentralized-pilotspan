'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { apiFetch, type ListEnvelope } from '@/lib/api';
import type { Pilot, TalentAssignment } from '@/lib/types';

const ROLES = [
  'data_scientist',
  'domain_specialist',
  'engineer',
  'product_owner',
  'scrum_master',
] as const;

export default function TalentPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    pilotId: '',
    role: 'domain_specialist' as (typeof ROLES)[number],
    personId: '',
    hoursCommitted: 1,
    domainConsultBookedAt: '',
  });

  const pilots = useQuery({
    queryKey: ['pilots'],
    queryFn: () => apiFetch<ListEnvelope<Pilot>>('/v1/pilots'),
  });
  const list = useQuery({
    queryKey: ['talent'],
    queryFn: () => apiFetch<ListEnvelope<TalentAssignment>>('/v1/talent-assignments'),
  });

  const create = useMutation({
    mutationFn: () =>
      apiFetch('/v1/talent-assignments', {
        method: 'POST',
        idempotencyKey: `tal-${Date.now()}`,
        body: JSON.stringify({
          ...form,
          domainConsultBookedAt: form.domainConsultBookedAt || undefined,
        }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['talent'] }),
  });

  const byRole = ROLES.map((role) => ({
    role,
    items: (list.data?.data.items ?? []).filter((t) => t.role === role),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink">Dream-team casting</h1>
        <p className="mt-2 text-steel">
          ATF roles — even one-hour domain specialist slots count.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-5">
        <select
          className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
          value={form.pilotId}
          onChange={(e) => setForm((f) => ({ ...f, pilotId: e.target.value }))}
        >
          <option value="">Pilot</option>
          {(pilots.data?.data.items ?? []).map((p) => (
            <option key={p.pilotId} value={p.pilotId}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
          value={form.role}
          onChange={(e) =>
            setForm((f) => ({ ...f, role: e.target.value as (typeof ROLES)[number] }))
          }
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <input
          className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
          placeholder="Person id"
          value={form.personId}
          onChange={(e) => setForm((f) => ({ ...f, personId: e.target.value }))}
        />
        <input
          type="number"
          min={0}
          className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
          value={form.hoursCommitted}
          onChange={(e) => setForm((f) => ({ ...f, hoursCommitted: Number(e.target.value) }))}
        />
        <button
          type="button"
          disabled={!form.pilotId || !form.personId}
          onClick={() => create.mutate()}
          className="rounded-md bg-chalk px-4 py-2 text-sm text-graphite-950 disabled:opacity-40"
        >
          Assign
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        {byRole.map(({ role, items }) => (
          <section
            key={role}
            className="rounded-md border border-white/10 bg-graphite-900 p-3"
          >
            <h2 className="text-xs uppercase tracking-wide text-steel">{role}</h2>
            <p className="mt-1 font-mono text-lg text-chalk">{items.length}</p>
            <ul className="mt-2 space-y-1 text-xs text-steel">
              {items.map((t) => (
                <li key={t.assignmentId}>
                  {t.personId}
                  {t.hoursCommitted != null ? ` · ${t.hoursCommitted}h` : ''}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
