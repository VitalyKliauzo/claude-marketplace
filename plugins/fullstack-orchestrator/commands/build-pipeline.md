Orchestrate a full-stack build pipeline for a NestJS + React feature by delegating to specialized agents in sequence.

## Usage
`/build-pipeline <feature-description>`

## Agent Delegation Strategy

Execute agents from across the plugin ecosystem in strict sequential order. Each step must complete before the next begins.

**Cross-plugin agents used:**
- `@nest-dev` (from `nestjs-dev-kit`) — NestJS API implementation
- `@db-dev` (from `nestjs-dev-kit`) — Prisma schema and migrations
- `@react-dev` (from `react-quality-suite`) — React frontend implementation
- `@qa` (from `react-quality-suite`) — Quality assurance

**Local agents used:**
- `@architect` — Architecture design
- `@doc-writer` — Documentation
- `@ba` — Business analysis

### Step 1: Business Analysis
@ba — Analyze the feature request:
- Produce user stories with acceptance criteria
- Run impact analysis across backend and frontend
- Output: `docs/stories/YYYY-MM-DD-<feature>.md`

### Step 2: Architecture Design (after Step 1)
@architect — Design the technical architecture:
- Data model (Prisma schema), API contracts, component designs
- Architecture Decision Records for significant trade-offs
- Output: `docs/architecture/YYYY-MM-DD-<feature>.md`

### Step 3: Database Layer (after Step 2, conditional)
Check architecture doc for schema changes. If none needed, skip to Step 4.
@db-dev — Implement Prisma schema changes:
- Edit `prisma/schema.prisma` following the architecture spec
- Run migration: `npx prisma migrate dev --name <kebab-case>`
- Sync frontend types
- **Confirm with user before proceeding** — database changes are harder to undo

### Step 4: Backend Implementation (after Step 3)
@nest-dev — Implement the NestJS API:
- Module, controller, service, DTOs following architecture spec
- Unit tests for service and controller
- Register module in app.module.ts
- Run lint and type check

### Step 5: Frontend Implementation (after Step 4)
@react-dev — Implement the React UI:
- Pages, components, hooks following architecture spec
- Forms with React Hook Form + Zod validation
- i18n translations
- Unit tests for hooks and components
- Run lint and type check

### Step 6: Quality Assurance (after Step 5)
@qa — Run comprehensive QA:
- Unit test pass/fail across both workspaces
- Coverage analysis (80% threshold)
- Security, accessibility, and performance review
- Output: `docs/qa-reports/YYYY-MM-DD-<feature>.md`
- If Fail: stop and ask user whether to fix, proceed, or stop

### Step 7: Documentation (after Step 6)
@doc-writer — Update project documentation:
- Update CLAUDE.md with new modules, routes, components
- Generate changelog entries
- Create how-to guide if user-facing feature

## Success Criteria
- [ ] Story document with acceptance criteria
- [ ] Architecture document with schema, API, and component design
- [ ] Database migration applied (if needed)
- [ ] All API endpoints functional
- [ ] Frontend components rendering correctly
- [ ] QA verdict: Pass or Pass with warnings
- [ ] Documentation updated

## Progress Tracking

After each step, output:
```
Pipeline: <feature name>
========================
[x] Step 1: Business Analysis    -> docs/stories/...
[x] Step 2: Architecture         -> docs/architecture/...
[ ] Step 3: Database              -> skipped | pending | done
[ ] Step 4: Backend               -> pending
[ ] Step 5: Frontend              -> pending
[ ] Step 6: Quality Assurance     -> pending
[ ] Step 7: Documentation         -> pending

Current: Step N — <status>
```
