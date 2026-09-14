import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createShadowAiSystem_Body = z
  .object({
    name: z.string().min(1).max(200),
    department: z.string().max(200),
    ownerPersonId: z.string().optional(),
    riskNotes: z.string().max(4000).optional(),
  })
  .passthrough();
const remediateShadowAiSystem_Body = z
  .object({
    action: z.enum(['claim', 'remediate', 'retire', 'onboard']),
    ownerPersonId: z.string().optional(),
    linkedPilotId: z.string().optional(),
    notes: z.string().max(2000).optional(),
  })
  .passthrough();
const ShadowAiStatus = z.enum([
  'discovered',
  'claimed',
  'remediating',
  'retired',
  'onboarded',
]);
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
const ShadowAiSystemId = z.string();
const ShadowAiSystem = z
  .object({
    systemId: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    department: z.string().max(200),
    ownerPersonId: z.string().optional(),
    status: z.enum([
      'discovered',
      'claimed',
      'remediating',
      'retired',
      'onboarded',
    ]),
    riskNotes: z.string().max(4000).optional(),
    linkedPilotId: z.string().optional(),
    discoveredAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ShadowAiSystemListData = z
  .object({
    items: z.array(
      z
        .object({
          systemId: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          department: z.string().max(200),
          ownerPersonId: z.string().optional(),
          status: z.enum([
            'discovered',
            'claimed',
            'remediating',
            'retired',
            'onboarded',
          ]),
          riskNotes: z.string().max(4000).optional(),
          linkedPilotId: z.string().optional(),
          discoveredAt: z.string().datetime({ offset: true }),
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
const ShadowAiSystemListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              systemId: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              department: z.string().max(200),
              ownerPersonId: z.string().optional(),
              status: z.enum([
                'discovered',
                'claimed',
                'remediating',
                'retired',
                'onboarded',
              ]),
              riskNotes: z.string().max(4000).optional(),
              linkedPilotId: z.string().optional(),
              discoveredAt: z.string().datetime({ offset: true }),
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
const ShadowAiSystemCreate = z
  .object({
    name: z.string().min(1).max(200),
    department: z.string().max(200),
    ownerPersonId: z.string().optional(),
    riskNotes: z.string().max(4000).optional(),
  })
  .passthrough();
const ShadowAiSystemResponse = z
  .object({
    data: z
      .object({
        systemId: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        department: z.string().max(200),
        ownerPersonId: z.string().optional(),
        status: z.enum([
          'discovered',
          'claimed',
          'remediating',
          'retired',
          'onboarded',
        ]),
        riskNotes: z.string().max(4000).optional(),
        linkedPilotId: z.string().optional(),
        discoveredAt: z.string().datetime({ offset: true }),
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
const ShadowAiRemediationAction = z.enum([
  'claim',
  'remediate',
  'retire',
  'onboard',
]);
const ShadowAiRemediationRequest = z
  .object({
    action: z.enum(['claim', 'remediate', 'retire', 'onboard']),
    ownerPersonId: z.string().optional(),
    linkedPilotId: z.string().optional(),
    notes: z.string().max(2000).optional(),
  })
  .passthrough();

export const schemas: any = {
  createShadowAiSystem_Body,
  remediateShadowAiSystem_Body,
  ShadowAiStatus,
  Problem,
  ShadowAiSystemId,
  ShadowAiSystem,
  ShadowAiSystemListData,
  ResponseMeta,
  ShadowAiSystemListResponse,
  ShadowAiSystemCreate,
  ShadowAiSystemResponse,
  ShadowAiRemediationAction,
  ShadowAiRemediationRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/shadow-ai-systems',
    alias: 'listShadowAiSystems',
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
          .enum([
            'discovered',
            'claimed',
            'remediating',
            'retired',
            'onboarded',
          ])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  systemId: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  department: z.string().max(200),
                  ownerPersonId: z.string().optional(),
                  status: z.enum([
                    'discovered',
                    'claimed',
                    'remediating',
                    'retired',
                    'onboarded',
                  ]),
                  riskNotes: z.string().max(4000).optional(),
                  linkedPilotId: z.string().optional(),
                  discoveredAt: z.string().datetime({ offset: true }),
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
    path: '/v1/shadow-ai-systems',
    alias: 'createShadowAiSystem',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createShadowAiSystem_Body,
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
            systemId: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            department: z.string().max(200),
            ownerPersonId: z.string().optional(),
            status: z.enum([
              'discovered',
              'claimed',
              'remediating',
              'retired',
              'onboarded',
            ]),
            riskNotes: z.string().max(4000).optional(),
            linkedPilotId: z.string().optional(),
            discoveredAt: z.string().datetime({ offset: true }),
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
    path: '/v1/shadow-ai-systems/:systemId',
    alias: 'getShadowAiSystem',
    requestFormat: 'json',
    parameters: [
      {
        name: 'systemId',
        type: 'Path',
        schema: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            systemId: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            department: z.string().max(200),
            ownerPersonId: z.string().optional(),
            status: z.enum([
              'discovered',
              'claimed',
              'remediating',
              'retired',
              'onboarded',
            ]),
            riskNotes: z.string().max(4000).optional(),
            linkedPilotId: z.string().optional(),
            discoveredAt: z.string().datetime({ offset: true }),
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
    path: '/v1/shadow-ai-systems/:systemId/remediation',
    alias: 'remediateShadowAiSystem',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: remediateShadowAiSystem_Body,
      },
      {
        name: 'systemId',
        type: 'Path',
        schema: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            systemId: z.string().regex(/^sha_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            department: z.string().max(200),
            ownerPersonId: z.string().optional(),
            status: z.enum([
              'discovered',
              'claimed',
              'remediating',
              'retired',
              'onboarded',
            ]),
            riskNotes: z.string().max(4000).optional(),
            linkedPilotId: z.string().optional(),
            discoveredAt: z.string().datetime({ offset: true }),
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
