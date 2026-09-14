import type { AnonymisationGateRepository } from "@pilotspan/services/anonymisation-gates";
import {
  dataEnvelope,
  gatesById,
  listEnvelope,
  nowIso,
  requireEntity,
  sandboxId,
} from "../_shared/product-sandbox-store.js";

export class AnonymisationGateRepositoryDdb implements AnonymisationGateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listAnonymisationGates(input: Parameters<AnonymisationGateRepository["listAnonymisationGates"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...gatesById.values()];
    if (raw.pilotId) items = items.filter((g) => g.pilotId === raw.pilotId);
    if (raw.status) items = items.filter((g) => g.status === raw.status);
    return listEnvelope(items, String(raw.correlationId ?? ""));
  }

  async submitAnonymisationGate(input: Parameters<AnonymisationGateRepository["submitAnonymisationGate"]>[0]) {
    const raw = input as Record<string, unknown>;
    const scores = [
      Number(raw.aggregateScore ?? 0),
      Number(raw.removeScore ?? 0),
      Number(raw.topBottomCodingScore ?? 0),
      Number(raw.groupScore ?? 0),
      Number(raw.hashDigestScore ?? 0),
    ];
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const id = String(raw.id ?? sandboxId("ang"));
    const entity = {
      gateId: id,
      pilotId: String(raw.pilotId ?? ""),
      status: "submitted",
      aggregateScore: scores[0],
      removeScore: scores[1],
      topBottomCodingScore: scores[2],
      groupScore: scores[3],
      hashDigestScore: scores[4],
      totalScore,
      passThreshold: 15,
      correlatedFeatureNotes: raw.correlatedFeatureNotes ? String(raw.correlatedFeatureNotes) : undefined,
      waiveRequested: false,
      createdAt: nowIso(),
    };
    gatesById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }

  async getAnonymisationGate(input: Parameters<AnonymisationGateRepository["getAnonymisationGate"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.gateId ?? raw.id);
    return dataEnvelope(requireEntity(gatesById, id, "AnonymisationGate"), String(raw.correlationId ?? ""));
  }
}
