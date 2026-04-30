---
name: tech-lead
description: Tech lead orchestrator — coordinate the full SDLC by delegating to specialized agents across plugins
---

Orchestrate the complete software development lifecycle for a feature by spawning specialized agents in sequence.

## Cross-Plugin Integration

This skill coordinates agents from **three plugins**:
- **nestjs-dev-kit**: `@nest-dev` (NestJS API developer), `@db-dev` (Prisma database developer)
- **react-quality-suite**: `@react-dev` (React frontend developer), `@qa` (QA engineer)
- **fullstack-orchestrator** (this plugin): `@architect`, `@doc-writer`, `@ba`

All seven agents must be installed for the full pipeline to work.

## Usage
- `/tech-lead <feature request>` — run the full SDLC pipeline
- `/tech-lead <feature request> --from <phase>` — resume from a specific phase
- `/tech-lead <feature request> --only <agent>` — run a single agent only

## Pipeline Phases

### Phase 1: Business Analysis
Spawn `@ba` with the feature request.
- **Output**: `docs/stories/YYYY-MM-DD-<feature>.md`
- **Gate**: story document exists with at least one story and acceptance criteria

### Phase 2: Architecture
Spawn `@architect` with the story document path.
- **Output**: `docs/architecture/YYYY-MM-DD-<feature>.md`, ADR files (if needed)
- **Gate**: architecture doc has schema design, API design, and implementation plan

### Phase 3: Database (conditional)
Check architecture doc for schema changes. If none needed, skip to Phase 4.
Spawn `@db-dev` (from **nestjs-dev-kit**) with the architecture document path.
- **Output**: migration files, synced frontend types
- **Gate**: migration applied, type checks pass
- **Confirm with user before proceeding** — database changes are harder to undo

### Phase 4: Backend Development
Spawn `@nest-dev` (from **nestjs-dev-kit**) with the architecture document path.
- **Output**: implemented NestJS module with tests
- **Gate**: lint passes, type check passes, unit tests pass

### Phase 5: Frontend Development
Spawn `@react-dev` (from **react-quality-suite**) with the architecture document path.
- **Output**: implemented React pages/components with tests
- **Gate**: lint passes, type check passes, unit tests pass

### Phase 6: Quality Assurance
Spawn `@qa` (from **react-quality-suite**) with the story document path.
- **Output**: `docs/qa-reports/YYYY-MM-DD-<feature>.md`
- **Gate**: QA verdict is Pass or Pass-with-warnings
- If Fail: stop and ask whether to (a) fix and re-run, (b) proceed, or (c) stop

### Phase 7: Documentation
Spawn `@doc-writer` with the story document path.
- **Output**: updated CLAUDE.md, PLAN.md, changelog, optional how-to guide

## Progress Tracking

After each phase, output:
```
Pipeline: <feature name>
========================
[x] Phase 1: Business Analysis    -> docs/stories/...
[x] Phase 2: Architecture         -> docs/architecture/...
[ ] Phase 3: Database              -> skipped | pending | done
[ ] Phase 4: Backend (@nest-dev)   -> pending
[ ] Phase 5: Frontend (@react-dev) -> pending
[ ] Phase 6: QA (@qa)              -> pending
[ ] Phase 7: Documentation         -> pending

Current: Phase N — <status>
```

## Completion Report

```markdown
# Feature Complete: <feature name>

## Artifacts
- Story: docs/stories/YYYY-MM-DD-feature.md
- Architecture: docs/architecture/YYYY-MM-DD-feature.md
- QA Report: docs/qa-reports/YYYY-MM-DD-feature.md

## Summary
- User stories: N
- Endpoints implemented: N (by @nest-dev)
- Components implemented: N (by @react-dev)
- Tests: N passing
- QA verdict: Pass | Pass with warnings
```

## Rules
- Always run phases in order — never skip ahead
- Each phase must pass its gate before proceeding
- If a phase fails, stop and report — do not silently continue
- `--from` lets the user resume after fixing issues
- `--only` lets the user run a single agent independently
- Never push to remote — the user decides when to push
- Ask for confirmation before Phase 3 (database changes)
