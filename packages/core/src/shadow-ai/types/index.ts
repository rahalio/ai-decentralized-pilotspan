/**
 * Shadow Ai Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/shadow-ai.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ShadowAiRemediationAction = components["schemas"]["ShadowAiRemediationAction"];
export type ShadowAiStatus = components["schemas"]["ShadowAiStatus"];
export type ShadowAiSystem = components["schemas"]["ShadowAiSystem"];
export type ShadowAiSystemCreate = components["schemas"]["ShadowAiSystemCreate"];
export type ShadowAiSystemId = components["schemas"]["ShadowAiSystemId"];
export type ShadowAiSystemListData = components["schemas"]["ShadowAiSystemListData"];
export type ShadowAiRemediationRequest = components["schemas"]["ShadowAiRemediationRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateShadowAiSystemRequestInput = NonNullable<operations["createShadowAiSystem"]["requestBody"]>["content"]["application/json"];
export type RemediateShadowAiSystemRequestInput = NonNullable<operations["remediateShadowAiSystem"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListShadowAiSystemsParams = NonNullable<operations["listShadowAiSystems"]["parameters"]["query"]>;
export type GetShadowAiSystemParams = operations["getShadowAiSystem"]["parameters"]["path"];
export type RemediateShadowAiSystemParams = operations["remediateShadowAiSystem"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListShadowAiSystemsResponse = operations["listShadowAiSystems"]["responses"]["200"]["content"]["application/json"];
export type CreateShadowAiSystemResponse = operations["createShadowAiSystem"]["responses"]["201"]["content"]["application/json"];
export type GetShadowAiSystemResponse = operations["getShadowAiSystem"]["responses"]["200"]["content"]["application/json"];
export type RemediateShadowAiSystemResponse = operations["remediateShadowAiSystem"]["responses"]["200"]["content"]["application/json"];


