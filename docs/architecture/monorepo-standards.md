# Monorepo Standards

## Tooling


| Tool                  | Role                                       |
| --------------------- | ------------------------------------------ |
| pnpm workspaces       | Dependency graph, `workspace:*` protocol   |
| Turborepo             | Task orchestration, caching (`turbo.json`) |
| Node ≥22, pnpm 9.15.9 | Pin in `package.json` `engines`            |


## Layout

```
apps/           # Deployable: web, api, mobile
packages/       # Shared: types, ui, config, eslint-config, tsconfig
prisma/         # Single schema (repo root)
infrastructure/ # Dockerfiles, Railway/Vercel config — not runtime imports
docs/           # Human + AI operational docs
.ai/            # Agent prompts, workflows, templates
```

## Package naming


| Package | Name               |
| ------- | ------------------ |
| API     | `@monolith/api`    |
| Web     | `@monolith/web`    |
| Mobile  | `@monolith/mobile` |
| Types   | `@monolith/types`  |
| UI      | `@monolith/ui`     |
| Config  | `@monolith/config` |


New shared packages: `@monolith/<kebab-name>` under `packages/`.

## Commands (root)


| Command                            | Use                                   |
| ---------------------------------- | ------------------------------------- |
| `pnpm install`                     | Install + postinstall (`db:generate`) |
| `pnpm dev`                         | Turbo dev all apps                    |
| `pnpm --filter @monolith/api dev`  | Single app                            |
| `pnpm build`                       | Production build all                  |
| `pnpm lint` / `typecheck` / `test` | PR gate                               |
| `pnpm db:migrate`                  | Prisma migrate dev                    |
| `pnpm docker:up`                   | Full local stack                      |


## Adding a workspace package

1. Create `packages/<name>/` with `package.json` (`name: @monolith/<name>`)
2. Add to `pnpm-workspace.yaml` if not covered by glob
3. Reference via `"@monolith/<name>": "workspace:*"` from apps
4. Export public API from `src/index.ts` barrel — avoid deep imports

## Turbo tasks

- Respect `turbo.json` pipeline dependencies (`build` depends on `^build`)
- Do not disable caching without reason
- App builds must succeed independently

## Forbidden

- Importing `apps/*` from `packages/*`
- Duplicate lockfiles or npm/yarn in the same repo
- Path aliases that bypass package boundaries for shared code

## See also

`.cursor/rules/monorepo.mdc`, `docs/standards/naming-conventions.md`