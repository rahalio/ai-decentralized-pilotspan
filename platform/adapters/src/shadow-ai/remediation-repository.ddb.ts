import type { RemediationRepository } from "@pilotspan/services/shadow-ai";
import {
  dataEnvelope,
  nowIso,
  requireEntity,
  shadowById,
} from "../_shared/product-sandbox-store.js";

const ACTION_STATUS: Record<string, string> = {
  claim: "claimed",
  remediate: "remediating",
  retire: "retired",
  onboard: "onboarded",
};

export class RemediationRepositoryDdb implements RemediationRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async remediateShadowAiSystem(input: Parameters<RemediationRepository["remediateShadowAiSystem"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.systemId ?? raw.id);
    const entity = { ...requireEntity(shadowById, id, "ShadowAiSystem") };
    const action = String(raw.action ?? "claim");
    entity.status = ACTION_STATUS[action] ?? "claimed";
    if (raw.ownerPersonId) entity.ownerPersonId = String(raw.ownerPersonId);
    if (raw.linkedPilotId) entity.linkedPilotId = String(raw.linkedPilotId);
    if (raw.notes) entity.riskNotes = String(raw.notes);
    entity.updatedAt = nowIso();
    shadowById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }
}
