Run a comprehensive quality check on a React component: accessibility, performance, conventions, and test coverage.

## Usage
`/component-check <file-path>` — e.g., `/component-check frontend/src/components/ProductCard.tsx`

If no file path is provided, ask the user which component to check.

## What This Command Does

Perform a multi-dimensional quality audit on a single React component or page, producing a consolidated report with actionable findings.

## Steps

1. **Read the target component** — Understand its props, hooks, event handlers, render logic, and styling approach.

2. **Accessibility audit** — Check against WCAG 2.1 AA:
   - Semantic HTML: `<button>` not `<div onClick>`, proper heading hierarchy, lists use `<ul>`/`<ol>`
   - ARIA attributes: `aria-label` on icon buttons, `aria-modal` on dialogs, `aria-invalid` on form errors
   - Keyboard navigation: all interactive elements reachable via Tab, Escape closes modals
   - Color contrast: verify design tokens from `index.css` meet 4.5:1 (normal) and 3:1 (large) ratios
   - Images: `alt` text on all `<img>`, `alt=""` for decorative images
   - Forms: `<label htmlFor>` associations, `aria-describedby` for error messages

3. **Performance review** — Check for:
   - Inline object/array/function literals in render (cause unnecessary re-renders)
   - Missing `React.memo`, `useMemo`, or `useCallback` where appropriate
   - Large imports that could be tree-shaken or lazy-loaded
   - Images without `loading="lazy"` below the fold
   - Missing `key` prop or index-as-key in lists

4. **Convention check** — Verify:
   - Props interface defined (not inline), PascalCase naming
   - Import organization (React first, libraries, components, hooks, types, styles)
   - Hook ordering: useState > useRef > useReducer > useContext > useEffect > useMemo/useCallback > custom
   - Uses `cn()` or equivalent for conditional class merging (not string concatenation)
   - Mobile-first responsive: base for mobile, `md:` tablet, `lg:` desktop
   - All user-facing strings use `t()` for i18n (if project uses i18next)

5. **Test coverage check** — Look for a `.test.tsx` or `.test.ts` file next to the component:
   - If missing: flag "No tests found"
   - If present: check it covers rendering, user interactions, and edge cases
   - Verify tests use `@testing-library/user-event` (not `fireEvent`)
   - Verify queries use `getByRole`/`getByText` (not `getByTestId`)

6. **Produce consolidated report**:

   ```markdown
   ## Component Quality Report: <ComponentName>

   ### Accessibility: N findings
   - [severity] finding (WCAG criterion, fix)

   ### Performance: N findings
   - [severity] finding (fix)

   ### Conventions: N findings
   - [severity] finding (fix)

   ### Test Coverage: status
   - Tests exist: yes/no
   - Coverage assessment: adequate/needs improvement/missing

   ### Overall: PASS / NEEDS WORK / FAIL
   ```

## Rules
- This is a read-only check — never modify files
- Reference WCAG criteria by number (e.g., 1.1.1 Non-text Content)
- Provide code examples for each fix recommendation
- Consider both light and dark mode for contrast checks
