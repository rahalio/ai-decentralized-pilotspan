import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createPilot_Body = z
  .object({
    name: z.string().min(1).max(200),
    sponsorId: z.string(),
    successMetric: z.string().max(1000),
    readinessAssessmentId: z.string().optional(),
    externalMlStatusUrl: z.string().url().optional(),
  })
  .passthrough();
const upsertPilotCharter_Body = z
  .object({
    sponsorId: z.string(),
    objectives: z.string().max(4000),
    realWorldHoldoutMetric: z.string().max(1000).optional(),
  })
  .passthrough();
const recordPortfolioDecision_Body = z
  .object({
    decision: z.enum(['graduate', 'extend', 'kill']),
    rationale: z.string().max(4000),
    evidencedBusinessValue: z.boolean(),
  })
  .passthrough();
const PilotStatus = z.enum([
  'proposed',
  'active',
  'graduated',
  'extended',
  'killed',
]);
const PortfolioLane = z.enum(['admitted', 'gated', 'building', 'review']);
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
const PilotId = z.string();
const Pilot = z
  .object({
    pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    status: z.enum(['proposed', 'active', 'graduated', 'extended', 'killed']),
    lane: z.enum(['admitted', 'gated', 'building', 'review']).optional(),
    sponsorId: z.string(),
    successMetric: z.string().max(1000),
    readinessAssessmentId: z.string().optional(),
    externalMlStatusUrl: z.string().url().optional(),
    nextCadenceAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const PilotListData = z
  .object({
    items: z.array(
      z
        .object({
          pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          status: z.enum([
            'proposed',
            'active',
            'graduated',
            'extended',
            'killed',
          ]),
          lane: z.enum(['admitted', 'gated', 'building', 'review']).optional(),
          sponsorId: z.string(),
          successMetric: z.string().max(1000),
          readinessAssessmentId: z.string().optional(),
          externalMlStatusUrl: z.string().url().optional(),
          nextCadenceAt: z.string().datetime({ offset: true }).optional(),
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
const PilotListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              status: z.enum([
                'proposed',
                'active',
                'graduated',
                'extended',
                'killed',
              ]),
              lane: z
                .enum(['admitted', 'gated', 'building', 'review'])
                .optional(),
              sponsorId: z.string(),
              successMetric: z.string().max(1000),
              readinessAssessmentId: z.string().optional(),
              externalMlStatusUrl: z.string().url().optional(),
              nextCadenceAt: z.string().datetime({ offset: true }).optional(),
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
const PilotCreate = z
  .object({
    name: z.string().min(1).max(200),
    sponsorId: z.string(),
    successMetric: z.string().max(1000),
    readinessAssessmentId: z.string().optional(),
    externalMlStatusUrl: z.string().url().optional(),
  })
  .passthrough();
const PilotResponse = z
  .object({
    data: z
      .object({
        pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        status: z.enum([
          'proposed',
          'active',
          'graduated',
          'extended',
          'killed',
        ]),
        lane: z.enum(['admitted', 'gated', 'building', 'review']).optional(),
        sponsorId: z.string(),
        successMetric: z.string().max(1000),
        readinessAssessmentId: z.string().optional(),
        externalMlStatusUrl: z.string().url().optional(),
        nextCadenceAt: z.string().datetime({ offset: true }).optional(),
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
const CharterId = z.string();
const Charter = z
  .object({
    charterId: z.string().regex(/^chr_[0-9A-HJKMNP-TV-Z]{26}$/),
    pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
    sponsorId: z.string(),
    objectives: z.string().max(4000),
    realWorldHoldoutMetric: z.string().max(1000).optional(),
    status: z.enum(['draft', 'submitted', 'locked']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const CharterResponse = z
  .object({
    data: z
      .object({
        charterId: z.string().regex(/^chr_[0-9A-HJKMNP-TV-Z]{26}$/),
        pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
        sponsorId: z.string(),
        objectives: z.string().max(4000),
        realWorldHoldoutMetric: z.string().max(1000).optional(),
        status: z.enum(['draft', 'submitted', 'locked']),
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
const CharterUpsert = z
  .object({
    sponsorId: z.string(),
    objectives: z.string().max(4000),
    realWorldHoldoutMetric: z.string().max(1000).optional(),
  })
  .passthrough();
const PortfolioDecisionId = z.string();
const PortfolioDecisionType = z.enum(['graduate', 'extend', 'kill']);
const PortfolioDecision = z
  .object({
    decisionId: z.string().regex(/^pdc_[0-9A-HJKMNP-TV-Z]{26}$/),
    pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
    decision: z.enum(['graduate', 'extend', 'kill']),
    rationale: z.string().max(4000),
    evidencedBusinessValue: z.boolean(),
    decidedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PortfolioDecisionListData = z
  .object({
    items: z.array(
      z
        .object({
          decisionId: z.string().regex(/^pdc_[0-9A-HJKMNP-TV-Z]{26}$/),
          pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
          decision: z.enum(['graduate', 'extend', 'kill']),
          rationale: z.string().max(4000),
          evidencedBusinessValue: z.boolean(),
          decidedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const PortfolioDecisionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              decisionId: z.string().regex(/^pdc_[0-9A-HJKMNP-TV-Z]{26}$/),
              pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
              decision: z.enum(['graduate', 'extend', 'kill']),
              rationale: z.string().max(4000),
              evidencedBusinessValue: z.boolean(),
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
const PortfolioDecisionCreate = z
  .object({
    decision: z.enum(['graduate', 'extend', 'kill']),
    rationale: z.string().max(4000),
    evidencedBusinessValue: z.boolean(),
  })
  .passthrough();
const PortfolioDecisionResponse = z
  .object({
    data: z
      .object({
        decisionId: z.string().regex(/^pdc_[0-9A-HJKMNP-TV-Z]{26}$/),
        pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
        decision: z.enum(['graduate', 'extend', 'kill']),
        rationale: z.string().max(4000),
        evidencedBusinessValue: z.boolean(),
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
const GraduateAuditPack = z
  .object({
    pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
    decisions: z.array(
      z
        .object({
          decisionId: z.string().regex(/^pdc_[0-9A-HJKMNP-TV-Z]{26}$/),
          pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
          decision: z.enum(['graduate', 'extend', 'kill']),
          rationale: z.string().max(4000),
          evidencedBusinessValue: z.boolean(),
          decidedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    gateHistory: z.array(z.object({}).partial().passthrough()),
    exportedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const GraduateAuditPackResponse = z
  .object({
    data: z
      .object({
        pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
        decisions: z.array(
          z
            .object({
              decisionId: z.string().regex(/^pdc_[0-9A-HJKMNP-TV-Z]{26}$/),
              pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
              decision: z.enum(['graduate', 'extend', 'kill']),
              rationale: z.string().max(4000),
              evidencedBusinessValue: z.boolean(),
              decidedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        gateHistory: z.array(z.object({}).partial().passthrough()),
        exportedAt: z.string().datetime({ offset: true }),
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
  createPilot_Body,
  upsertPilotCharter_Body,
  recordPortfolioDecision_Body,
  PilotStatus,
  PortfolioLane,
  Problem,
  PilotId,
  Pilot,
  PilotListData,
  ResponseMeta,
  PilotListResponse,
  PilotCreate,
  PilotResponse,
  CharterId,
  Charter,
  CharterResponse,
  CharterUpsert,
  PortfolioDecisionId,
  PortfolioDecisionType,
  PortfolioDecision,
  PortfolioDecisionListData,
  PortfolioDecisionListResponse,
  PortfolioDecisionCreate,
  PortfolioDecisionResponse,
  GraduateAuditPack,
  GraduateAuditPackResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/pilots',
    alias: 'listPilots',
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
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['proposed', 'active', 'graduated', 'extended', 'killed'])
          .optional(),
      },
      {
        name: 'lane',
        type: 'Query',
        schema: z.enum(['admitted', 'gated', 'building', 'review']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  status: z.enum([
                    'proposed',
                    'active',
                    'graduated',
                    'extended',
                    'killed',
                  ]),
                  lane: z
                    .enum(['admitted', 'gated', 'building', 'review'])
                    .optional(),
                  sponsorId: z.string(),
                  successMetric: z.string().max(1000),
                  readinessAssessmentId: z.string().optional(),
                  externalMlStatusUrl: z.string().url().optional(),
                  nextCadenceAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    path: '/v1/pilots',
    alias: 'createPilot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPilot_Body,
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
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            status: z.enum([
              'proposed',
              'active',
              'graduated',
              'extended',
              'killed',
            ]),
            lane: z
              .enum(['admitted', 'gated', 'building', 'review'])
              .optional(),
            sponsorId: z.string(),
            successMetric: z.string().max(1000),
            readinessAssessmentId: z.string().optional(),
            externalMlStatusUrl: z.string().url().optional(),
            nextCadenceAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/pilots/:pilotId',
    alias: 'getPilot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'pilotId',
        type: 'Path',
        schema: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            status: z.enum([
              'proposed',
              'active',
              'graduated',
              'extended',
              'killed',
            ]),
            lane: z
              .enum(['admitted', 'gated', 'building', 'review'])
              .optional(),
            sponsorId: z.string(),
            successMetric: z.string().max(1000),
            readinessAssessmentId: z.string().optional(),
            externalMlStatusUrl: z.string().url().optional(),
            nextCadenceAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'get',
    path: '/v1/pilots/:pilotId/audit-pack',
    alias: 'getGraduateAuditPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'pilotId',
        type: 'Path',
        schema: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            decisions: z.array(
              z
                .object({
                  decisionId: z.string().regex(/^pdc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  decision: z.enum(['graduate', 'extend', 'kill']),
                  rationale: z.string().max(4000),
                  evidencedBusinessValue: z.boolean(),
                  decidedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            gateHistory: z.array(z.object({}).partial().passthrough()),
            exportedAt: z.string().datetime({ offset: true }),
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
  {
    method: 'get',
    path: '/v1/pilots/:pilotId/charter',
    alias: 'getPilotCharter',
    requestFormat: 'json',
    parameters: [
      {
        name: 'pilotId',
        type: 'Path',
        schema: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            charterId: z.string().regex(/^chr_[0-9A-HJKMNP-TV-Z]{26}$/),
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            sponsorId: z.string(),
            objectives: z.string().max(4000),
            realWorldHoldoutMetric: z.string().max(1000).optional(),
            status: z.enum(['draft', 'submitted', 'locked']),
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
    method: 'put',
    path: '/v1/pilots/:pilotId/charter',
    alias: 'upsertPilotCharter',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: upsertPilotCharter_Body,
      },
      {
        name: 'pilotId',
        type: 'Path',
        schema: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            charterId: z.string().regex(/^chr_[0-9A-HJKMNP-TV-Z]{26}$/),
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            sponsorId: z.string(),
            objectives: z.string().max(4000),
            realWorldHoldoutMetric: z.string().max(1000).optional(),
            status: z.enum(['draft', 'submitted', 'locked']),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/pilots/:pilotId/decisions',
    alias: 'listPilotDecisions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'pilotId',
        type: 'Path',
        schema: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
                  decisionId: z.string().regex(/^pdc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  decision: z.enum(['graduate', 'extend', 'kill']),
                  rationale: z.string().max(4000),
                  evidencedBusinessValue: z.boolean(),
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
    path: '/v1/pilots/:pilotId/decisions',
    alias: 'recordPortfolioDecision',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordPortfolioDecision_Body,
      },
      {
        name: 'pilotId',
        type: 'Path',
        schema: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            decisionId: z.string().regex(/^pdc_[0-9A-HJKMNP-TV-Z]{26}$/),
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            decision: z.enum(['graduate', 'extend', 'kill']),
            rationale: z.string().max(4000),
            evidencedBusinessValue: z.boolean(),
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
