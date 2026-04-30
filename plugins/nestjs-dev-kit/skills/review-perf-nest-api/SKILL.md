---
name: review-perf-nest-api
description: Performance review for NestJS + Prisma backend code
---

Review backend code for performance issues specific to NestJS + Prisma.

## Scope
Backend only. All paths are relative to the project root.

## Usage
- `/review-perf-nest-api` — review all backend services and controllers
- `/review-perf-nest-api <file-path>` — review specific file

## Checks

1. **N+1 Query Detection** — Scan services for Prisma queries that:
   - Use `findMany` without `include` when related data is accessed later
   - Loop over results and make individual queries per item
   - Use nested `findUnique` calls inside a `map`/`forEach`
   - **Fix**: Use `include` or `select` with nested relations

2. **Missing Pagination** — Check list endpoints (`findAll`, `GET /`) for:
   - `findMany` without `skip`/`take` parameters
   - No query params for `page`/`limit` in the controller
   - **Fix**: Add pagination with reasonable defaults (e.g., `take: 20`)

3. **Missing Database Indexes** — Analyze `prisma/schema.prisma` for:
   - Fields used in `where` clauses that lack `@@index`
   - Foreign keys without indexes
   - Fields used in `orderBy` without indexes
   - **Fix**: Add `@@index([field])` to the schema

4. **Overly Large Responses** — Check for:
   - `findMany` returning all fields when only a subset is needed
   - Including binary/large fields (base64 images, blobs) in list endpoints
   - Missing `select` to limit response fields
   - **Fix**: Use `select` for list endpoints, reserve full `include` for detail endpoints

5. **Blocking Operations** — Check for:
   - Synchronous file I/O in request handlers
   - CPU-intensive operations without worker threads
   - Sequential `await` chains that could be parallelized with `Promise.all`
   - **Fix**: Use async I/O, offload heavy work, parallelize independent operations

6. **Caching Opportunities** — Identify:
   - Frequently called endpoints returning rarely-changing data
   - External API calls without caching
   - **Fix**: Consider NestJS `CacheModule` or HTTP cache headers

## Output Format

```markdown
## Performance Review: Backend

### High Impact
- [Issue, file:line, estimated impact, fix]

### Medium Impact
- [...]

### Low Impact / Optimization Opportunities
- [...]

### Summary
- N+1 queries found: N
- Unpaginated endpoints: N
- Missing indexes: N
- Oversized responses: N
```

## Rules
- This is a read-only review — never modify files
- Focus on real performance issues, not micro-optimizations
- Consider actual usage patterns when prioritizing
- Prioritize by user-facing impact
