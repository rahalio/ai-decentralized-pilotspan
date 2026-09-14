import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const assignCustodian_Body = z
  .object({
    personId: z.string(),
    datasetName: z.string().min(1).max(200),
    pilotId: z.string().optional(),
  })
  .passthrough();
const decideDatasetApproval_Body = z
  .object({
    pilotId: z.string(),
    datasetName: z.string(),
    outcome: z.enum(['approved', 'rejected']),
    rationale: z.string().max(2000).optional(),
  })
  .passthrough();
const createQualityIssue_Body = z
  .object({
    datasetName: z.string(),
    pilotId: z.string().optional(),
    summary: z.string().max(1000),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const CustodianId = z.string();
const Custodian = z
  .object({
    custodianId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    personId: z.string(),
    datasetName: z.string().min(1).max(200),
    pilotId: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CustodianListData = z
  .object({
    items: z.array(
      z
        .object({
          custodianId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
          personId: z.string(),
          datasetName: z.string().min(1).max(200),
          pilotId: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const CustodianListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              custodianId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
              personId: z.string(),
              datasetName: z.string().min(1).max(200),
              pilotId: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const CustodianAssign = z
  .object({
    personId: z.string(),
    datasetName: z.string().min(1).max(200),
    pilotId: z.string().optional(),
  })
  .passthrough();
const CustodianResponse = z
  .object({
    data: z
      .object({
        custodianId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
        personId: z.string(),
        datasetName: z.string().min(1).max(200),
        pilotId: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DatasetApprovalId = z.string();
const ApprovalOutcome = z.enum(['approved', 'rejected']);
const DatasetApproval = z
  .object({
    approvalId: z.string().regex(/^dsa_[0-9A-HJKMNP-TV-Z]{26}$/),
    pilotId: z.string(),
    datasetName: z.string(),
    outcome: z.enum(['approved', 'rejected']),
    rationale: z.string().max(2000).optional(),
    decidedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DatasetApprovalListData = z
  .object({
    items: z.array(
      z
        .object({
          approvalId: z.string().regex(/^dsa_[0-9A-HJKMNP-TV-Z]{26}$/),
          pilotId: z.string(),
          datasetName: z.string(),
          outcome: z.enum(['approved', 'rejected']),
          rationale: z.string().max(2000).optional(),
          decidedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const DatasetApprovalListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              approvalId: z.string().regex(/^dsa_[0-9A-HJKMNP-TV-Z]{26}$/),
              pilotId: z.string(),
              datasetName: z.string(),
              outcome: z.enum(['approved', 'rejected']),
              rationale: z.string().max(2000).optional(),
              decidedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DatasetApprovalCreate = z
  .object({
    pilotId: z.string(),
    datasetName: z.string(),
    outcome: z.enum(['approved', 'rejected']),
    rationale: z.string().max(2000).optional(),
  })
  .passthrough();
const DatasetApprovalResponse = z
  .object({
    data: z
      .object({
        approvalId: z.string().regex(/^dsa_[0-9A-HJKMNP-TV-Z]{26}$/),
        pilotId: z.string(),
        datasetName: z.string(),
        outcome: z.enum(['approved', 'rejected']),
        rationale: z.string().max(2000).optional(),
        decidedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const QualityIssueId = z.string();
const QualityIssueSeverity = z.enum(['low', 'medium', 'high', 'critical']);
const QualityIssue = z
  .object({
    issueId: z.string().regex(/^qis_[0-9A-HJKMNP-TV-Z]{26}$/),
    datasetName: z.string(),
    pilotId: z.string().optional(),
    summary: z.string().max(1000),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const QualityIssueListData = z
  .object({
    items: z.array(
      z
        .object({
          issueId: z.string().regex(/^qis_[0-9A-HJKMNP-TV-Z]{26}$/),
          datasetName: z.string(),
          pilotId: z.string().optional(),
          summary: z.string().max(1000),
          severity: z.enum(['low', 'medium', 'high', 'critical']),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const QualityIssueListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              issueId: z.string().regex(/^qis_[0-9A-HJKMNP-TV-Z]{26}$/),
              datasetName: z.string(),
              pilotId: z.string().optional(),
              summary: z.string().max(1000),
              severity: z.enum(['low', 'medium', 'high', 'critical']),
              createdAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const QualityIssueCreate = z
  .object({
    datasetName: z.string(),
    pilotId: z.string().optional(),
    summary: z.string().max(1000),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
  })
  .passthrough();
const QualityIssueResponse = z
  .object({
    data: z
      .object({
        issueId: z.string().regex(/^qis_[0-9A-HJKMNP-TV-Z]{26}$/),
        datasetName: z.string(),
        pilotId: z.string().optional(),
        summary: z.string().max(1000),
        severity: z.enum(['low', 'medium', 'high', 'critical']),
        createdAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  assignCustodian_Body,
  decideDatasetApproval_Body,
  createQualityIssue_Body,
  Problem,
  CustodianId,
  Custodian,
  CustodianListData,
  ResponseMeta,
  CustodianListResponse,
  CustodianAssign,
  CustodianResponse,
  DatasetApprovalId,
  ApprovalOutcome,
  DatasetApproval,
  DatasetApprovalListData,
  DatasetApprovalListResponse,
  DatasetApprovalCreate,
  DatasetApprovalResponse,
  QualityIssueId,
  QualityIssueSeverity,
  QualityIssue,
  QualityIssueListData,
  QualityIssueListResponse,
  QualityIssueCreate,
  QualityIssueResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/custodians',
    alias: 'listCustodians',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  custodianId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  personId: z.string(),
                  datasetName: z.string().min(1).max(200),
                  pilotId: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/custodians',
    alias: 'assignCustodian',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: assignCustodian_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            custodianId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            personId: z.string(),
            datasetName: z.string().min(1).max(200),
            pilotId: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/dataset-approvals',
    alias: 'listDatasetApprovals',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'pilotId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  approvalId: z.string().regex(/^dsa_[0-9A-HJKMNP-TV-Z]{26}$/),
                  pilotId: z.string(),
                  datasetName: z.string(),
                  outcome: z.enum(['approved', 'rejected']),
                  rationale: z.string().max(2000).optional(),
                  decidedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/dataset-approvals',
    alias: 'decideDatasetApproval',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideDatasetApproval_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            approvalId: z.string().regex(/^dsa_[0-9A-HJKMNP-TV-Z]{26}$/),
            pilotId: z.string(),
            datasetName: z.string(),
            outcome: z.enum(['approved', 'rejected']),
            rationale: z.string().max(2000).optional(),
            decidedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/quality-issues',
    alias: 'listQualityIssues',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'datasetName',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  issueId: z.string().regex(/^qis_[0-9A-HJKMNP-TV-Z]{26}$/),
                  datasetName: z.string(),
                  pilotId: z.string().optional(),
                  summary: z.string().max(1000),
                  severity: z.enum(['low', 'medium', 'high', 'critical']),
                  createdAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/quality-issues',
    alias: 'createQualityIssue',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createQualityIssue_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            issueId: z.string().regex(/^qis_[0-9A-HJKMNP-TV-Z]{26}$/),
            datasetName: z.string(),
            pilotId: z.string().optional(),
            summary: z.string().max(1000),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
