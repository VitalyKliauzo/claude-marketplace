# Plugin One — Placeholder

**Rename this folder before submitting.** Pick a name that reflects what your plugin does: `spring-security-kit`, `react-review-kit`, `android-workflow-kit`, etc.

## What to do here

1. **Rename the folder** — replace `plugin-one` with a meaningful name.
2. **Update `.claude-plugin/plugin.json`** — set `name`, `description`, `keywords`, `author`.
3. **Add components** — create any of these subfolders based on what your plugin does:
   - `commands/` — custom slash commands (`.md` files)
   - `hooks/` — hook configuration + scripts (`hooks.json` + scripts)
   - `skills/<skill-name>/SKILL.md` — skills with YAML frontmatter
   - `agents/` — subagent definitions (`.md` files with YAML frontmatter)
   - `.mcp.json` — MCP server configuration
4. **Update `../../.claude-plugin/marketplace.json`** — reflect your new name and path in the `plugins` array.
5. **Delete this README** once your plugin is filled in.

## Reminder

Your three plugins must collectively use **at least 4 of the 5 component types** (commands, hooks, skills, subagents, MCP servers). Distribution is up to you.

See the root [README.md](../../README.md) for full requirements and the instructor's example marketplace for reference shapes — **do not copy it, build your own**.
