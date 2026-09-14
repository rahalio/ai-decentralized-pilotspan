import type { ShadowAiSystemRepository } from "@pilotspan/services/shadow-ai";
import {
  dataEnvelope,
  listEnvelope,
  nowIso,
  requireEntity,
  sandboxId,
  shadowById,
} from "../_shared/product-sandbox-store.js";

export class ShadowAiSystemRepositoryDdb implements ShadowAiSystemRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listShadowAiSystems(input: Parameters<ShadowAiSystemRepository["listShadowAiSystems"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...shadowById.values()];
    if (raw.status) items = items.filter((s) => s.status === raw.status);
    return listEnvelope(items, String(raw.correlationId ?? ""));
  }

  async createShadowAiSystem(input: Parameters<ShadowAiSystemRepository["createShadowAiSystem"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? sandboxId("sha"));
    const entity = {
      systemId: id,
      name: String(raw.name ?? ""),
      department: String(raw.department ?? ""),
      ownerPersonId: raw.ownerPersonId ? String(raw.ownerPersonId) : undefined,
      status: "discovered",
      riskNotes: raw.riskNotes ? String(raw.riskNotes) : undefined,
      discoveredAt: nowIso(),
      updatedAt: nowIso(),
    };
    shadowById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }

  async getShadowAiSystem(input: Parameters<ShadowAiSystemRepository["getShadowAiSystem"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.systemId ?? raw.id);
    return dataEnvelope(requireEntity(shadowById, id, "ShadowAiSystem"), String(raw.correlationId ?? ""));
  }
}
