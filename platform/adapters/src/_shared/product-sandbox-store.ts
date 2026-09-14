/**
 * In-memory product domain store for local / sandbox Pilotspan flows.
 */

import { sandboxId, nowIso, responseMeta } from './sandbox-store.js';

export { nowIso, responseMeta, sandboxId };

export type JsonRecord = Record<string, unknown>;

export const readinessById = new Map<string, JsonRecord>();
export const pilotsById = new Map<string, JsonRecord>();
export const chartersByPilotId = new Map<string, JsonRecord>();
export const decisionsById = new Map<string, JsonRecord>();
export const decisionsByPilotId = new Map<string, string[]>();
export const gatesById = new Map<string, JsonRecord>();
export const custodiansById = new Map<string, JsonRecord>();
export const approvalsById = new Map<string, JsonRecord>();
export const qualityIssuesById = new Map<string, JsonRecord>();
export const talentById = new Map<string, JsonRecord>();
export const shadowById = new Map<string, JsonRecord>();

export function listEnvelope(
  items: JsonRecord[],
  correlationId?: string
): { data: { items: JsonRecord[] }; meta: { correlationId?: string; generatedAt: string } } {
  return {
    data: { items },
    ...responseMeta(correlationId),
  };
}

export function dataEnvelope(
  data: JsonRecord,
  correlationId?: string
): { data: JsonRecord; meta: { correlationId?: string; generatedAt: string } } {
  return {
    data,
    ...responseMeta(correlationId),
  };
}

export function requireEntity(
  map: Map<string, JsonRecord>,
  id: string,
  label: string
): JsonRecord {
  const found = map.get(id);
  if (!found) {
    const err = new Error(`${label} not found: ${id}`);
    (err as Error & { statusCode?: number }).statusCode = 404;
    throw err;
  }
  return found;
}

export function avgScores(scores: number[]): number {
  if (scores.length === 0) return 0;
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
}
