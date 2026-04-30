---
name: review-perf-react
description: Performance review for React + Vite frontend code
---

Review frontend code for performance issues specific to React + Vite.

## Scope
Frontend only. All paths are relative to the project root.

## Usage
- `/review-perf-react` — review all frontend code
- `/review-perf-react <file-path>` — review specific file

## Checks

1. **Unnecessary Re-renders** — Scan components for:
   - Object/array literals created in render (new reference every render)
   - Functions defined inline that should be wrapped in `useCallback`
   - Expensive computations that should use `useMemo`
   - Components that receive frequently-changing props but don't use `React.memo`
   - **Fix**: Memoize where appropriate, extract stable references

2. **Bundle Size** — Check for:
   - Large library imports that could be tree-shaken (e.g., `import _ from 'lodash'` vs `import { debounce } from 'lodash'`)
   - Heavy dependencies imported at top level that could be lazy-loaded
   - Duplicate functionality (e.g., both `dayjs` and `date-fns`)
   - **Fix**: Use named imports, lazy-load heavy deps

3. **Route-Level Code Splitting** — Check routing configuration for:
   - Page components imported statically instead of via `React.lazy`
   - Missing `Suspense` boundaries for lazy-loaded routes
   - **Fix**: Use `React.lazy(() => import('./pages/PageName'))` with `Suspense`

4. **Image Loading** — Check components that display images for:
   - Missing `loading="lazy"` on `<img>` tags below the fold
   - Large base64 images rendered in list views
   - No image dimension hints (`width`/`height`) causing layout shift
   - **Fix**: Lazy-load images, use thumbnails in lists, set dimensions

5. **API Call Efficiency** — Check hooks and components for:
   - Redundant fetches (same data fetched in parent and child)
   - Missing abort controllers for cancelled requests
   - Fetching on every render instead of on mount/dependency change
   - **Fix**: Lift data fetching to parent, add AbortController, check hook deps

6. **List Rendering** — Check for:
   - Large lists without virtualization
   - Missing `key` props or using array index as `key`
   - Rendering all items when only visible ones are needed
   - **Fix**: Add proper keys, consider virtualization for 100+ items

## Output Format

```markdown
## Performance Review: Frontend

### High Impact
- [Issue, file:line, estimated impact, fix]

### Medium Impact
- [...]

### Low Impact / Optimization Opportunities
- [...]

### Summary
- Re-render issues: N
- Bundle size concerns: N
- Missing lazy loading: N
- API efficiency issues: N
```

## Rules
- This is a read-only review — never modify files
- Don't over-optimize — premature memoization adds complexity for no gain
- Focus on measurable user-facing impact (load time, interaction delay)
- Consider service worker caching if the project is a PWA
