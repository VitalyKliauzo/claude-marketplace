# Changelog

All notable changes to the `react-quality-suite` plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2026-04-30

### Fixed
- Updated WCAG checklist with corrected ARIA pattern examples for accordion and tabs
- Fixed false positive in pre_tool_use hook for styled-components `css` prop

## [1.2.0] - 2026-04-20

### Added
- `/component-check` command for consolidated quality audits (a11y + perf + conventions)
- `review-security` skill for frontend security review (XSS, secrets, external URLs)
- Pre-tool-use hook blocking `dangerouslySetInnerHTML` and `as any` prop assertions

### Changed
- `review-a11y` skill now checks both light and dark mode contrast ratios

## [1.1.0] - 2026-04-01

### Added
- `review-perf-react` skill for React performance review
- `test-react` skill for generating Vitest + Testing Library tests
- `qa` agent for comprehensive quality assurance

## [1.0.0] - 2026-03-01

### Added
- Initial release with `review-a11y` skill, WCAG checklist, and ARIA patterns resources
- `react-dev` agent for React frontend development
