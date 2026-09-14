'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { apiFetch, type ListEnvelope } from '@/lib/api';
import type { Custodian, DatasetApproval, Pilot, QualityIssue } from '@/lib/types';

export default function CustodiansPage() {
  const qc = useQueryClient();
  const [assign, setAssign] = useState({ personId: '', datasetName: '', pilotId: '' });
  const [approval, setApproval] = useState({
    pilotId: '',
    datasetName: '',
    outcome: 'approved' as 'approved' | 'rejected',
    rationale: '',
  });
  const [issue, setIssue] = useState({
    datasetName: '',
    summary: '',
    severity: 'medium',
  });

  const custodians = useQuery({
    queryKey: ['custodians'],
    queryFn: () => apiFetch<ListEnvelope<Custodian>>('/v1/custodians'),
  });
  const approvals = useQuery({
    queryKey: ['approvals'],
    queryFn: () => apiFetch<ListEnvelope<DatasetApproval>>('/v1/dataset-approvals'),
  });
  const issues = useQuery({
    queryKey: ['quality'],
    queryFn: () => apiFetch<ListEnvelope<QualityIssue>>('/v1/quality-issues'),
  });
  const pilots = useQuery({
    queryKey: ['pilots'],
    queryFn: () => apiFetch<ListEnvelope<Pilot>>('/v1/pilots'),
  });

  const assignMut = useMutation({
    mutationFn: () =>
      apiFetch('/v1/custodians', {
        method: 'POST',
        idempotencyKey: `cst-${Date.now()}`,
        body: JSON.stringify(assign),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['custodians'] }),
  });
  const approveMut = useMutation({
    mutationFn: () =>
      apiFetch('/v1/dataset-approvals', {
        method: 'POST',
        idempotencyKey: `dsa-${Date.now()}`,
        body: JSON.stringify(approval),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['approvals'] }),
  });
  const issueMut = useMutation({
    mutationFn: () =>
      apiFetch('/v1/quality-issues', {
        method: 'POST',
        idempotencyKey: `qis-${Date.now()}`,
        body: JSON.stringify(issue),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['quality'] }),
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl text-ink">Custodian approvals</h1>
        <p className="mt-2 text-steel">
          Assign custodians, approve datasets, log quality defects.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-wide text-steel">Assign custodian</h2>
        <div className="grid gap-2 md:grid-cols-3">
          <input
            className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
            placeholder="Person id"
            value={assign.personId}
            onChange={(e) => setAssign((a) => ({ ...a, personId: e.target.value }))}
          />
          <input
            className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
            placeholder="Dataset name"
            value={assign.datasetName}
            onChange={(e) => setAssign((a) => ({ ...a, datasetName: e.target.value }))}
          />
          <select
            className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
            value={assign.pilotId}
            onChange={(e) => setAssign((a) => ({ ...a, pilotId: e.target.value }))}
          >
            <option value="">Optional pilot</option>
            {(pilots.data?.data.items ?? []).map((p) => (
              <option key={p.pilotId} value={p.pilotId}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => assignMut.mutate()}
          className="rounded-md bg-chalk px-4 py-2 text-sm text-graphite-950"
        >
          Assign
        </button>
        <ul className="space-y-1 text-sm">
          {(custodians.data?.data.items ?? []).map((c) => (
            <li key={c.custodianId} className="font-mono text-steel">
              {c.datasetName} · {c.personId}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-wide text-steel">Dataset approval queue</h2>
        <div className="grid gap-2 md:grid-cols-4">
          <select
            className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
            value={approval.pilotId}
            onChange={(e) => setApproval((a) => ({ ...a, pilotId: e.target.value }))}
          >
            <option value="">Pilot</option>
            {(pilots.data?.data.items ?? []).map((p) => (
              <option key={p.pilotId} value={p.pilotId}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
            placeholder="Dataset"
            value={approval.datasetName}
            onChange={(e) => setApproval((a) => ({ ...a, datasetName: e.target.value }))}
          />
          <select
            className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
            value={approval.outcome}
            onChange={(e) =>
              setApproval((a) => ({
                ...a,
                outcome: e.target.value as 'approved' | 'rejected',
              }))
            }
          >
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>
          <button
            type="button"
            onClick={() => approveMut.mutate()}
            className="rounded-md bg-passport/20 px-4 py-2 text-sm text-passport"
          >
            Record
          </button>
        </div>
        <ul className="space-y-1 text-sm">
          {(approvals.data?.data.items ?? []).map((a) => (
            <li key={a.approvalId} className="text-steel">
              {a.datasetName} → {a.outcome}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-wide text-steel">Quality issue log</h2>
        <div className="grid gap-2 md:grid-cols-3">
          <input
            className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
            placeholder="Dataset"
            value={issue.datasetName}
            onChange={(e) => setIssue((i) => ({ ...i, datasetName: e.target.value }))}
          />
          <input
            className="rounded-md border border-white/10 bg-graphite-900 px-3 py-2"
            placeholder="Summary"
            value={issue.summary}
            onChange={(e) => setIssue((i) => ({ ...i, summary: e.target.value }))}
          />
          <button
            type="button"
            onClick={() => issueMut.mutate()}
            className="rounded-md bg-amber/20 px-4 py-2 text-sm text-amber"
          >
            Log defect
          </button>
        </div>
        <ul className="space-y-1 text-sm">
          {(issues.data?.data.items ?? []).map((i) => (
            <li key={i.issueId} className="text-steel">
              [{i.severity}] {i.datasetName}: {i.summary}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
