Prepare a release by validating quality, determining version bump, and previewing changes.

## Usage
- `/release-prep` — interactive release preparation
- `/release-prep patch` / `/release-prep minor` / `/release-prep major` — specify bump type

## Steps

1. **Pre-flight checks** — Run in parallel and report results:
   ```bash
   npm run test --workspace=backend
   npm run test --workspace=frontend
   npm run lint --workspace=backend
   npm run lint --workspace=frontend
   npm run build --workspace=backend
   npm run build --workspace=frontend
   ```
   If any fail, stop and report. Do not proceed with a failing build.

2. **Determine version bump** — If not specified:
   - Read `git log --oneline` since last tag
   - `feat:` commits -> minor bump
   - `fix:` commits only -> patch bump
   - `BREAKING CHANGE` in any commit body -> major bump
   - Show determination and ask for confirmation

3. **Generate changelog preview** — Parse conventional commits since last tag:
   - Group by type: Features, Bug Fixes, Performance, Breaking Changes, Other
   - Format as Keep-a-Changelog markdown

4. **Show release summary**:
   ```
   Release Preparation
   ====================
   Current version: X.Y.Z
   Proposed version: X.Y.Z
   
   Pre-flight: PASS
   - Backend tests: PASS (N tests)
   - Frontend tests: PASS (N tests)
   - Backend lint: PASS
   - Frontend lint: PASS
   - Backend build: PASS
   - Frontend build: PASS
   
   Changelog entries: N
   - Features: N
   - Bug fixes: N
   - Other: N
   
   Ready to release? Confirm to proceed.
   ```

5. **Wait for user confirmation** — Never execute the release automatically.

## Rules
- Never release without passing all pre-flight checks
- Never release without user confirmation
- Never push to remote automatically — the user decides when to push
