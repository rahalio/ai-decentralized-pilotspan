import type { DecisionRepository } from "@pilotspan/services/anonymisation-gates";
import {
  dataEnvelope,
  gatesById,
  nowIso,
  requireEntity,
} from "../_shared/product-sandbox-store.js";

export class DecisionRepositoryDdb implements DecisionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async decideAnonymisationGate(input: Parameters<DecisionRepository["decideAnonymisationGate"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.gateId ?? raw.id);
    const entity = { ...requireEntity(gatesById, id, "AnonymisationGate") };
    const outcome = String(raw.outcome ?? "fail");
    if (raw.waiveRequested === true) {
      const err = new Error("Anonymisation waive is not allowed (BR-11)");
      (err as Error & { statusCode?: number }).statusCode = 422;
      throw err;
    }
    entity.status = outcome;
    entity.decisionRationale = raw.rationale ? String(raw.rationale) : undefined;
    entity.decidedAt = nowIso();
    gatesById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }
}
