# Common ARIA Patterns for React Components

## 1. Icon-Only Button

```tsx
<button type="button" onClick={handleClose} aria-label="Close dialog">
  <CloseIcon aria-hidden="true" />
</button>
```

- Every icon button needs `aria-label`
- Icons use `aria-hidden="true"`

## 2. Toggle Button

```tsx
<button
  type="button"
  aria-pressed={isFavorite}
  onClick={() => setIsFavorite(!isFavorite)}
>
  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
</button>
```

## 3. Modal / Dialog

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby={titleId}
  tabIndex={-1}
>
  <h2 id={titleId}>{title}</h2>
  {children}
  <button type="button" onClick={onClose}>Close</button>
</div>
```

**Required**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
**Keyboard**: Escape closes, Tab cycles inside (focus trap), focus returns to trigger on close

## 4. Navigation with Current Page

```tsx
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current={isHome ? 'page' : undefined}>Home</a></li>
    <li><a href="/products" aria-current={isProducts ? 'page' : undefined}>Products</a></li>
  </ul>
</nav>
```

**Required**: `aria-label` when multiple `<nav>` exist, `aria-current="page"` on active link

## 5. Tabs

```tsx
<div role="tablist" aria-label="Product details">
  <button role="tab" aria-selected={active === 0} aria-controls="panel-0" tabIndex={active === 0 ? 0 : -1}>
    Description
  </button>
</div>
<div role="tabpanel" id="panel-0" aria-labelledby="tab-0" tabIndex={0}>
  {content}
</div>
```

**Keyboard**: ArrowLeft/Right between tabs, Home/End for first/last

## 6. Form Validation

```tsx
<label htmlFor={emailId}>
  Email <span className="sr-only">(required)</span>
</label>
<input
  id={emailId}
  aria-required="true"
  aria-invalid={error ? 'true' : undefined}
  aria-describedby={error ? errorId : undefined}
/>
{error && <div id={errorId} role="alert">{error}</div>}
```

**Required**: `aria-required`, `aria-invalid`, `aria-describedby` linked to error, `role="alert"` on error

## 7. Toast / Status Messages

```tsx
// Non-urgent (polite)
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>

// Urgent error (assertive)
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

- Toasts must NOT steal focus
- Persistent toasts need a dismiss button

## 8. Accordion

```tsx
<h3>
  <button aria-expanded={isOpen} aria-controls={panelId}>
    {title}
    <ChevronIcon aria-hidden="true" />
  </button>
</h3>
<div id={panelId} role="region" hidden={!isOpen}>
  {content}
</div>
```

## Common Anti-Patterns to Flag

| Anti-Pattern | Fix |
|-------------|-----|
| `<div onClick={fn}>` as button | Use `<button>` element |
| `<img>` without `alt` | Add descriptive `alt` or `alt=""` for decorative |
| `outline: none` on interactive | Add `:focus-visible` style instead |
| Positive `tabIndex` (> 0) | Use `tabIndex={0}` or `tabIndex={-1}` only |
| Placeholder as label | Add visible `<label>` |
| Color-only error indication | Add text + icon alongside color |
| Auto-playing media | Provide pause/stop control |
| Missing `lang` on `<html>` | Add `lang="en"` (or appropriate locale) |
