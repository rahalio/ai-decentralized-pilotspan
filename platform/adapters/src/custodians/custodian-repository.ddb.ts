import type { CustodianRepository } from "@pilotspan/services/custodians";
import {
  custodiansById,
  dataEnvelope,
  listEnvelope,
  nowIso,
  sandboxId,
} from "../_shared/product-sandbox-store.js";

export class CustodianRepositoryDdb implements CustodianRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listCustodians(input: Parameters<CustodianRepository["listCustodians"]>[0]) {
    const raw = input as Record<string, unknown>;
    return listEnvelope([...custodiansById.values()], String(raw.correlationId ?? ""));
  }

  async assignCustodian(input: Parameters<CustodianRepository["assignCustodian"]>[0]) {
    const raw = input as Record<string, unknown>;
    const id = String(raw.id ?? sandboxId("cst"));
    const entity = {
      custodianId: id,
      personId: String(raw.personId ?? ""),
      datasetName: String(raw.datasetName ?? ""),
      pilotId: raw.pilotId ? String(raw.pilotId) : undefined,
      createdAt: nowIso(),
    };
    custodiansById.set(id, entity);
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }
}
