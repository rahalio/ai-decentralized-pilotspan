import type { AuditPackRepository } from "@pilotspan/services/pilots";
import {
  dataEnvelope,
  decisionsById,
  decisionsByPilotId,
  gatesById,
  nowIso,
  requireEntity,
  pilotsById,
} from "../_shared/product-sandbox-store.js";

export class AuditPackRepositoryDdb implements AuditPackRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getGraduateAuditPack(input: Parameters<AuditPackRepository["getGraduateAuditPack"]>[0]) {
    const raw = input as Record<string, unknown>;
    const pilotId = String(raw.pilotId ?? raw.id);
    requireEntity(pilotsById, pilotId, "Pilot");
    const decisionIds = decisionsByPilotId.get(pilotId) ?? [];
    const decisions = decisionIds.map((id) => decisionsById.get(id)!).filter(Boolean);
    const gateHistory = [...gatesById.values()].filter((g) => g.pilotId === pilotId);
    return dataEnvelope(
      {
        pilotId,
        decisions,
        gateHistory,
        exportedAt: nowIso(),
      },
      String(raw.correlationId ?? ""),
    );
  }
}
