---
name: changelog
description: Preview or generate a changelog from conventional commit history
---

Generate a changelog from git commit history using conventional commit format, without performing a release.

## Scope
Project-level.

## Usage
- `/changelog` — preview changelog since last tag (or all commits if no tags)
- `/changelog write` — preview and write to `CHANGELOG.md`

## Steps

1. **Find the last tag** — Run `git describe --tags --abbrev=0 2>/dev/null`. If no tags exist, use the first commit.

2. **Read commit history** — Run `git log --oneline <last-tag>..HEAD` to get all commits since the last release.

3. **Parse conventional commits** — Group commits by type:
   - **Features** (`feat:`): new functionality
   - **Bug Fixes** (`fix:`): bug fixes
   - **Performance** (`perf:`): performance improvements
   - **Breaking Changes**: commits with `BREAKING CHANGE` in body or `!` after type
   - **Other**: `refactor:`, `test:`, `docs:`, `chore:`, `style:`, `ci:`, `build:`

4. **Format the changelog** — Generate markdown:

   ```markdown
   ## [Unreleased]

   ### Features
   - description (commit hash)

   ### Bug Fixes
   - description (commit hash)

   ### Performance
   - description (commit hash)

   ### Breaking Changes
   - description (commit hash)

   ### Other
   - description (commit hash)
   ```

5. **Output or write**:
   - Default: display the changelog in the conversation
   - If `write` argument: prepend to `CHANGELOG.md` (create if doesn't exist)

## Rules
- Use the commit description (after the `type(scope):` prefix), not the full message
- Include the short commit hash for reference
- Skip merge commits
- Group by type, then sort chronologically within each group
- If writing to file, preserve existing content below the new section
