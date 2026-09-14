import type { AdmissionRepository } from "@pilotspan/services/readiness";
import {
  dataEnvelope,
  nowIso,
  readinessById,
  requireEntity,
} from "../_shared/product-sandbox-store.js";

export class AdmissionRepositoryDdb implements AdmissionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async decideReadinessAdmission(input: Parameters<AdmissionRepository["decideReadinessAdmission"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.assessmentId ?? raw.id);
    const entity = { ...requireEntity(readinessById, id, "ReadinessAssessment") };
    const decision = String(raw.decision ?? "hold");
    entity.admissionStatus = decision === "admit" ? "admitted" : "held";
    entity.admissionRationale = raw.rationale ? String(raw.rationale) : undefined;
    entity.updatedAt = nowIso();
    readinessById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }
}
