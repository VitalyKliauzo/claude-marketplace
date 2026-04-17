# Grading Rubric — Plugin Marketplace Builder Challenge

## Total: 100 Points (+ 35 Bonus)

---

## 1. Marketplace Manifest (15 points)

**File**: `.claude-plugin/marketplace.json` (repository root)

| Criterion | Points | Description |
|---|---|---|
| File exists at correct path and tracked in git | 3 | Present at `.claude-plugin/marketplace.json` and visible in `git ls-files` |
| Valid JSON syntax | 3 | Parseable, no trailing commas, no syntax errors |
| Required fields present | 3 | `name`, `owner`, `plugins` all present; placeholder values replaced |
| Exactly 3 plugin entries | 3 | `plugins` array has three items |
| Each `source` path points to a real folder | 3 | Paths resolve to actual plugin folders under `plugins/` |

**Required shape**:

```json
{
  "name": "string",
  "owner": { "name": "string", "email": "string" },
  "plugins": [ { "name": "...", "source": "./plugins/...", "description": "...", "version": "..." }, ... ]
}
```

---

## 2. Plugin Manifests (15 points)

**Files**: `plugins/*/​.claude-plugin/plugin.json` (three files)

| Criterion | Points | Description |
|---|---|---|
| All 3 manifests exist and are tracked | 6 | 2 points per manifest |
| All 3 parse as valid JSON | 3 | 1 point per manifest |
| Required fields per manifest | 3 | `name`, `version`, `description` — 1 point per manifest |
| Plugin names match marketplace entries | 3 | Consistency between `marketplace.json` and each `plugin.json` |

---

## 3. Component Diversity (20 points)

Across the 3 plugins, the trainee must use **at least 4 of these 5 component types**:

1. Commands (`commands/*.md`)
2. Hooks (`hooks/hooks.json` with at least one event configured)
3. Skills (`skills/<n>/SKILL.md` with valid YAML frontmatter)
4. Subagents (`agents/*.md` with valid YAML frontmatter)
5. MCP servers (`.mcp.json` with at least one server entry)

| Types used | Points |
|---|---|
| 5 of 5 | 20 |
| 4 of 5 | 16 |
| 3 of 5 | 10 |
| 2 of 5 | 5 |
| 1 of 5 | 0 |

Empty folders and placeholder-only files do NOT count as a component. Each component must have real content.

---

## 4. Plugin Cohesion (15 points)

A cohesive plugin has components that serve one purpose. Installing the plugin should deliver one unified capability.

| Criterion | Points | Description |
|---|---|---|
| Plugin 1 components serve its stated description | 5 | Components align with the plugin's `description` field |
| Plugin 2 components serve its stated description | 5 | Same |
| Plugin 3 components serve its stated description | 5 | Same |

**Cohesive example**: `spring-security-kit` with a hook blocking `mvn flyway:clean`, an `/audit` command, and a `secrets-scanner` subagent.

**Incohesive example**: `security-kit` with a blog-writer skill and a weather MCP server mixed in.

---

## 5. Practice-Specific Content (10 points)

Generic content that works for any language loses points. Content must reflect the trainee's chosen practice area.

| Criterion | Points | Description |
|---|---|---|
| Plugin 1 references track-specific tools/patterns | 4 | |
| Plugin 2 references track-specific tools/patterns | 3 | |
| Plugin 3 references track-specific tools/patterns | 3 | |

**Track-specific signals** that earn full credit:

| If the trainee is building for | Look for references to |
|---|---|
| .NET | `dotnet`, `EF Core`, `appsettings.json`, ASP.NET Core, C# idioms |
| Java/Spring | `mvn`/`gradle`, Spring annotations, `application.yml`, JPA |
| React | React, TypeScript, JSX, `npm`/`yarn`, accessibility/WCAG |
| Android | Kotlin, Compose, Gradle, keystore, Hilt |
| iOS | Swift, SwiftUI, provisioning, CocoaPods |
| QA | Selenium/Playwright, Page Object Model, test runners |

Generic content that loses points: "write good code", `rm -rf` hook only (universal, not track-specific), "review this code" command.

---

## 6. Originality (5 points)

The instructor's example marketplace was shown in class. Trainees must build their own, not copy.

| Criterion | Points | Description |
|---|---|---|
| Plugin names differ from instructor's example | 2 | Not a rename-only submission |
| Component implementations are distinct | 3 | Content is the trainee's own work, not lifted verbatim |

**Automatic zero** on this category if the submission is substantially a copy of the instructor's example marketplace.

---

## 7. INSTALL.md (5 points)

| Criterion | Points | Description |
|---|---|---|
| File exists and is tracked | 1 | `INSTALL.md` present at repo root |
| `/plugin marketplace add` command shown | 1 | Correct command to add this marketplace |
| Install commands for all 3 plugins | 2 | One `/plugin install` per plugin with correct marketplace name |
| Verification step | 1 | Shows how to confirm install worked (e.g., `/plugin` listing) |

---

## 8. TEST_EVIDENCE.md (10 points)

| Criterion | Points | Description |
|---|---|---|
| File exists and is tracked | 1 | `TEST_EVIDENCE.md` present at repo root |
| Evidence for plugin 1 | 3 | At least 2 tests with input + result |
| Evidence for plugin 2 | 3 | At least 2 tests with input + result |
| Evidence for plugin 3 | 3 | At least 2 tests with input + result |

**Acceptable evidence**:

- Screenshots embedded in the markdown or committed as images
- Paste of Claude Code terminal output showing the feature firing
- Hook logs showing exit code and stderr message
- Claude's response showing a skill applied or a subagent invoked

**Insufficient evidence**:

- "It works" without proof
- Placeholder text left in the file
- Screenshots of unrelated activity

---

## 9. EXPLANATION.md (5 points)

| Criterion | Points | Description |
|---|---|---|
| File exists and is tracked | 1 | |
| Explains why three plugins, not one or ten | 2 | Design rationale for the split |
| Addresses cohesion reasoning | 1 | Shows awareness of what belongs together |
| Addresses future changes | 1 | Mentions versioning or evolution thoughts |

---

## Bonus Challenges (up to 35 points)

| Bonus | Points | Criteria |
|---|---|---|
| All 5 types in one plugin | +10 | One plugin folder contains commands/, hooks/, skills/, agents/, AND .mcp.json, all non-empty |
| GitHub-hosted marketplace source | +10 | Second marketplace entry with `source: { "type": "github", "repo": "..." }` |
| Cross-plugin integration | +5 | A command in plugin A references an agent from plugin B, documented in EXPLANATION.md |
| Per-plugin CHANGELOG.md | +5 | Each plugin has a CHANGELOG.md in Keep-a-Changelog format |
| Semantic versioning across plugins | +5 | Plugins have version diversity (not all 1.0.0) with VERSION_LOG.md explaining bumps |

---

## Automatic Zeros

These failures override other scoring:

| Failure | Consequence |
|---|---|
| `.claude-plugin/` folders not tracked by git | 0 on categories 1, 2, 3 (50 points lost) |
| `marketplace.json` is invalid JSON | 0 on category 1, 50% deduction on category 2 |
| Submission on `main` branch (no PR) | Grader cannot run |
| Substantial copy of instructor's example marketplace | 0 on category 6, major deductions on 3-5 |

---

## Final Score Calculation

| Category | Max Points |
|---|---|
| Marketplace Manifest | 15 |
| Plugin Manifests | 15 |
| Component Diversity | 20 |
| Plugin Cohesion | 15 |
| Practice-Specific Content | 10 |
| Originality | 5 |
| INSTALL.md | 5 |
| TEST_EVIDENCE.md | 10 |
| EXPLANATION.md | 5 |
| **Base Total** | **100** |
| **Bonus** | **+35** |
| **Maximum** | **135** |

---

## Quick Checklist for Graders

- [ ] `.claude-plugin/marketplace.json` exists at repo root and is valid JSON
- [ ] Three plugin folders exist under `plugins/` with meaningful names
- [ ] Each plugin has `.claude-plugin/plugin.json`
- [ ] Placeholder `README.md` files are removed from plugin folders
- [ ] Component types across plugins: at least 4 of 5
- [ ] Each plugin is cohesive
- [ ] Content references track-specific tools
- [ ] Submission is NOT a copy of the instructor's example marketplace
- [ ] INSTALL.md has working commands
- [ ] TEST_EVIDENCE.md has real evidence for all 3 plugins
- [ ] EXPLANATION.md addresses the "why" questions
- [ ] `git ls-files | grep claude-plugin` shows all 4 manifests
