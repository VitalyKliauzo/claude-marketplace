---
name: test-react
description: Generate and run tests for React hooks and components using Vitest + Testing Library
---

Generate pattern-aware tests for React frontend code following the project's established Vitest + Testing Library conventions.

## Scope
Frontend only. All paths are relative to the project root.

## Usage
`/test-react <file-path>` — e.g., `/test-react frontend/src/hooks/useProducts.ts`

If no file path is provided, ask the user which hook or component to test.

## Steps

1. **Read the target file** — Understand what it exports, its dependencies, and its behavior.

2. **Read existing test patterns** — Check for an existing `.test.ts(x)` file next to the target. If one exists, extend it. If none exists, read a representative test file:
   - For hooks: look at existing `*.test.ts` files in the hooks directory
   - For components: look at existing `*.test.tsx` files in the components directory

3. **Read test utilities** — Check `frontend/src/test/` for:
   - `setup.ts` — global test setup
   - `test-utils.ts` or `test-utils.tsx` — custom render functions, helpers
   - MSW handlers for API mocking

4. **Generate test cases**:
   - **For hooks** (data-fetching):
     - Use `renderHook` from `@testing-library/react`
     - Use `waitFor` for async operations
     - Mock API calls with MSW `http.get(...)` / `http.post(...)`
     - Test: loading state, success with data, error handling, refetch behavior
   - **For hooks** (state/logic):
     - Use `renderHook` + `act` for state changes
     - Test: initial state, state transitions, edge cases
   - **For components**:
     - Use `render` from test-utils (or `@testing-library/react`)
     - Use `@testing-library/user-event` for interactions
     - Use `screen` queries: `getByText`, `getByRole`, `queryByText` (for absence)
     - Test: renders correctly, user interactions, conditional rendering, error states

5. **Write the test file** — Save as `<filename>.test.ts(x)` next to the source file.

6. **Run the tests**:
   ```bash
   npm run test --workspace=frontend -- --run <test-file-path>
   ```

7. **Report** — Output: number of test cases, pass/fail status, any failures with error details.

## Test File Templates

### Hook test
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../test/server';
import { http, HttpResponse } from 'msw';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('should fetch data successfully', async () => {
    server.use(
      http.get('/api/v1/resource', () => {
        return HttpResponse.json([{ id: 1, name: 'Test' }]);
      }),
    );

    const { result } = renderHook(() => useMyHook());

    await waitFor(() => {
      expect(result.current.data).toHaveLength(1);
    });
  });
});
```

### Component test
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render and handle interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    expect(screen.getByText('Expected text')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /submit/i }));
    // ... assertions
  });
});
```

## Rules
- Use `@testing-library/user-event` over `fireEvent` for user interactions
- Prefer `getByRole` and `getByText` queries over `getByTestId`
- Never test implementation details — test behavior the user sees
- Test file goes next to the source file, named `<source>.test.ts(x)`
- If extending an existing test file, add new `describe` blocks — do not duplicate
- Wrap components in necessary providers (Router, i18n) if needed
