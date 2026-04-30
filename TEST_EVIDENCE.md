# Test Evidence

## Plugin 1: nestjs-dev-kit

### Test 1: Pre-tool-use hook blocks `prisma migrate reset`

**Input**: Attempted to run `prisma migrate reset` via Bash tool in a project with the plugin installed.

**Expected**: Hook blocks the command with an error message.

**Evidence**:

```
$ echo '{"tool_name":"Bash","tool_input":{"command":"npx prisma migrate reset"}}' | node plugins/nestjs-dev-kit/hooks/pre_tool_use.js
BLOCKED: prisma migrate reset — destroys all data. Use prisma migrate dev instead
$ echo $?
2
```

The hook correctly exited with code 2 (block) and printed a descriptive error message to stderr.

### Test 2: Pre-tool-use hook blocks DELETE FROM without WHERE

**Input**: Attempted to run a SQL DELETE without a WHERE clause.

**Expected**: Hook blocks the command.

**Evidence**:

```
$ echo '{"tool_name":"Bash","tool_input":{"command":"psql -c \"DELETE FROM users\""}}' | node plugins/nestjs-dev-kit/hooks/pre_tool_use.js
BLOCKED: DELETE FROM without WHERE clause — prevents mass data deletion
$ echo $?
2
```

### Test 3: Pre-tool-use hook allows safe operations

**Input**: Attempted to run a normal Prisma migration.

**Expected**: Hook allows the command (exit code 0).

**Evidence**:

```
$ echo '{"tool_name":"Bash","tool_input":{"command":"npx prisma migrate dev --name add-products"}}' | node plugins/nestjs-dev-kit/hooks/pre_tool_use.js
$ echo $?
0
```

The hook allowed the safe migration command through without blocking.

### Test 4: design-api skill has valid YAML frontmatter

**Input**: Checked the skill file for valid frontmatter format.

**Expected**: Skill file has `name` and `description` fields in YAML frontmatter.

**Evidence**:

```
$ head -4 plugins/nestjs-dev-kit/skills/design-api/SKILL.md
---
name: design-api
description: Design NestJS API contracts following project conventions (backend only)
---
```

### Test 5: nest-dev agent has valid YAML frontmatter with required fields

**Input**: Checked the agent file for valid frontmatter.

**Expected**: Agent has `name`, `description`, `tools`, `model` fields.

**Evidence**:

```
$ head -7 plugins/nestjs-dev-kit/agents/nest-dev.md
---
name: nest-dev
description: NestJS API developer agent. Use when implementing backend modules, controllers, services, and DTOs. Invoke after database changes are complete.
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
color: red
---
```

### Test 6: MCP server configuration is valid JSON

**Input**: Validated the .mcp.json file.

**Expected**: Valid JSON with server configuration.

**Evidence**:

```
$ python3 -m json.tool plugins/nestjs-dev-kit/.mcp.json
{
    "mcpServers": {
        "nestjs-prisma-docs": {
            "command": "npx",
            "args": [
                "-y",
                "@anthropic-ai/context7-mcp@latest"
            ],
            "description": "Context7 MCP server for NestJS and Prisma documentation lookup..."
        }
    }
}
```

---

## Plugin 2: react-quality-suite

### Test 1: Pre-tool-use hook blocks dangerouslySetInnerHTML in React components

**Input**: Attempted to write a React component containing `dangerouslySetInnerHTML`.

**Expected**: Hook blocks the write operation.

**Evidence**:

```
$ echo '{"tool_name":"Write","tool_input":{"file_path":"src/components/Card.tsx","content":"<div dangerouslySetInnerHTML={{__html: userInput}} />"}}' | node plugins/react-quality-suite/hooks/pre_tool_use.js
BLOCKED: dangerouslySetInnerHTML in React component — XSS risk. Use a sanitization library (DOMPurify) or render safe content directly
$ echo $?
2
```

### Test 2: Pre-tool-use hook blocks `as any` on React props

**Input**: Attempted to edit a React component with `as any` type assertion on props.

**Expected**: Hook blocks the edit.

**Evidence**:

```
$ echo '{"tool_name":"Edit","tool_input":{"file_path":"src/components/Button.tsx","new_string":"const props = rawProps as any"}}' | node plugins/react-quality-suite/hooks/pre_tool_use.js
BLOCKED: "as any" type assertion on React props — defeats TypeScript safety. Define proper prop types instead
$ echo $?
2
```

### Test 3: Pre-tool-use hook allows normal React component writes

**Input**: Attempted to write a normal React component without dangerous patterns.

**Expected**: Hook allows the operation.

**Evidence**:

```
$ echo '{"tool_name":"Write","tool_input":{"file_path":"src/components/Card.tsx","content":"export const Card = ({ title }: CardProps) => <div>{title}</div>"}}' | node plugins/react-quality-suite/hooks/pre_tool_use.js
$ echo $?
0
```

### Test 4: review-a11y skill references WCAG resources correctly

**Input**: Verified the skill file references its companion resources.

**Expected**: SKILL.md references `wcag-checklist.md` and `aria-patterns.md` in the resources directory.

**Evidence**:

```
$ grep "resources/" plugins/react-quality-suite/skills/review-a11y/SKILL.md
- `${CLAUDE_SKILL_DIR}/resources/wcag-checklist.md` — WCAG 2.1 AA checklist with React-specific notes
- `${CLAUDE_SKILL_DIR}/resources/aria-patterns.md` — Correct ARIA patterns for common React components
```

Both resource files exist:

```
$ ls plugins/react-quality-suite/skills/review-a11y/resources/
aria-patterns.md
wcag-checklist.md
```

### Test 5: WCAG checklist covers all 4 principles

**Input**: Checked the checklist structure.

**Expected**: All 4 WCAG principles present.

**Evidence**:

```
$ grep "^## Principle" plugins/react-quality-suite/skills/review-a11y/resources/wcag-checklist.md
## Principle 1: Perceivable
## Principle 2: Operable
## Principle 3: Understandable
## Principle 4: Robust
```

---

## Plugin 3: fullstack-orchestrator

### Test 1: tech-lead skill references cross-plugin agents

**Input**: Verified the tech-lead skill explicitly names agents from the other two plugins.

**Expected**: References to `@nest-dev`, `@db-dev` (from nestjs-dev-kit) and `@react-dev`, `@qa` (from react-quality-suite).

**Evidence**:

```
$ grep -n "@nest-dev\|@db-dev\|@react-dev\|@qa" plugins/fullstack-orchestrator/skills/tech-lead/SKILL.md
13:- **nestjs-dev-kit**: `@nest-dev` (NestJS API developer), `@db-dev` (Prisma database developer)
14:- **react-quality-suite**: `@react-dev` (React frontend developer), `@qa` (QA engineer)
33:Spawn `@db-dev` (from **nestjs-dev-kit**) with the architecture document path.
38:Spawn `@nest-dev` (from **nestjs-dev-kit**) with the architecture document path.
43:Spawn `@react-dev` (from **react-quality-suite**) with the architecture document path.
48:Spawn `@qa` (from **react-quality-suite**) with the story document path.
66:[ ] Phase 4: Backend (@nest-dev)   -> pending
67:[ ] Phase 5: Frontend (@react-dev) -> pending
68:[ ] Phase 6: QA (@qa)              -> pending
78:- Endpoints implemented: N (by @nest-dev)
79:- Components implemented: N (by @react-dev)
```

Cross-plugin agent references confirmed across 10 locations in the skill file.

### Test 2: build-pipeline command delegates to all 7 agents

**Input**: Verified the build-pipeline command references all agent roles.

**Expected**: All 7 agents mentioned with clear delegation steps.

**Evidence**:

```
$ grep "^@\|from \`" plugins/fullstack-orchestrator/commands/build-pipeline.md
- `@nest-dev` (from `nestjs-dev-kit`) — NestJS API implementation
- `@db-dev` (from `nestjs-dev-kit`) — Prisma schema and migrations
- `@react-dev` (from `react-quality-suite`) — React frontend implementation
- `@qa` (from `react-quality-suite`) — Quality assurance
- `@architect` — Architecture design
- `@doc-writer` — Documentation
- `@ba` — Business analysis
@ba — Analyze the feature request:
@architect — Design the technical architecture:
@db-dev — Implement Prisma schema changes:
@nest-dev — Implement the NestJS API:
@react-dev — Implement the React UI:
@qa — Run comprehensive QA:
@doc-writer — Update project documentation:
```

### Test 3: All plugin.json files are valid JSON and names match marketplace

**Input**: Validated all 3 plugin manifests and compared names with marketplace.json.

**Expected**: All JSON valid, names consistent.

**Evidence**:

```
$ for f in plugins/*/\.claude-plugin/plugin.json; do echo "=== $f ==="; python3 -c "import json; d=json.load(open('$f')); print(f'  name: {d[\"name\"]}  version: {d[\"version\"]}')"; done
=== plugins/fullstack-orchestrator/.claude-plugin/plugin.json ===
  name: fullstack-orchestrator  version: 1.0.0
=== plugins/nestjs-dev-kit/.claude-plugin/plugin.json ===
  name: nestjs-dev-kit  version: 2.1.0
=== plugins/react-quality-suite/.claude-plugin/plugin.json ===
  name: react-quality-suite  version: 1.2.1

$ python3 -c "import json; d=json.load(open('.claude-plugin/marketplace.json')); [print(f'  {p[\"name\"]} -> {p[\"source\"]}') for p in d['plugins'][:3]]"
  nestjs-dev-kit -> ./plugins/nestjs-dev-kit
  react-quality-suite -> ./plugins/react-quality-suite
  fullstack-orchestrator -> ./plugins/fullstack-orchestrator
```

All names match between marketplace.json and individual plugin.json files.

### Test 4: Marketplace manifest is valid JSON with all required fields

**Input**: Validated the marketplace manifest structure.

**Expected**: Valid JSON with name, owner, plugins fields.

**Evidence**:

```
$ python3 -c "
import json
d = json.load(open('.claude-plugin/marketplace.json'))
print(f'name: {d[\"name\"]}')
print(f'owner: {d[\"owner\"][\"name\"]} <{d[\"owner\"][\"email\"]}>')
print(f'plugins: {len(d[\"plugins\"])} entries')
for p in d['plugins']:
    print(f'  - {p[\"name\"]} v{p[\"version\"]}: {p[\"description\"][:60]}...')
"
name: nestjs-react-devkit
owner: Vitali Kliauzo <vitalykliauzo@coherentsolutions.com>
plugins: 4 entries
  - nestjs-dev-kit v2.1.0: NestJS backend development toolkit — API scaffolding, Pr...
  - react-quality-suite v1.2.1: React frontend quality toolkit — accessibility audits, pe...
  - fullstack-orchestrator v1.0.0: Full-stack SDLC orchestrator — release management, change...
  - nestjs-react-devkit-github v1.0.0: GitHub-hosted mirror of the nestjs-react-devkit marketplac...
```
