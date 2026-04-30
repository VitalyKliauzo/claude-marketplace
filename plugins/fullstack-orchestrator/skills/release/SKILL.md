---
name: release
description: Orchestrate a full release workflow (tests, build, version bump, changelog, tag)
---

Run the complete release workflow: verify quality, bump version, generate changelog, and create a git tag.

## Scope
Project-level. Requires `release-it` to be installed (check `package.json` for the `release` script).

## Usage
- `/release` — interactive release (preview first, then confirm)
- `/release patch` / `/release minor` / `/release major` — specify bump type

## Steps

1. **Pre-flight checks** — Run in parallel:
   - `npm run test --workspace=backend` — all backend tests pass
   - `npm run test --workspace=frontend` — all frontend tests pass
   - `npm run lint --workspace=backend` — no lint errors
   - `npm run lint --workspace=frontend` — no lint errors
   - `npm run build --workspace=backend` — backend compiles
   - `npm run build --workspace=frontend` — frontend compiles
   - If any fail, stop and report. Do not proceed with a failing build.

2. **Determine version bump** — If not specified by the user:
   - Read `git log --oneline` since last tag
   - `feat:` commits -> minor bump
   - `fix:` commits only -> patch bump
   - `BREAKING CHANGE` in any commit body -> major bump
   - Show the determination and ask for confirmation

3. **Dry run** — Run `npm run release:dry` (or `release-it --dry-run`):
   - Show the proposed version number
   - Show the changelog entries that will be generated
   - Show the files that will be modified

4. **Confirm with user** — Present the dry run results and wait for explicit confirmation before proceeding.

5. **Execute release** — Run `npm run release` (or `release-it`):
   - Bumps version in `package.json`
   - Generates/updates `CHANGELOG.md`
   - Creates a git commit with the version bump
   - Creates a git tag

6. **Report** — Output:
   ```
   Release complete:
   - Version: X.Y.Z
   - Tag: vX.Y.Z
   - Changelog: updated with N entries
   - Commit: <hash>
   ```

## Rules
- Never release without passing tests and build
- Never release without user confirmation
- Never push to remote automatically — the user decides when to push
- If `release-it` is not installed, inform the user and suggest: `npm install -D release-it @release-it/conventional-changelog`
