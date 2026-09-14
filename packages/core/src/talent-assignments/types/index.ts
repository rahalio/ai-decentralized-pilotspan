/**
 * Talent Assignments Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/talent-assignments.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type TalentAssignment = components["schemas"]["TalentAssignment"];
export type TalentAssignmentCreate = components["schemas"]["TalentAssignmentCreate"];
export type TalentAssignmentId = components["schemas"]["TalentAssignmentId"];
export type TalentAssignmentListData = components["schemas"]["TalentAssignmentListData"];
export type TalentRole = components["schemas"]["TalentRole"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateTalentAssignmentRequestInput = NonNullable<operations["createTalentAssignment"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTalentAssignmentsParams = NonNullable<operations["listTalentAssignments"]["parameters"]["query"]>;
export type GetTalentAssignmentParams = operations["getTalentAssignment"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTalentAssignmentsResponse = operations["listTalentAssignments"]["responses"]["200"]["content"]["application/json"];
export type CreateTalentAssignmentResponse = operations["createTalentAssignment"]["responses"]["201"]["content"]["application/json"];
export type GetTalentAssignmentResponse = operations["getTalentAssignment"]["responses"]["200"]["content"]["application/json"];


