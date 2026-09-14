/**
 * Custodians Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/custodians.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ApprovalOutcome = components["schemas"]["ApprovalOutcome"];
export type Custodian = components["schemas"]["Custodian"];
export type CustodianAssign = components["schemas"]["CustodianAssign"];
export type CustodianId = components["schemas"]["CustodianId"];
export type CustodianListData = components["schemas"]["CustodianListData"];
export type DatasetApproval = components["schemas"]["DatasetApproval"];
export type DatasetApprovalCreate = components["schemas"]["DatasetApprovalCreate"];
export type DatasetApprovalId = components["schemas"]["DatasetApprovalId"];
export type DatasetApprovalListData = components["schemas"]["DatasetApprovalListData"];
export type QualityIssue = components["schemas"]["QualityIssue"];
export type QualityIssueCreate = components["schemas"]["QualityIssueCreate"];
export type QualityIssueId = components["schemas"]["QualityIssueId"];
export type QualityIssueListData = components["schemas"]["QualityIssueListData"];
export type QualityIssueSeverity = components["schemas"]["QualityIssueSeverity"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type AssignCustodianRequestInput = NonNullable<operations["assignCustodian"]["requestBody"]>["content"]["application/json"];
export type DecideDatasetApprovalRequestInput = NonNullable<operations["decideDatasetApproval"]["requestBody"]>["content"]["application/json"];
export type CreateQualityIssueRequestInput = NonNullable<operations["createQualityIssue"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCustodiansParams = NonNullable<operations["listCustodians"]["parameters"]["query"]>;
export type ListDatasetApprovalsParams = NonNullable<operations["listDatasetApprovals"]["parameters"]["query"]>;
export type ListQualityIssuesParams = NonNullable<operations["listQualityIssues"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCustodiansResponse = operations["listCustodians"]["responses"]["200"]["content"]["application/json"];
export type AssignCustodianResponse = operations["assignCustodian"]["responses"]["201"]["content"]["application/json"];
export type ListDatasetApprovalsResponse = operations["listDatasetApprovals"]["responses"]["200"]["content"]["application/json"];
export type DecideDatasetApprovalResponse = operations["decideDatasetApproval"]["responses"]["201"]["content"]["application/json"];
export type ListQualityIssuesResponse = operations["listQualityIssues"]["responses"]["200"]["content"]["application/json"];
export type CreateQualityIssueResponse = operations["createQualityIssue"]["responses"]["201"]["content"]["application/json"];


