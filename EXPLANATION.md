# Design Explanation

## Why these three plugins?

The split follows the **separation of concerns** principle along the natural boundaries of a full-stack TypeScript project:

1. **nestjs-dev-kit** — everything a backend developer needs: scaffolding, safety guardrails, API design, testing, performance review, and specialized agents.
2. **react-quality-suite** — everything a frontend developer needs: quality audits, accessibility compliance, component testing, security checks, and UI development agents.
3. **fullstack-orchestrator** — everything a tech lead needs to coordinate across both layers: SDLC pipeline, release management, architecture design, and documentation.

One giant plugin would force every user to install backend tools even if they only work on frontend. Ten small plugins would create installation fatigue and version management overhead. Three plugins map to three real roles on a team: backend dev, frontend dev, and tech lead.

## Why these components in each plugin?

- **nestjs-dev-kit**: All components serve NestJS + Prisma backend development. The `/api-scaffold` command generates modules. The hook prevents destructive database operations (`prisma migrate reset`, `DROP TABLE`). The skills help design APIs, write tests, and review performance. The agents implement modules and manage schema changes. The MCP server provides NestJS/Prisma documentation. Every component references NestJS decorators, Prisma queries, or class-validator patterns.

- **react-quality-suite**: All components serve React frontend quality. The `/component-check` command runs a consolidated audit. The hook blocks XSS vectors (`dangerouslySetInnerHTML`) and TypeScript safety bypasses (`as any` on props). The skills review accessibility (WCAG 2.1 AA with checklist and ARIA patterns), generate Vitest tests, audit performance, and check security. The agents implement React features and run QA. Every component references React patterns, Tailwind CSS, Testing Library, or WCAG criteria.

- **fullstack-orchestrator**: All components coordinate work across layers. The `/build-pipeline` command chains 7 agents from all three plugins in sequence. The `/release-prep` command validates both workspaces before release. The skills manage releases, changelogs, and the full SDLC pipeline. The agents handle architecture, documentation, and business analysis — the design and documentation that sit above individual backend/frontend work.

## Cross-plugin integration

The `tech-lead` skill in `fullstack-orchestrator` explicitly delegates to agents from the other two plugins:
- Phase 3 (Database): `@db-dev` from `nestjs-dev-kit`
- Phase 4 (Backend): `@nest-dev` from `nestjs-dev-kit`
- Phase 5 (Frontend): `@react-dev` from `react-quality-suite`
- Phase 6 (QA): `@qa` from `react-quality-suite`

The `build-pipeline` command follows the same cross-plugin delegation pattern. This means all three plugins must be installed for the full orchestration pipeline to work, but each plugin functions independently for its own domain.

## Versioning — what would you bump?

- **Patch** (1.0.0 -> 1.0.1): Fix a regex false positive in a hook, correct a typo in a WCAG checklist entry, update a skill's instructions. No new behavior.
- **Minor** (1.0.0 -> 1.1.0): Add a new skill, agent, or command. Add a new check to an existing review skill. No breaking changes to existing components.
- **Major** (1.0.0 -> 2.0.0): Change agent contracts (e.g., require CLAUDE.md where it wasn't required before), rename or remove a skill, change hook behavior that blocks something previously allowed.

See `VERSION_LOG.md` for the actual version history of each plugin.

## What's missing?

In a v2:
- **Authentication/authorization skills** — guards, JWT integration, role-based access control patterns for NestJS
- **E2E test skill** — Playwright-based end-to-end test generation (currently only unit tests are covered by skills)
- **CI/CD integration** — GitHub Actions workflow generation for the NestJS + React stack
- **Database seeding skill** — generate realistic seed data from Prisma schema
- **Storybook skill** — auto-generate stories for React components
- **PostToolUse hooks** — log agent completions for pipeline observability (currently only PreToolUse is used)

Production use would reveal that the `tech-lead` pipeline needs better error recovery — currently it stops on failure and asks the user. An automatic retry-with-fix loop (spawn the relevant agent to fix the issue, then re-run QA) would make the pipeline more autonomous.
