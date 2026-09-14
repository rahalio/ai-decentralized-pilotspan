import type { CharterRepository } from "@pilotspan/services/pilots";
import {
  chartersByPilotId,
  dataEnvelope,
  nowIso,
  requireEntity,
  sandboxId,
} from "../_shared/product-sandbox-store.js";

export class CharterRepositoryDdb implements CharterRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getPilotCharter(input: Parameters<CharterRepository["getPilotCharter"]>[0]) {
    const raw = input as Record<string, unknown>;
    const pilotId = String(raw.pilotId ?? raw.id);
    return dataEnvelope(requireEntity(chartersByPilotId, pilotId, "Charter"), String(raw.correlationId ?? ""));
  }

  async upsertPilotCharter(input: Parameters<CharterRepository["upsertPilotCharter"]>[0]) {
    const raw = input as Record<string, unknown>;
    const pilotId = String(raw.pilotId ?? "");
    const existing = chartersByPilotId.get(pilotId);
    const entity = {
      charterId: existing?.charterId ?? sandboxId("chr"),
      pilotId,
      sponsorId: String(raw.sponsorId ?? ""),
      objectives: String(raw.objectives ?? ""),
      realWorldHoldoutMetric: raw.realWorldHoldoutMetric ? String(raw.realWorldHoldoutMetric) : undefined,
      status: "submitted",
      createdAt: existing?.createdAt ?? nowIso(),
      updatedAt: nowIso(),
    };
    chartersByPilotId.set(pilotId, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }
}
