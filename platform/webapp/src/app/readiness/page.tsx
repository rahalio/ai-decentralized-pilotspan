'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { apiFetch, type Envelope, type ListEnvelope } from '@/lib/api';
import type { ReadinessAssessment } from '@/lib/types';

const PILLARS = [
  'structureScore',
  'infrastructureScore',
  'dataScore',
  'talentScore',
  'processScore',
] as const;

const LABELS: Record<(typeof PILLARS)[number], string> = {
  structureScore: 'Structure',
  infrastructureScore: 'Infrastructure',
  dataScore: 'Data',
  talentScore: 'Talent',
  processScore: 'Process',
};

export default function ReadinessPage() {
  const qc = useQueryClient();
  const [scores, setScores] = useState({
    structureScore: 70,
    infrastructureScore: 65,
    dataScore: 60,
    talentScore: 55,
    processScore: 50,
    hardwareCloudNotes: '',
    evidenceNotes: '',
  });

  const list = useQuery({
    queryKey: ['readiness'],
    queryFn: () => apiFetch<ListEnvelope<ReadinessAssessment>>('/v1/readiness-assessments'),
  });

  const create = useMutation({
    mutationFn: () =>
      apiFetch<Envelope<ReadinessAssessment>>('/v1/readiness-assessments', {
        method: 'POST',
        idempotencyKey: `rdy-${Date.now()}`,
        body: JSON.stringify({
          organisationId: 'tnt_demo',
          ...scores,
        }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['readiness'] }),
  });

  const decide = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: 'admit' | 'hold' }) =>
      apiFetch<Envelope<ReadinessAssessment>>(
        `/v1/readiness-assessments/${id}/admission`,
        {
          method: 'POST',
          idempotencyKey: `adm-${id}-${decision}-${Date.now()}`,
          body: JSON.stringify({ decision, rationale: `${decision} from desk` }),
        }
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['readiness'] }),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink">Readiness assessment</h1>
        <p className="mt-2 text-steel">
          Score structure, infrastructure, data, talent, and process before admission.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {PILLARS.map((key) => (
          <label key={key} className="rounded-md border border-white/10 bg-graphite-900 p-3">
            <span className="text-xs uppercase tracking-wide text-steel">{LABELS[key]}</span>
            <input
              type="number"
              min={0}
              max={100}
              className="mt-2 w-full rounded border border-white/10 bg-graphite-950 px-2 py-1 font-mono text-ink"
              value={scores[key]}
              onChange={(e) =>
                setScores((s) => ({ ...s, [key]: Number(e.target.value) }))
              }
            />
          </label>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase text-steel">Hardware / cloud notes</span>
          <textarea
            className="mt-1 w-full rounded-md border border-white/10 bg-graphite-900 px-3 py-2 text-sm"
            rows={3}
            value={scores.hardwareCloudNotes}
            onChange={(e) => setScores((s) => ({ ...s, hardwareCloudNotes: e.target.value }))}
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase text-steel">Evidence notes</span>
          <textarea
            className="mt-1 w-full rounded-md border border-white/10 bg-graphite-900 px-3 py-2 text-sm"
            rows={3}
            value={scores.evidenceNotes}
            onChange={(e) => setScores((s) => ({ ...s, evidenceNotes: e.target.value }))}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => create.mutate()}
        className="rounded-md bg-chalk px-4 py-2 text-sm font-medium text-graphite-950"
      >
        Complete assessment
      </button>

      <div className="space-y-3">
        {(list.data?.data.items ?? []).map((a) => (
          <div
            key={a.assessmentId}
            className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-graphite-900 px-4 py-3"
          >
            <div>
              <p className="font-mono text-sm text-ink">{a.assessmentId}</p>
              <p className="text-sm text-steel">
                Overall {a.overallScore} · {a.admissionStatus}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md bg-passport/20 px-3 py-1.5 text-sm text-passport"
                onClick={() => decide.mutate({ id: a.assessmentId, decision: 'admit' })}
              >
                Admit
              </button>
              <button
                type="button"
                className="rounded-md bg-amber/20 px-3 py-1.5 text-sm text-amber"
                onClick={() => decide.mutate({ id: a.assessmentId, decision: 'hold' })}
              >
                Hold
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
