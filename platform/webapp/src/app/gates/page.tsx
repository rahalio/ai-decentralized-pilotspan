'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch, type Envelope, type ListEnvelope } from '@/lib/api';
import type { AnonymisationGate, Pilot } from '@/lib/types';

const TECHNIQUES = [
  'aggregateScore',
  'removeScore',
  'topBottomCodingScore',
  'groupScore',
  'hashDigestScore',
] as const;

const LABELS: Record<(typeof TECHNIQUES)[number], string> = {
  aggregateScore: 'Aggregate',
  removeScore: 'Remove',
  topBottomCodingScore: 'Top/Bottom',
  groupScore: 'Group',
  hashDigestScore: 'Hash',
};

export default function GatesPage() {
  const qc = useQueryClient();
  const pilots = useQuery({
    queryKey: ['pilots'],
    queryFn: () => apiFetch<ListEnvelope<Pilot>>('/v1/pilots'),
  });
  const gates = useQuery({
    queryKey: ['gates'],
    queryFn: () => apiFetch<ListEnvelope<AnonymisationGate>>('/v1/anonymisation-gates'),
  });

  const [form, setForm] = useState({
    pilotId: '',
    aggregateScore: 3,
    removeScore: 3,
    topBottomCodingScore: 3,
    groupScore: 3,
    hashDigestScore: 3,
    correlatedFeatureNotes: '',
  });

  const submit = useMutation({
    mutationFn: () =>
      apiFetch<Envelope<AnonymisationGate>>('/v1/anonymisation-gates', {
        method: 'POST',
        idempotencyKey: `ang-${Date.now()}`,
        body: JSON.stringify(form),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gates'] }),
  });

  const decide = useMutation({
    mutationFn: ({ id, outcome }: { id: string; outcome: 'pass' | 'fail' }) =>
      apiFetch(`/v1/anonymisation-gates/${id}/decision`, {
        method: 'POST',
        idempotencyKey: `angd-${id}-${outcome}-${Date.now()}`,
        body: JSON.stringify({ outcome, rationale: outcome === 'fail' ? 'Below threshold' : 'Passport sealed' }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gates'] }),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink">Anonymisation passport</h1>
        <p className="mt-2 text-steel">
          Score Aggregate → Hash. Fail blocks; waive is never allowed.
        </p>
      </div>

      <select
        className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
        value={form.pilotId}
        onChange={(e) => setForm((f) => ({ ...f, pilotId: e.target.value }))}
      >
        <option value="">Select pilot</option>
        {(pilots.data?.data.items ?? []).map((p) => (
          <option key={p.pilotId} value={p.pilotId}>
            {p.name}
          </option>
        ))}
      </select>

      <div className="grid gap-3 md:grid-cols-5">
        {TECHNIQUES.map((key) => (
          <label key={key} className="rounded-md border border-white/10 bg-graphite-900 p-3">
            <span className="text-xs uppercase text-steel">{LABELS[key]}</span>
            <input
              type="number"
              min={0}
              max={5}
              className="mt-2 w-full rounded border border-white/10 bg-graphite-950 px-2 py-1 font-mono"
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: Number(e.target.value) }))}
            />
          </label>
        ))}
      </div>

      <textarea
        className="w-full rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
        rows={3}
        placeholder="Bias / correlated-feature notes (e.g. zip as race proxy)"
        value={form.correlatedFeatureNotes}
        onChange={(e) => setForm((f) => ({ ...f, correlatedFeatureNotes: e.target.value }))}
      />

      <button
        type="button"
        disabled={!form.pilotId}
        onClick={() => submit.mutate()}
        className="rounded-md bg-chalk px-4 py-2 text-sm font-medium text-graphite-950 disabled:opacity-40"
      >
        Submit scores
      </button>

      <div className="space-y-3">
        {(gates.data?.data.items ?? []).map((g) => (
          <motion.div
            key={g.gateId}
            layout
            className={`rounded-md border px-4 py-3 ${
              g.status === 'pass'
                ? 'border-passport/50 bg-passport/10'
                : g.status === 'fail'
                  ? 'border-brick/50 bg-brick/10'
                  : 'border-white/10 bg-graphite-900'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-sm">{g.gateId}</p>
                <p className="text-sm text-steel">
                  Total {g.totalScore}/25 · {g.status}
                </p>
                {g.correlatedFeatureNotes && (
                  <p className="mt-1 text-xs text-amber">{g.correlatedFeatureNotes}</p>
                )}
              </div>
              {g.status === 'submitted' && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="animate-stamp rounded-md bg-passport px-3 py-1.5 text-sm text-white"
                    onClick={() => decide.mutate({ id: g.gateId, outcome: 'pass' })}
                  >
                    Pass seal
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-brick px-3 py-1.5 text-sm text-white"
                    onClick={() => decide.mutate({ id: g.gateId, outcome: 'fail' })}
                  >
                    Fail / block
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
