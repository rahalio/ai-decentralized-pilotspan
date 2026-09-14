import type { PilotRepository } from "@pilotspan/services/pilots";
import {
  dataEnvelope,
  listEnvelope,
  nowIso,
  pilotsById,
  requireEntity,
  sandboxId,
} from "../_shared/product-sandbox-store.js";

export class PilotRepositoryDdb implements PilotRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listPilots(input: Parameters<PilotRepository["listPilots"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...pilotsById.values()];
    if (raw.status) items = items.filter((p) => p.status === raw.status);
    if (raw.lane) items = items.filter((p) => p.lane === raw.lane);
    return listEnvelope(items, String(raw.correlationId ?? ""));
  }

  async createPilot(input: Parameters<PilotRepository["createPilot"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? sandboxId("plt"));
    const entity = {
      pilotId: id,
      name: String(raw.name ?? "Untitled pilot"),
      status: "proposed",
      lane: "admitted",
      sponsorId: String(raw.sponsorId ?? ""),
      successMetric: String(raw.successMetric ?? ""),
      readinessAssessmentId: raw.readinessAssessmentId ? String(raw.readinessAssessmentId) : undefined,
      externalMlStatusUrl: raw.externalMlStatusUrl ? String(raw.externalMlStatusUrl) : undefined,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    pilotsById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }

  async getPilot(input: Parameters<PilotRepository["getPilot"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.pilotId ?? raw.id);
    return dataEnvelope(requireEntity(pilotsById, id, "Pilot"), String(raw.correlationId ?? ""));
  }
}
