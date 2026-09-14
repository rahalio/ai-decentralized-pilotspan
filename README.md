# Pilotspan

Enterprise AI pilot portfolio desk — readiness scoring, anonymisation gates, custodians, dream-team talent, and graduate/kill cadence.

OpenAPI-first, domain-driven monorepo based on the zero-apps codegen scaffold. Product specs: [PRODUCT.md](PRODUCT.md), [WEBAPP.md](WEBAPP.md), [USER_STORIES.md](USER_STORIES.md).

## What you get

| Piece | Location |
|-------|----------|
| `zero-codegen` tool | `.codegen/codegen/` (**local only — never commit**) |
| OpenAPI + Redocly | `packages/openapi-core/` (`common/` + domain YAMLs) |
| Core | `packages/core/src/` |
| Services / adapters | `platform/{services,adapters}/src/` |
| Fastify API | `platform/api-server/` |
| Web app | `platform/webapp/` |
| Agent skills | `.cursor/skills/{ddd-platform,ddd-codegen,ddd-identity}/` |

Package scope: **`@pilotspan/*`**

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
```

## Bootstrap `.codegen` (required locally)

`.codegen/` is **gitignored** and must never be committed or pushed. Copy it from the scaffold when missing:

```bash
rsync -a --delete \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  ./.codegen/
# Then re-apply package_scope @pilotspan in .codegen/.zero-codegen-merged.json and zero-codegen.json
pnpm codegen:paths
```

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: pilotspan_demo_local_dev_key
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=pilotspan-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules (agents)

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.
4. **Never commit or push `.codegen/`.**

See `.cursor/skills/` and `docs/CODEGEN.md`.
