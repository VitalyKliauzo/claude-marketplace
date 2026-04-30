---
name: design-api
description: Design NestJS API contracts following project conventions (backend only)
---

Design API endpoints for a new feature, producing route definitions, DTO schemas, controller signatures, and service method stubs that follow the project's established NestJS patterns.

## Scope
Backend only. All paths are relative to the project root.

## Usage
`/design-api <feature description>` — e.g., `/design-api reading progress tracking for book editions`

## Steps

1. **Read existing patterns** — Before designing, read a representative module to match conventions:
   - Pick an existing module in the backend source directory
   - Read the controller, service, and DTOs to understand: decorator usage, route naming, DTO validation patterns, error handling, response shapes

2. **Read the Prisma schema** — Read `prisma/schema.prisma` (or path from CLAUDE.md) to understand the relevant models and relations.

3. **Design the API contract** — Output a structured design:

   ```markdown
   ## API Design: <feature name>

   ### Route prefix
   `/api/v1/<resource>`

   ### Endpoints
   | Method | Path | Description | Request Body | Response |
   |--------|------|-------------|-------------|----------|
   | GET | /resource | List all | — | Resource[] |
   | GET | /resource/:id | Get by ID | — | Resource |
   | POST | /resource | Create | CreateDto | Resource |
   | PATCH | /resource/:id | Update | UpdateDto | Resource |
   | DELETE | /resource/:id | Delete | — | void |

   ### CreateResourceDto
   - Fields with class-validator decorators (@IsString, @Length, @IsInt, @IsOptional, etc.)
   - Validation rules matching Prisma schema constraints

   ### UpdateResourceDto
   - Extends `PartialType(CreateResourceDto)` from `@nestjs/swagger`

   ### Controller signatures
   - @ApiTags, @ApiOperation, @ApiResponse decorators
   - ParseIntPipe for numeric params
   - Static routes before dynamic :id

   ### Service method stubs
   - PrismaService injection
   - Logger per service
   - Proper error handling (NotFoundException, ConflictException, BadRequestException)

   ### Prisma queries
   - findAll: `prisma.<model>.findMany({ include: { ... } })`
   - findOne: `prisma.<model>.findUnique({ where: { id }, include: { ... } })`

   ### Error handling
   - Not found: `NotFoundException`
   - Duplicate: `ConflictException`
   - Invalid input: handled by ValidationPipe + DTO decorators
   ```

4. **Present for review** — Show the design and wait for user approval before any implementation.

## Rules
- This is a design-only skill — never create files
- Follow the project's existing patterns exactly (decorator style, error types, DTO patterns)
- Use `PartialType()` from `@nestjs/swagger` for update DTOs
- Static route segments must be registered before dynamic `:id` params
- Include class-validator decorators matching the project's DTO validation patterns
