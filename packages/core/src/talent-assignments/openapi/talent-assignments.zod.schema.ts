import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createTalentAssignment_Body = z
  .object({
    pilotId: z.string(),
    role: z.enum([
      'data_scientist',
      'domain_specialist',
      'engineer',
      'product_owner',
      'scrum_master',
    ]),
    personId: z.string(),
    hoursCommitted: z.number().gte(0).optional(),
    domainConsultBookedAt: z.string().datetime({ offset: true }).optional(),
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
const TalentAssignmentId = z.string();
const TalentRole = z.enum([
  'data_scientist',
  'domain_specialist',
  'engineer',
  'product_owner',
  'scrum_master',
]);
const TalentAssignment = z
  .object({
    assignmentId: z.string().regex(/^tal_[0-9A-HJKMNP-TV-Z]{26}$/),
    pilotId: z.string(),
    role: z.enum([
      'data_scientist',
      'domain_specialist',
      'engineer',
      'product_owner',
      'scrum_master',
    ]),
    personId: z.string(),
    hoursCommitted: z.number().gte(0).optional(),
    domainConsultBookedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TalentAssignmentListData = z
  .object({
    items: z.array(
      z
        .object({
          assignmentId: z.string().regex(/^tal_[0-9A-HJKMNP-TV-Z]{26}$/),
          pilotId: z.string(),
          role: z.enum([
            'data_scientist',
            'domain_specialist',
            'engineer',
            'product_owner',
            'scrum_master',
          ]),
          personId: z.string(),
          hoursCommitted: z.number().gte(0).optional(),
          domainConsultBookedAt: z
            .string()
            .datetime({ offset: true })
            .optional(),
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
const TalentAssignmentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              assignmentId: z.string().regex(/^tal_[0-9A-HJKMNP-TV-Z]{26}$/),
              pilotId: z.string(),
              role: z.enum([
                'data_scientist',
                'domain_specialist',
                'engineer',
                'product_owner',
                'scrum_master',
              ]),
              personId: z.string(),
              hoursCommitted: z.number().gte(0).optional(),
              domainConsultBookedAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
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
const TalentAssignmentCreate = z
  .object({
    pilotId: z.string(),
    role: z.enum([
      'data_scientist',
      'domain_specialist',
      'engineer',
      'product_owner',
      'scrum_master',
    ]),
    personId: z.string(),
    hoursCommitted: z.number().gte(0).optional(),
    domainConsultBookedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const TalentAssignmentResponse = z
  .object({
    data: z
      .object({
        assignmentId: z.string().regex(/^tal_[0-9A-HJKMNP-TV-Z]{26}$/),
        pilotId: z.string(),
        role: z.enum([
          'data_scientist',
          'domain_specialist',
          'engineer',
          'product_owner',
          'scrum_master',
        ]),
        personId: z.string(),
        hoursCommitted: z.number().gte(0).optional(),
        domainConsultBookedAt: z.string().datetime({ offset: true }).optional(),
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
  createTalentAssignment_Body,
  Problem,
  TalentAssignmentId,
  TalentRole,
  TalentAssignment,
  TalentAssignmentListData,
  ResponseMeta,
  TalentAssignmentListResponse,
  TalentAssignmentCreate,
  TalentAssignmentResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/talent-assignments',
    alias: 'listTalentAssignments',
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
                  assignmentId: z
                    .string()
                    .regex(/^tal_[0-9A-HJKMNP-TV-Z]{26}$/),
                  pilotId: z.string(),
                  role: z.enum([
                    'data_scientist',
                    'domain_specialist',
                    'engineer',
                    'product_owner',
                    'scrum_master',
                  ]),
                  personId: z.string(),
                  hoursCommitted: z.number().gte(0).optional(),
                  domainConsultBookedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    path: '/v1/talent-assignments',
    alias: 'createTalentAssignment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createTalentAssignment_Body,
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
            assignmentId: z.string().regex(/^tal_[0-9A-HJKMNP-TV-Z]{26}$/),
            pilotId: z.string(),
            role: z.enum([
              'data_scientist',
              'domain_specialist',
              'engineer',
              'product_owner',
              'scrum_master',
            ]),
            personId: z.string(),
            hoursCommitted: z.number().gte(0).optional(),
            domainConsultBookedAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
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
    path: '/v1/talent-assignments/:assignmentId',
    alias: 'getTalentAssignment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'assignmentId',
        type: 'Path',
        schema: z.string().regex(/^tal_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            assignmentId: z.string().regex(/^tal_[0-9A-HJKMNP-TV-Z]{26}$/),
            pilotId: z.string(),
            role: z.enum([
              'data_scientist',
              'domain_specialist',
              'engineer',
              'product_owner',
              'scrum_master',
            ]),
            personId: z.string(),
            hoursCommitted: z.number().gte(0).optional(),
            domainConsultBookedAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
