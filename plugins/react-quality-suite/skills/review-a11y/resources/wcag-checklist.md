# WCAG 2.1 AA Checklist for React Applications

## Principle 1: Perceivable

### 1.1.1 Non-Text Content (Level A)
- Every `<img>` must have a meaningful `alt` attribute
- Decorative images use `alt=""` (empty string, not omitted)
- Icon buttons must have `aria-label` or visually hidden text

### 1.3.1 Info and Relationships (Level A)
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`
- Headings follow logical hierarchy (no skipping levels)
- Lists use `<ul>`, `<ol>`, `<dl>` — not styled `<div>` elements
- Form inputs associated with `<label>` via `htmlFor` or wrapping
- Tables use `<th>`, `<thead>`, `<tbody>`, and `scope`

### 1.3.2 Meaningful Sequence (Level A)
- DOM order matches visual reading order
- CSS `order` or `flex-direction: row-reverse` must not break logical sequence

### 1.4.1 Use of Color (Level A)
- Color is never the sole means of conveying information
- Form errors include text messages, not just red highlighting

### 1.4.3 Contrast Minimum (Level AA)
- Normal text (< 18pt / < 14pt bold): contrast ratio >= 4.5:1
- Large text (>= 18pt / >= 14pt bold): contrast ratio >= 3:1
- Validate design tokens against these requirements

### 1.4.4 Resize Text (Level AA)
- Text can be resized to 200% without loss of content
- Use `rem` or `em` units, not fixed `px` for font sizes

### 1.4.11 Non-Text Contrast (Level AA)
- UI components (buttons, inputs, icons) have >= 3:1 contrast against adjacent colors

### 1.4.12 Text Spacing (Level AA)
- Content functions with: line-height 1.5x, paragraph spacing 2x, letter spacing 0.12em, word spacing 0.16em
- Avoid fixed-height containers that clip text

## Principle 2: Operable

### 2.1.1 Keyboard (Level A)
- All interactive elements reachable via Tab, Enter, Space, Arrow keys, Escape
- Custom components (`<div onClick>`) must have `role`, `tabIndex`, `onKeyDown`
- Prefer native `<button>`, `<a>`, `<input>` over custom implementations

### 2.1.2 No Keyboard Trap (Level A)
- Users can always Tab away from any component
- Modals trap focus inside but release when closed

### 2.4.1 Bypass Blocks (Level A)
- Provide "Skip to main content" link as first focusable element

### 2.4.2 Page Titled (Level A)
- Every route has a descriptive `<title>` (update `document.title` on route change)

### 2.4.3 Focus Order (Level A)
- Tab order follows logical sequence matching visual layout
- Never use positive `tabIndex` values (> 0)

### 2.4.7 Focus Visible (Level AA)
- Focus indicators visible on all interactive elements
- Never use `outline: none` without providing alternative focus style
- Define `:focus-visible` styles

## Principle 3: Understandable

### 3.1.1 Language of Page (Level A)
- Set `lang` attribute on `<html>` element

### 3.1.2 Language of Parts (Level AA)
- Content in different languages uses `lang` attribute on containing element

### 3.3.1 Error Identification (Level A)
- Errors described in text, identify the field in error
- Use `aria-invalid="true"` and `aria-describedby` pointing to error message

### 3.3.2 Labels or Instructions (Level A)
- Form fields have visible labels (not just placeholder text)
- Required fields indicated with text (not just `*`)

## Principle 4: Robust

### 4.1.1 Parsing (Level A)
- No duplicate IDs; use `useId()` hook for generated IDs

### 4.1.2 Name, Role, Value (Level A)
- All UI components expose name, role, and state to assistive technologies
- State changes communicated via `aria-expanded`, `aria-selected`, `aria-checked`

### 4.1.3 Status Messages (Level AA)
- Success/error/progress messages use `role="status"` or `role="alert"`
- Use `aria-live="polite"` for non-urgent, `aria-live="assertive"` for errors
