# Docker Philosophy

Docker provides **infrastructure parity** and **reproducible dependencies** — not a replacement for understanding the monorepo.

## Goals

1. Same Postgres and Redis versions locally as production majors (16, 7)
2. Optional full-stack run (API + web in containers)
3. Healthchecks before dependent services start
4. Network hostnames (`postgres`, `redis`, `api`) inside Compose — not `localhost`

## Modes

| Mode | Command | When |
|------|---------|------|
| Infra only | `docker compose up postgres redis -d` | Host `pnpm dev` |
| Full stack | `pnpm docker:up` | Containerised apps |
| Clean reset | `pnpm docker:clean` | Volume / permission issues |

Pick **one** app execution mode per session: Docker apps **or** host `pnpm dev`, not both without a healthy host `node_modules`.

## Windows / host pitfalls

Docker volume patterns can corrupt host `node_modules`. Recovery:

```powershell
pnpm docker:clean
pnpm clean:modules
pnpm install
pnpm build
```

Documented in `docs/workflows/development.md`.

## Dockerfile rules

- Base: `node:22-alpine`, pnpm via corepack
- `development` target + bind mounts for local
- `production` target: frozen lockfile, `db:generate`, compiled `CMD`
- Never bake secrets into images

## Compose rules

- Root `docker-compose.yml` is canonical
- `depends_on: condition: service_healthy`
- Shared `monolith_node_modules` volume — no per-app isolated node_modules volumes

## When to update Docker

- New system dependency (native module)
- New service (e.g. worker container)
- Port or env contract change → update `.env.example` and architecture docs

## See also

`.cursor/rules/docker.mdc`, `docs/architecture/infrastructure-standards.md`
