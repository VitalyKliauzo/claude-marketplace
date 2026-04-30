---
name: test-nest-api
description: Generate and run unit tests for NestJS backend services and controllers
---

Generate pattern-aware unit tests for NestJS backend code following the project's established testing conventions.

## Scope
Backend only. All paths are relative to the project root.

## Usage
`/test-nest-api <file-path>` — e.g., `/test-nest-api backend/src/products/products.service.ts`

If no file path is provided, ask the user which service or controller to test.

## Steps

1. **Read the target file** — Understand the class, its dependencies (injected via constructor), and its methods.

2. **Read existing test patterns** — Check for an existing `.spec.ts` file next to the target. If one exists, extend it rather than overwriting. If none exists, read a representative test file to follow the established pattern:
   - For services: look at existing `*.service.spec.ts` files
   - For controllers: look at existing `*.controller.spec.ts` files

3. **Check for test helpers** — Look for a Prisma mock helper (e.g., `test/prisma-mock.helper.ts` or similar) for mocking PrismaService. If none exists, create inline mocks.

4. **Set up the test module** following project conventions:
   - Import `Test, TestingModule` from `@nestjs/testing`
   - Mock PrismaService using the project's mock helper or inline jest.fn() mocks
   - Mock all other injected dependencies (Logger, external services)
   - Use `beforeEach` to create the testing module

5. **Generate test cases**:
   - **For services**: Test each public method. Cover:
     - Happy path (successful operation)
     - Not found cases (throw `NotFoundException`)
     - Conflict cases (throw `ConflictException` for duplicates)
     - Validation edge cases
   - **For controllers**: Test each endpoint method. Cover:
     - Delegates to the correct service method
     - Passes parameters correctly
     - Returns the service result

6. **Write the test file** — Save as `<filename>.spec.ts` next to the source file.

7. **Run the tests**:
   ```bash
   npm run test --workspace=backend -- --testPathPattern=<test-file-name>
   ```

8. **Report** — Output: number of test cases generated, pass/fail status, any failures with error details.

## Test File Template
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
// ... imports for service, PrismaService, mock helper

describe('ServiceName', () => {
  let service: ServiceName;
  let prisma: any; // or ReturnType<typeof createPrismaMock>

  beforeEach(async () => {
    prisma = {
      model: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceName,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ServiceName>(ServiceName);
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const items = [{ id: 1, name: 'Test' }];
      prisma.model.findMany.mockResolvedValue(items);
      expect(await service.findAll()).toEqual(items);
    });
  });

  describe('findOne', () => {
    it('should return item by id', async () => {
      const item = { id: 1, name: 'Test' };
      prisma.model.findUnique.mockResolvedValue(item);
      expect(await service.findOne(1)).toEqual(item);
    });

    it('should throw NotFoundException if not found', async () => {
      prisma.model.findUnique.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
```

## Rules
- Follow the Arrange-Act-Assert pattern
- Use `mockResolvedValue` / `mockRejectedValue` for async Prisma methods
- Never hit a real database — always mock PrismaService
- Test file goes next to the source file, named `<source>.spec.ts`
- If extending an existing test file, add new `describe` blocks — do not duplicate existing tests
