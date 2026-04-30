---
name: review-security
description: Security review for React frontend code
---

Perform a security-focused code review for the React frontend.

## Scope
Frontend only. All paths are relative to the project root.

## Usage
- `/review-security` — review all frontend source files
- `/review-security <file-or-directory>` — review specific file(s)

## Security Checks

1. **XSS (Cross-Site Scripting)** — Search for:
   - `dangerouslySetInnerHTML` usage (flag every instance)
   - Direct DOM manipulation via `innerHTML`
   - Unescaped user input rendered in JSX
   - **Fix**: Use text content rendering, or sanitize with DOMPurify before `dangerouslySetInnerHTML`

2. **Sensitive Data Exposure** — Check for:
   - API keys or tokens in frontend code (search for `VITE_` env vars containing secrets)
   - Sensitive data stored in `localStorage` or `sessionStorage`
   - Credentials in source code or comments
   - **Fix**: Move secrets to backend, use httpOnly cookies for auth tokens

3. **External URLs** — Verify:
   - No `window.open()` or `<a href>` with user-controlled URLs without validation
   - External links use `rel="noopener noreferrer"`
   - **Fix**: Validate URL schemes (allow only `https:`), add `rel` attributes

4. **Content Security** — Check for:
   - Inline `<script>` tags or `eval()` usage
   - Loading scripts from external CDNs without integrity checks (`integrity` + `crossorigin`)
   - **Fix**: Remove `eval`, add SRI hashes for external scripts

5. **Form Security** — Check for:
   - Autocomplete attributes on sensitive fields (`autocomplete="off"` for tokens)
   - Form submissions to external URLs
   - Missing CSRF protection on forms
   - **Fix**: Set autocomplete appropriately, verify form action URLs

6. **Dependencies** — Run:
   ```bash
   npm audit --workspace=frontend
   ```
   Report any known vulnerabilities.

## Output Format

```markdown
## Security Review: Frontend

### Critical (immediate action required)
- [Finding, file:line, remediation]

### High
- [...]

### Medium
- [...]

### Low
- [...]

### Passed Checks
- [List of checks that passed]

### Summary
- Total findings: N (C critical, H high, M medium, L low)
- npm audit: N vulnerabilities
```

## Rules
- This is a read-only review — never modify files
- Report specific file paths and line numbers for every finding
- Include remediation advice with code examples for each finding
- Run `npm audit` for the frontend workspace
