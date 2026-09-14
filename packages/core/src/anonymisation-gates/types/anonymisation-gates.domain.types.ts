/**
 * Anonymisation Gates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/anonymisation-gates.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AnonymisationGate = components["schemas"]["AnonymisationGate"];
export type AnonymisationGateCreate = components["schemas"]["AnonymisationGateCreate"];
export type AnonymisationGateDecision = components["schemas"]["AnonymisationGateDecision"];
export type AnonymisationGateId = components["schemas"]["AnonymisationGateId"];
export type AnonymisationGateListData = components["schemas"]["AnonymisationGateListData"];
export type GateStatus = components["schemas"]["GateStatus"];
export type TechniqueScore = components["schemas"]["TechniqueScore"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitAnonymisationGateRequestInput = NonNullable<operations["submitAnonymisationGate"]["requestBody"]>["content"]["application/json"];
export type DecideAnonymisationGateRequestInput = NonNullable<operations["decideAnonymisationGate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAnonymisationGatesParams = NonNullable<operations["listAnonymisationGates"]["parameters"]["query"]>;
export type GetAnonymisationGateParams = operations["getAnonymisationGate"]["parameters"]["path"];
export type DecideAnonymisationGateParams = operations["decideAnonymisationGate"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAnonymisationGatesResponse = operations["listAnonymisationGates"]["responses"]["200"]["content"]["application/json"];
export type SubmitAnonymisationGateResponse = operations["submitAnonymisationGate"]["responses"]["201"]["content"]["application/json"];
export type GetAnonymisationGateResponse = operations["getAnonymisationGate"]["responses"]["200"]["content"]["application/json"];
export type DecideAnonymisationGateResponse = operations["decideAnonymisationGate"]["responses"]["200"]["content"]["application/json"];


