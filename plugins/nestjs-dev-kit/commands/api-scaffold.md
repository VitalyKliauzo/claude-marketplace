Scaffold a new NestJS API module for the given feature name.

## Usage
`/api-scaffold <feature-name>` — e.g., `/api-scaffold products`

## What This Command Does

Generate a complete NestJS module with all standard files following project conventions. Read `CLAUDE.md` at the project root first to discover the project's backend directory, ORM, and coding patterns.

## Steps

1. **Read project conventions** — Read `CLAUDE.md` to find:
   - Backend source directory (typically `backend/src/` or `src/`)
   - ORM in use (Prisma, TypeORM, etc.)
   - Existing module structure for reference

2. **Read a reference module** — Find an existing module directory and read its controller, service, DTOs, and module file to match conventions exactly.

3. **Read the Prisma schema** — Read `prisma/schema.prisma` (or the path from CLAUDE.md) to verify the model for `<feature-name>` exists. If it does not exist, warn: "Model `<feature-name>` not found in schema. Run @db-dev first to create it, or proceed with placeholder types."

4. **Generate the module files**:
   - `<feature>.module.ts` — NestJS module with imports, providers, controllers, exports
   - `<feature>.controller.ts` — REST controller with `@Controller('api/v1/<feature>')`, CRUD endpoints, Swagger decorators
   - `<feature>.service.ts` — Injectable service with PrismaService injection, Logger, CRUD methods, proper error handling (NotFoundException, ConflictException, BadRequestException)
   - `dto/create-<feature>.dto.ts` — Create DTO with class-validator decorators matching schema fields
   - `dto/update-<feature>.dto.ts` — Update DTO using `PartialType(Create<Feature>Dto)` from `@nestjs/swagger`
   - `<feature>.service.spec.ts` — Unit test using `@nestjs/testing` with mocked PrismaService
   - `<feature>.controller.spec.ts` — Unit test verifying controller delegates to service

5. **Register the module** — Add the new module to `app.module.ts` imports array.

6. **Run verification**:
   ```bash
   npx tsc --noEmit --project backend/tsconfig.json
   npm run lint --workspace=backend
   ```

7. **Report** — Output: files created, endpoints (method + path), model fields used.

## Template Patterns

### Controller
```typescript
@ApiTags('<feature>')
@Controller('api/v1/<feature>')
export class <Feature>Controller {
  constructor(private readonly service: <Feature>Service) {}

  @Get()
  @ApiOperation({ summary: 'List all <feature>' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get <feature> by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Create <feature>' })
  create(@Body() dto: Create<Feature>Dto) { return this.service.create(dto); }

  @Patch(':id')
  @ApiOperation({ summary: 'Update <feature>' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Update<Feature>Dto) { return this.service.update(id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete <feature>' })
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
```

### Service Error Handling
- Not found: throw `new NotFoundException('<Feature> with ID ${id} not found')`
- Duplicate: throw `new ConflictException('<Feature> with this <field> already exists')`
- Invalid input: handled by ValidationPipe + DTO decorators
- External service down: throw `new ServiceUnavailableException('...')`

## Rules
- Always read existing patterns before generating — match the project's style exactly
- Use `PartialType()` from `@nestjs/swagger` (not `@nestjs/mapped-types`) for update DTOs
- Static route segments before dynamic `:id` params
- Include Swagger decorators: `@ApiTags`, `@ApiOperation`, `@ApiResponse`
- Register module in `app.module.ts`
