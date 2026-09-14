import type { ReadinessAssessmentRepository } from "@pilotspan/services/readiness";
import {
  avgScores,
  dataEnvelope,
  listEnvelope,
  nowIso,
  readinessById,
  requireEntity,
  sandboxId,
} from "../_shared/product-sandbox-store.js";

export class ReadinessAssessmentRepositoryDdb implements ReadinessAssessmentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listReadinessAssessments(input: Parameters<ReadinessAssessmentRepository["listReadinessAssessments"]>[0]) {
    const raw = input as Record<string, unknown>;
    return listEnvelope([...readinessById.values()], String(raw.correlationId ?? ""));
  }

  async createReadinessAssessment(input: Parameters<ReadinessAssessmentRepository["createReadinessAssessment"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? sandboxId("rdy"));
    const scores = [
      Number(raw.structureScore ?? 0),
      Number(raw.infrastructureScore ?? 0),
      Number(raw.dataScore ?? 0),
      Number(raw.talentScore ?? 0),
      Number(raw.processScore ?? 0),
    ];
    const entity = {
      assessmentId: id,
      organisationId: String(raw.organisationId ?? raw.orgId ?? "tnt_demo"),
      structureScore: scores[0],
      infrastructureScore: scores[1],
      dataScore: scores[2],
      talentScore: scores[3],
      processScore: scores[4],
      overallScore: avgScores(scores),
      hardwareCloudNotes: raw.hardwareCloudNotes ? String(raw.hardwareCloudNotes) : undefined,
      evidenceNotes: raw.evidenceNotes ? String(raw.evidenceNotes) : undefined,
      admissionStatus: "draft",
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    readinessById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }

  async getReadinessAssessment(input: Parameters<ReadinessAssessmentRepository["getReadinessAssessment"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.assessmentId ?? raw.id);
    return dataEnvelope(requireEntity(readinessById, id, "ReadinessAssessment"), String(raw.correlationId ?? ""));
  }
}
