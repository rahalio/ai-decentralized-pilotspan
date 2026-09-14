import type { QualityIssueRepository } from "@pilotspan/services/custodians";
import {
  dataEnvelope,
  listEnvelope,
  nowIso,
  qualityIssuesById,
  sandboxId,
} from "../_shared/product-sandbox-store.js";

export class QualityIssueRepositoryDdb implements QualityIssueRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listQualityIssues(input: Parameters<QualityIssueRepository["listQualityIssues"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...qualityIssuesById.values()];
    if (raw.datasetName) items = items.filter((i) => i.datasetName === raw.datasetName);
    return listEnvelope(items, String(raw.correlationId ?? ""));
  }

  async createQualityIssue(input: Parameters<QualityIssueRepository["createQualityIssue"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? sandboxId("qis"));
    const entity = {
      issueId: id,
      datasetName: String(raw.datasetName ?? ""),
      pilotId: raw.pilotId ? String(raw.pilotId) : undefined,
      summary: String(raw.summary ?? ""),
      severity: String(raw.severity ?? "medium"),
      createdAt: nowIso(),
    };
    qualityIssuesById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }
}
