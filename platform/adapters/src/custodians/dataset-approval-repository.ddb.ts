import type { DatasetApprovalRepository } from "@pilotspan/services/custodians";
import {
  approvalsById,
  dataEnvelope,
  listEnvelope,
  nowIso,
  sandboxId,
} from "../_shared/product-sandbox-store.js";

export class DatasetApprovalRepositoryDdb implements DatasetApprovalRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDatasetApprovals(input: Parameters<DatasetApprovalRepository["listDatasetApprovals"]>[0]) {
    const raw = input as Record<string, unknown>;
    let items = [...approvalsById.values()];
    if (raw.pilotId) items = items.filter((a) => a.pilotId === raw.pilotId);
    return listEnvelope(items, String(raw.correlationId ?? ""));
  }

  async decideDatasetApproval(input: Parameters<DatasetApprovalRepository["decideDatasetApproval"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? sandboxId("dsa"));
    const entity = {
      approvalId: id,
      pilotId: String(raw.pilotId ?? ""),
      datasetName: String(raw.datasetName ?? ""),
      outcome: String(raw.outcome ?? "rejected"),
      rationale: raw.rationale ? String(raw.rationale) : undefined,
      decidedAt: nowIso(),
    };
    approvalsById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }
}
