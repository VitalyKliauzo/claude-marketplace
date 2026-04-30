---
name: review-a11y
description: Accessibility review for React frontend components (WCAG 2.1 AA compliance)
---

Review frontend components for accessibility issues against WCAG 2.1 AA criteria.

## Scope
Frontend only. All paths are relative to the project root.

## Usage
- `/review-a11y` — review all frontend components
- `/review-a11y <file-or-directory>` — review specific component(s)

## Reference Resources
Before starting the review, read these companion files for detailed criteria:
- `${CLAUDE_SKILL_DIR}/resources/wcag-checklist.md` — WCAG 2.1 AA checklist with React-specific notes
- `${CLAUDE_SKILL_DIR}/resources/aria-patterns.md` — Correct ARIA patterns for common React components

## Steps

1. **Scan components** — Read the target file(s) or scan the frontend components and pages directories.

2. **Check semantic HTML**:
   - Interactive elements use correct tags (`<button>` not `<div onClick>`)
   - Headings follow hierarchy (`h1` > `h2` > `h3`, no skipped levels)
   - Lists use `<ul>`/`<ol>`/`<li>`
   - Navigation uses `<nav>`
   - Main content uses `<main>`

3. **Check ARIA attributes**:
   - Interactive elements have accessible names (`aria-label`, `aria-labelledby`, or visible text)
   - Images have `alt` text (decorative images use `alt=""`)
   - Form inputs have associated `<label>` elements or `aria-label`
   - Dynamic content has `aria-live` regions where appropriate
   - Modal components have `aria-modal="true"` and manage focus

4. **Check keyboard navigation**:
   - All interactive elements are reachable via Tab
   - Custom components don't trap focus (except modals)
   - Escape key dismisses modals/overlays
   - Enter/Space activate buttons and links
   - Focus is visible (outline or equivalent)

5. **Check color and contrast**:
   - Read design tokens from CSS files (`index.css` or theme config)
   - Verify text has sufficient contrast ratio (4.5:1 for normal text, 3:1 for large text)
   - Information is not conveyed by color alone
   - Dark mode maintains contrast requirements

6. **Check responsive/mobile**:
   - Touch targets are at least 44x44px
   - Text is readable without zooming
   - No horizontal scrolling at 320px viewport

## Output Format

```markdown
## Accessibility Review: <scope>

### Critical (blocks users)
- [Issue, file:line, WCAG criterion, remediation]

### Major (significant barriers)
- [...]

### Minor (improvements)
- [...]

### Passed Checks
- Semantic HTML: PASS/FAIL
- ARIA attributes: PASS/FAIL
- Keyboard navigation: PASS/FAIL
- Color contrast: PASS/FAIL
- Responsive/touch: PASS/FAIL

### Summary
- Total findings: N
- WCAG 2.1 AA compliance: Partial / Full
```

## Common Mistakes to Flag
- `<div onClick={fn}>` instead of `<button>` — always use semantic elements
- `<img>` without `alt` — add descriptive alt or `alt=""` for decorative
- `outline: none` on interactive elements — use `:focus-visible` instead
- Positive `tabIndex` (> 0) — only use `tabIndex={0}` or `tabIndex={-1}`
- Placeholder text as the only label — add visible `<label>`
- Color-only error indication — add text + icon alongside color
- Missing `lang` attribute on `<html>` — required for screen readers

## Rules
- This is a read-only review — never modify files
- Reference WCAG 2.1 criteria by number (e.g., 1.1.1 Non-text Content)
- Use the ARIA patterns resource to verify correct implementation
- Provide specific remediation for each finding with code examples
- Check both light and dark mode
