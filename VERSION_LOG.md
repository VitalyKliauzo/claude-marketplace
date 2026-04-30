# Version Log

Semantic versioning across plugins — not all plugins start at 1.0.0.

## Current Versions

| Plugin | Version | Status |
|--------|---------|--------|
| nestjs-dev-kit | 2.1.0 | Mature — multiple iterations |
| react-quality-suite | 1.2.1 | Stable — minor refinements |
| fullstack-orchestrator | 1.0.0 | Initial release |

## Version History & Rationale

### nestjs-dev-kit — v2.1.0

- **1.0.0** (2026-03-01): Initial release with `nest-dev` agent and basic safety hooks.
- **2.0.0** (2026-04-15): **Major bump** — added `design-api`, `test-nest-api`, and `review-perf-nest-api` skills. Added `db-dev` agent. Breaking change: agents now require `CLAUDE.md` at the project root for convention discovery. This changes the installation contract — existing users must create a CLAUDE.md before upgrading.
- **2.1.0** (2026-04-30): **Minor bump** — added `/api-scaffold` command for generating complete NestJS modules. Added Context7 MCP server for documentation lookup. No breaking changes — new features only.

### react-quality-suite — v1.2.1

- **1.0.0** (2026-03-01): Initial release with `review-a11y` skill, WCAG checklist, ARIA patterns resources, and `react-dev` agent.
- **1.1.0** (2026-04-01): **Minor bump** — added `review-perf-react` and `test-react` skills. Added `qa` agent.
- **1.2.0** (2026-04-20): **Minor bump** — added `/component-check` command, `review-security` skill, and pre-tool-use hook. Updated `review-a11y` to check both light and dark mode.
- **1.2.1** (2026-04-30): **Patch bump** — fixed WCAG checklist ARIA pattern examples for accordion and tabs. Fixed false positive in hook for styled-components. No new features, only corrections.

### fullstack-orchestrator — v1.0.0

- **1.0.0** (2026-04-30): Initial release with full SDLC pipeline. Includes `build-pipeline` and `release-prep` commands, `release`, `changelog`, and `tech-lead` skills, plus `architect`, `doc-writer`, and `ba` agents. First plugin to implement cross-plugin integration via the `tech-lead` skill.

## Versioning Policy

- **Patch** (x.y.Z): Bug fixes, documentation corrections, minor hook adjustments. No new features, no changed behavior. Example: fixing a false positive in a hook regex.
- **Minor** (x.Y.0): New skills, agents, commands, or MCP servers added. Existing functionality unchanged. Example: adding a new `/api-scaffold` command.
- **Major** (X.0.0): Breaking changes to agent contracts, hook behavior, or skill interfaces. Example: requiring `CLAUDE.md` at the project root.
