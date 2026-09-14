'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch, type Envelope, type ListEnvelope } from '@/lib/api';
import type { Pilot, PortfolioDecision } from '@/lib/types';

export default function ReviewsPage() {
  const qc = useQueryClient();
  const [selected, setSelected] = useState('');
  const [rationale, setRationale] = useState('');
  const [evidenced, setEvidenced] = useState(true);
  const [audit, setAudit] = useState<unknown>(null);

  const pilots = useQuery({
    queryKey: ['pilots'],
    queryFn: () => apiFetch<ListEnvelope<Pilot>>('/v1/pilots'),
  });

  const decisions = useQuery({
    queryKey: ['decisions', selected],
    enabled: Boolean(selected),
    queryFn: () =>
      apiFetch<ListEnvelope<PortfolioDecision>>(`/v1/pilots/${selected}/decisions`),
  });

  const decide = useMutation({
    mutationFn: (decision: 'graduate' | 'extend' | 'kill') =>
      apiFetch(`/v1/pilots/${selected}/decisions`, {
        method: 'POST',
        idempotencyKey: `pdc-${selected}-${decision}-${Date.now()}`,
        body: JSON.stringify({
          decision,
          rationale,
          evidencedBusinessValue: evidenced,
        }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['decisions', selected] });
      qc.invalidateQueries({ queryKey: ['pilots'] });
    },
  });

  const exportAudit = useMutation({
    mutationFn: () =>
      apiFetch<Envelope<unknown>>(`/v1/pilots/${selected}/audit-pack`),
    onSuccess: (res) => setAudit(res.data),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink">Cadence reviews</h1>
        <p className="mt-2 text-steel">
          Force graduate / extend / kill with evidenced business value.
        </p>
      </div>

      <select
        className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          setAudit(null);
        }}
      >
        <option value="">Select pilot</option>
        {(pilots.data?.data.items ?? []).map((p) => (
          <option key={p.pilotId} value={p.pilotId}>
            {p.name} ({p.status})
          </option>
        ))}
      </select>

      {selected && (
        <>
          <label className="flex items-center gap-2 text-sm text-steel">
            <input
              type="checkbox"
              checked={evidenced}
              onChange={(e) => setEvidenced(e.target.checked)}
            />
            Evidenced real-world business value (not accuracy-only)
          </label>
          <textarea
            className="w-full rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
            rows={3}
            placeholder="Decision rationale"
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              disabled={!rationale || !evidenced}
              onClick={() => decide.mutate('graduate')}
              className="rounded-md bg-passport px-4 py-2 text-sm text-white disabled:opacity-40"
            >
              Graduate
            </motion.button>
            <button
              type="button"
              disabled={!rationale}
              onClick={() => decide.mutate('extend')}
              className="rounded-md bg-amber/90 px-4 py-2 text-sm text-graphite-950 disabled:opacity-40"
            >
              Extend
            </button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              disabled={!rationale}
              onClick={() => decide.mutate('kill')}
              className="rounded-md bg-brick px-4 py-2 text-sm text-white disabled:opacity-40"
            >
              Kill
            </motion.button>
            <button
              type="button"
              onClick={() => exportAudit.mutate()}
              className="rounded-md border border-chalk/40 px-4 py-2 text-sm text-chalk"
            >
              Export audit pack
            </button>
          </div>

          <ul className="space-y-2 text-sm">
            {(decisions.data?.data.items ?? []).map((d) => (
              <li
                key={d.decisionId}
                className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
              >
                <span className="font-mono text-chalk">{d.decision}</span> — {d.rationale}
              </li>
            ))}
          </ul>

          {audit != null && (
            <pre className="overflow-auto rounded-md border border-white/10 bg-graphite-950 p-4 text-xs text-steel">
              {JSON.stringify(audit, null, 2)}
            </pre>
          )}
        </>
      )}
    </div>
  );
}
