/**
 * Readiness Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/readiness.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AdmissionDecision = components["schemas"]["AdmissionDecision"];
export type ReadinessAssessment = components["schemas"]["ReadinessAssessment"];
export type ReadinessAssessmentCreate = components["schemas"]["ReadinessAssessmentCreate"];
export type ReadinessAssessmentId = components["schemas"]["ReadinessAssessmentId"];
export type ReadinessAssessmentListData = components["schemas"]["ReadinessAssessmentListData"];
export type ReadinessAdmissionRequest = components["schemas"]["ReadinessAdmissionRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateReadinessAssessmentRequestInput = NonNullable<operations["createReadinessAssessment"]["requestBody"]>["content"]["application/json"];
export type DecideReadinessAdmissionRequestInput = NonNullable<operations["decideReadinessAdmission"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListReadinessAssessmentsParams = NonNullable<operations["listReadinessAssessments"]["parameters"]["query"]>;
export type GetReadinessAssessmentParams = operations["getReadinessAssessment"]["parameters"]["path"];
export type DecideReadinessAdmissionParams = operations["decideReadinessAdmission"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListReadinessAssessmentsResponse = operations["listReadinessAssessments"]["responses"]["200"]["content"]["application/json"];
export type CreateReadinessAssessmentResponse = operations["createReadinessAssessment"]["responses"]["201"]["content"]["application/json"];
export type GetReadinessAssessmentResponse = operations["getReadinessAssessment"]["responses"]["200"]["content"]["application/json"];
export type DecideReadinessAdmissionResponse = operations["decideReadinessAdmission"]["responses"]["200"]["content"]["application/json"];


