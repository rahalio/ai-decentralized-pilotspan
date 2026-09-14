import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createReadinessAssessment_Body = z
  .object({
    organisationId: z.string(),
    structureScore: z.number().gte(0).lte(100).optional(),
    infrastructureScore: z.number().gte(0).lte(100).optional(),
    dataScore: z.number().gte(0).lte(100).optional(),
    talentScore: z.number().gte(0).lte(100).optional(),
    processScore: z.number().gte(0).lte(100).optional(),
    hardwareCloudNotes: z.string().max(2000).optional(),
    evidenceNotes: z.string().max(4000).optional(),
  })
  .passthrough();
const decideReadinessAdmission_Body = z
  .object({
    decision: z.enum(['admit', 'hold']),
    rationale: z.string().max(2000).optional(),
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
const ReadinessAssessmentId = z.string();
const ReadinessAssessment = z
  .object({
    assessmentId: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
    organisationId: z.string(),
    structureScore: z.number().gte(0).lte(100),
    infrastructureScore: z.number().gte(0).lte(100),
    dataScore: z.number().gte(0).lte(100),
    talentScore: z.number().gte(0).lte(100),
    processScore: z.number().gte(0).lte(100),
    overallScore: z.number().gte(0).lte(100),
    hardwareCloudNotes: z.string().max(2000).optional(),
    evidenceNotes: z.string().max(4000).optional(),
    admissionStatus: z.enum(['draft', 'admitted', 'held']),
    admissionRationale: z.string().max(2000).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ReadinessAssessmentListData = z
  .object({
    items: z.array(
      z
        .object({
          assessmentId: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
          organisationId: z.string(),
          structureScore: z.number().gte(0).lte(100),
          infrastructureScore: z.number().gte(0).lte(100),
          dataScore: z.number().gte(0).lte(100),
          talentScore: z.number().gte(0).lte(100),
          processScore: z.number().gte(0).lte(100),
          overallScore: z.number().gte(0).lte(100),
          hardwareCloudNotes: z.string().max(2000).optional(),
          evidenceNotes: z.string().max(4000).optional(),
          admissionStatus: z.enum(['draft', 'admitted', 'held']),
          admissionRationale: z.string().max(2000).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
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
const ReadinessAssessmentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              assessmentId: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
              organisationId: z.string(),
              structureScore: z.number().gte(0).lte(100),
              infrastructureScore: z.number().gte(0).lte(100),
              dataScore: z.number().gte(0).lte(100),
              talentScore: z.number().gte(0).lte(100),
              processScore: z.number().gte(0).lte(100),
              overallScore: z.number().gte(0).lte(100),
              hardwareCloudNotes: z.string().max(2000).optional(),
              evidenceNotes: z.string().max(4000).optional(),
              admissionStatus: z.enum(['draft', 'admitted', 'held']),
              admissionRationale: z.string().max(2000).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
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
const ReadinessAssessmentCreate = z
  .object({
    organisationId: z.string(),
    structureScore: z.number().gte(0).lte(100).optional(),
    infrastructureScore: z.number().gte(0).lte(100).optional(),
    dataScore: z.number().gte(0).lte(100).optional(),
    talentScore: z.number().gte(0).lte(100).optional(),
    processScore: z.number().gte(0).lte(100).optional(),
    hardwareCloudNotes: z.string().max(2000).optional(),
    evidenceNotes: z.string().max(4000).optional(),
  })
  .passthrough();
const ReadinessAssessmentResponse = z
  .object({
    data: z
      .object({
        assessmentId: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
        organisationId: z.string(),
        structureScore: z.number().gte(0).lte(100),
        infrastructureScore: z.number().gte(0).lte(100),
        dataScore: z.number().gte(0).lte(100),
        talentScore: z.number().gte(0).lte(100),
        processScore: z.number().gte(0).lte(100),
        overallScore: z.number().gte(0).lte(100),
        hardwareCloudNotes: z.string().max(2000).optional(),
        evidenceNotes: z.string().max(4000).optional(),
        admissionStatus: z.enum(['draft', 'admitted', 'held']),
        admissionRationale: z.string().max(2000).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
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
const AdmissionDecision = z.enum(['admit', 'hold']);
const ReadinessAdmissionRequest = z
  .object({
    decision: z.enum(['admit', 'hold']),
    rationale: z.string().max(2000).optional(),
  })
  .passthrough();

export const schemas: any = {
  createReadinessAssessment_Body,
  decideReadinessAdmission_Body,
  Problem,
  ReadinessAssessmentId,
  ReadinessAssessment,
  ReadinessAssessmentListData,
  ResponseMeta,
  ReadinessAssessmentListResponse,
  ReadinessAssessmentCreate,
  ReadinessAssessmentResponse,
  AdmissionDecision,
  ReadinessAdmissionRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/readiness-assessments',
    alias: 'listReadinessAssessments',
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
                  assessmentId: z
                    .string()
                    .regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
                  organisationId: z.string(),
                  structureScore: z.number().gte(0).lte(100),
                  infrastructureScore: z.number().gte(0).lte(100),
                  dataScore: z.number().gte(0).lte(100),
                  talentScore: z.number().gte(0).lte(100),
                  processScore: z.number().gte(0).lte(100),
                  overallScore: z.number().gte(0).lte(100),
                  hardwareCloudNotes: z.string().max(2000).optional(),
                  evidenceNotes: z.string().max(4000).optional(),
                  admissionStatus: z.enum(['draft', 'admitted', 'held']),
                  admissionRationale: z.string().max(2000).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/readiness-assessments',
    alias: 'createReadinessAssessment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createReadinessAssessment_Body,
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
            assessmentId: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
            organisationId: z.string(),
            structureScore: z.number().gte(0).lte(100),
            infrastructureScore: z.number().gte(0).lte(100),
            dataScore: z.number().gte(0).lte(100),
            talentScore: z.number().gte(0).lte(100),
            processScore: z.number().gte(0).lte(100),
            overallScore: z.number().gte(0).lte(100),
            hardwareCloudNotes: z.string().max(2000).optional(),
            evidenceNotes: z.string().max(4000).optional(),
            admissionStatus: z.enum(['draft', 'admitted', 'held']),
            admissionRationale: z.string().max(2000).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/readiness-assessments/:assessmentId',
    alias: 'getReadinessAssessment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'assessmentId',
        type: 'Path',
        schema: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            assessmentId: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
            organisationId: z.string(),
            structureScore: z.number().gte(0).lte(100),
            infrastructureScore: z.number().gte(0).lte(100),
            dataScore: z.number().gte(0).lte(100),
            talentScore: z.number().gte(0).lte(100),
            processScore: z.number().gte(0).lte(100),
            overallScore: z.number().gte(0).lte(100),
            hardwareCloudNotes: z.string().max(2000).optional(),
            evidenceNotes: z.string().max(4000).optional(),
            admissionStatus: z.enum(['draft', 'admitted', 'held']),
            admissionRationale: z.string().max(2000).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
      {
        status: 404,
        description: `Resource not found`,
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
    path: '/v1/readiness-assessments/:assessmentId/admission',
    alias: 'decideReadinessAdmission',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideReadinessAdmission_Body,
      },
      {
        name: 'assessmentId',
        type: 'Path',
        schema: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            assessmentId: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
            organisationId: z.string(),
            structureScore: z.number().gte(0).lte(100),
            infrastructureScore: z.number().gte(0).lte(100),
            dataScore: z.number().gte(0).lte(100),
            talentScore: z.number().gte(0).lte(100),
            processScore: z.number().gte(0).lte(100),
            overallScore: z.number().gte(0).lte(100),
            hardwareCloudNotes: z.string().max(2000).optional(),
            evidenceNotes: z.string().max(4000).optional(),
            admissionStatus: z.enum(['draft', 'admitted', 'held']),
            admissionRationale: z.string().max(2000).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
      {
        status: 404,
        description: `Resource not found`,
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
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
