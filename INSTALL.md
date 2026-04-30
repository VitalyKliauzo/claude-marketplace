# Installation

## Prerequisites

- [Claude Code CLI](https://docs.claude.com/en/docs/claude-code) installed
- Plugin support enabled (Claude Code v1.0+)

## 1. Clone this repository

```bash
git clone git@github.com:VitalyKliauzo/claude-marketplace.git
cd claude-marketplace
```

## 2. Add the marketplace to Claude Code

In Claude Code, run:

```
/plugin marketplace add .
```

This registers the `nestjs-react-devkit` marketplace from the local directory.

## 3. Install all three plugins

```
/plugin install nestjs-dev-kit@nestjs-react-devkit
/plugin install react-quality-suite@nestjs-react-devkit
/plugin install fullstack-orchestrator@nestjs-react-devkit
```

## 4. Verify installation

Run the following to confirm all plugins are installed:

```
/plugin
```

You should see all 3 plugins listed:

```
Installed plugins:
  nestjs-dev-kit@2.1.0 (nestjs-react-devkit)
  react-quality-suite@1.2.1 (nestjs-react-devkit)
  fullstack-orchestrator@1.0.0 (nestjs-react-devkit)
```

## 5. Verify components loaded

- **Commands**: `/api-scaffold`, `/component-check`, `/build-pipeline`, `/release-prep`
- **Skills**: `/design-api`, `/test-nest-api`, `/review-a11y`, `/test-react`, `/release`, `/changelog`, `/tech-lead`
- **Agents**: `@nest-dev`, `@db-dev`, `@react-dev`, `@qa`, `@architect`, `@doc-writer`, `@ba`
- **Hooks**: Try `prisma migrate reset` — should be blocked by the safety hook
- **MCP**: Context7 documentation lookup available for NestJS/Prisma/React docs

## Alternative: Install from GitHub

```
/plugin marketplace add github:VitalyKliauzo/claude-marketplace
```

Then install plugins using the same `/plugin install` commands above.

## Uninstalling

```
/plugin uninstall nestjs-dev-kit@nestjs-react-devkit
/plugin uninstall react-quality-suite@nestjs-react-devkit
/plugin uninstall fullstack-orchestrator@nestjs-react-devkit
/plugin marketplace remove nestjs-react-devkit
```
