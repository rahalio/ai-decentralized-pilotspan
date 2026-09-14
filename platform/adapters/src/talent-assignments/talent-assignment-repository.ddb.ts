import type { TalentAssignmentRepository } from "@pilotspan/services/talent-assignments";
import {
  dataEnvelope,
  listEnvelope,
  nowIso,
  requireEntity,
  sandboxId,
  talentById,
} from "../_shared/product-sandbox-store.js";

export class TalentAssignmentRepositoryDdb implements TalentAssignmentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTalentAssignments(input: Parameters<TalentAssignmentRepository["listTalentAssignments"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...talentById.values()];
    if (raw.pilotId) items = items.filter((t) => t.pilotId === raw.pilotId);
    return listEnvelope(items, String(raw.correlationId ?? ""));
  }

  async createTalentAssignment(input: Parameters<TalentAssignmentRepository["createTalentAssignment"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? sandboxId("tal"));
    const entity = {
      assignmentId: id,
      pilotId: String(raw.pilotId ?? ""),
      role: String(raw.role ?? "engineer"),
      personId: String(raw.personId ?? ""),
      hoursCommitted: raw.hoursCommitted != null ? Number(raw.hoursCommitted) : undefined,
      domainConsultBookedAt: raw.domainConsultBookedAt ? String(raw.domainConsultBookedAt) : undefined,
      createdAt: nowIso(),
    };
    talentById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }

  async getTalentAssignment(input: Parameters<TalentAssignmentRepository["getTalentAssignment"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.assignmentId ?? raw.id);
    return dataEnvelope(requireEntity(talentById, id, "TalentAssignment"), String(raw.correlationId ?? ""));
  }
}
