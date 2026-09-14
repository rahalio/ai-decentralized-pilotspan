'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { apiFetch, type ListEnvelope } from '@/lib/api';
import type { AnonymisationGate, Pilot, ShadowAiSystem } from '@/lib/types';

const LANES = ['admitted', 'gated', 'building', 'review'] as const;

export default function PortfolioPage() {
  const pilots = useQuery({
    queryKey: ['pilots'],
    queryFn: () => apiFetch<ListEnvelope<Pilot>>('/v1/pilots'),
  });
  const gates = useQuery({
    queryKey: ['gates'],
    queryFn: () => apiFetch<ListEnvelope<AnonymisationGate>>('/v1/anonymisation-gates'),
  });
  const shadow = useQuery({
    queryKey: ['shadow'],
    queryFn: () => apiFetch<ListEnvelope<ShadowAiSystem>>('/v1/shadow-ai-systems'),
  });

  const items = pilots.data?.data.items ?? [];
  const failedGates = (gates.data?.data.items ?? []).filter((g) => g.status === 'fail');
  const shadowCount = shadow.data?.data.items.filter((s) => s.status !== 'retired').length ?? 0;
  const nextCadence = items.find((p) => p.nextCadenceAt)?.nextCadenceAt;

  return (
    <div className="space-y-8">
      <div>
        <p className="font-display text-4xl text-brand">Pilotspan</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Portfolio runway</h1>
        <p className="mt-2 text-steel">
          Which pilots are gated, graduating, or should be killed?
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-brick/40 bg-brick/10 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-steel">Gate breaches</p>
          <p className="mt-1 font-mono text-2xl text-brick">{failedGates.length}</p>
        </div>
        <div className="rounded-md border border-amber/30 bg-amber/10 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-steel">Shadow AI open</p>
          <p className="mt-1 font-mono text-2xl text-amber">{shadowCount}</p>
        </div>
        <div className="rounded-md border border-chalk/30 bg-chalk/10 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-steel">Next cadence</p>
          <p className="mt-1 font-mono text-sm text-chalk">
            {nextCadence ? new Date(nextCadence).toLocaleString() : 'Schedule a review'}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-md border border-dashed border-white/15 px-6 py-10 text-center">
          <p className="text-steel">No pilots yet. Start with a readiness assessment.</p>
          <Link href="/readiness" className="mt-4 inline-block text-chalk hover:underline">
            Open readiness →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-4">
          {LANES.map((lane) => (
            <section key={lane} className="rounded-md border border-white/10 bg-graphite-900/80 p-3">
              <h2 className="mb-3 text-xs uppercase tracking-wider text-steel">{lane}</h2>
              <div className="space-y-2">
                {items
                  .filter((p) => (p.lane || 'admitted') === lane)
                  .map((pilot) => (
                    <Link
                      key={pilot.pilotId}
                      href={`/pilots?id=${pilot.pilotId}`}
                      className="block rounded-md border border-white/10 bg-graphite-950/60 px-3 py-2 transition hover:border-chalk/40"
                    >
                      <p className="text-sm font-medium text-ink">{pilot.name}</p>
                      <p className="font-mono text-[11px] text-steel">{pilot.status}</p>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
