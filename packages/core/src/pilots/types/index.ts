/**
 * Pilots Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/pilots.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Charter = components["schemas"]["Charter"];
export type CharterId = components["schemas"]["CharterId"];
export type CharterUpsert = components["schemas"]["CharterUpsert"];
export type GraduateAuditPack = components["schemas"]["GraduateAuditPack"];
export type Pilot = components["schemas"]["Pilot"];
export type PilotCreate = components["schemas"]["PilotCreate"];
export type PilotId = components["schemas"]["PilotId"];
export type PilotListData = components["schemas"]["PilotListData"];
export type PilotStatus = components["schemas"]["PilotStatus"];
export type PortfolioDecision = components["schemas"]["PortfolioDecision"];
export type PortfolioDecisionCreate = components["schemas"]["PortfolioDecisionCreate"];
export type PortfolioDecisionId = components["schemas"]["PortfolioDecisionId"];
export type PortfolioDecisionListData = components["schemas"]["PortfolioDecisionListData"];
export type PortfolioDecisionType = components["schemas"]["PortfolioDecisionType"];
export type PortfolioLane = components["schemas"]["PortfolioLane"];
export type Decision = operations["listPilotDecisions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePilotRequestInput = NonNullable<operations["createPilot"]["requestBody"]>["content"]["application/json"];
export type UpsertPilotCharterRequestInput = NonNullable<operations["upsertPilotCharter"]["requestBody"]>["content"]["application/json"];
export type RecordPortfolioDecisionRequestInput = NonNullable<operations["recordPortfolioDecision"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPilotsParams = NonNullable<operations["listPilots"]["parameters"]["query"]>;
export type GetPilotParams = operations["getPilot"]["parameters"]["path"];
export type GetPilotCharterParams = operations["getPilotCharter"]["parameters"]["path"];
export type UpsertPilotCharterParams = operations["upsertPilotCharter"]["parameters"]["path"];
export type ListPilotDecisionsParams = NonNullable<operations["listPilotDecisions"]["parameters"]["query"]>;
export type RecordPortfolioDecisionParams = operations["recordPortfolioDecision"]["parameters"]["path"];
export type GetGraduateAuditPackParams = operations["getGraduateAuditPack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPilotsResponse = operations["listPilots"]["responses"]["200"]["content"]["application/json"];
export type CreatePilotResponse = operations["createPilot"]["responses"]["201"]["content"]["application/json"];
export type GetPilotResponse = operations["getPilot"]["responses"]["200"]["content"]["application/json"];
export type GetPilotCharterResponse = operations["getPilotCharter"]["responses"]["200"]["content"]["application/json"];
export type UpsertPilotCharterResponse = operations["upsertPilotCharter"]["responses"]["200"]["content"]["application/json"];
export type ListPilotDecisionsResponse = operations["listPilotDecisions"]["responses"]["200"]["content"]["application/json"];
export type RecordPortfolioDecisionResponse = operations["recordPortfolioDecision"]["responses"]["201"]["content"]["application/json"];
export type GetGraduateAuditPackResponse = operations["getGraduateAuditPack"]["responses"]["200"]["content"]["application/json"];


