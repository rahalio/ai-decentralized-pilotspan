import type { DecisionRepository } from "@pilotspan/services/pilots";
import {
  dataEnvelope,
  decisionsById,
  decisionsByPilotId,
  listEnvelope,
  nowIso,
  pilotsById,
  sandboxId,
} from "../_shared/product-sandbox-store.js";

export class DecisionRepositoryDdb implements DecisionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listPilotDecisions(input: Parameters<DecisionRepository["listPilotDecisions"]>[0]) {
    const raw = input as Record<string, unknown>;
    const pilotId = String(raw.pilotId ?? "");
    const ids = decisionsByPilotId.get(pilotId) ?? [];
    const items = ids.map((id) => decisionsById.get(id)!).filter(Boolean);
    return listEnvelope(items, String(raw.correlationId ?? ""));
  }

  async recordPortfolioDecision(input: Parameters<DecisionRepository["recordPortfolioDecision"]>[0]) {
    const raw = input as Record<string, unknown>;
    const pilotId = String(raw.pilotId ?? "");
    const id = sandboxId("pdc");
    const decision = String(raw.decision ?? "extend");
    const entity = {
      decisionId: id,
      pilotId,
      decision,
      rationale: String(raw.rationale ?? ""),
      evidencedBusinessValue: Boolean(raw.evidencedBusinessValue),
      decidedAt: nowIso(),
    };
    decisionsById.set(id, entity);
    const list = decisionsByPilotId.get(pilotId) ?? [];
    list.push(id);
    decisionsByPilotId.set(pilotId, list);
    const pilot = pilotsById.get(pilotId);
    if (pilot) {
      pilot.status = decision === "graduate" ? "graduated" : decision === "kill" ? "killed" : "extended";
      pilot.lane = "review";
      pilot.updatedAt = nowIso();
      pilotsById.set(pilotId, pilot);
    }
    return dataEnvelope(entity, String(raw.correlationId ?? ""));
  }
}
