# Claude Code Plugin Marketplace Builder Challenge

**Course**: Claude Code Mastering - Level 2
**Assignment**: Plugin Marketplace Builder Challenge
**Duration**: Recommended 3-5 hours
**Difficulty**: Intermediate to Advanced
**Prerequisites**: Lectures 2 (Hooks), 3 (Skills), 4 (Subagents), 5 (MCP)

---

## Introduction

You've built hooks, skills, and subagents as separate artifacts. Now you'll **package them for distribution**. Plugins are how Claude Code expertise leaves your machine and lands on someone else's — a colleague, a team, or the whole company.

**This repository IS a plugin marketplace.** Fill it in with three plugins of your own design, then use your own marketplace from Claude Code to prove it works.

## Learning Objectives

By completing this assignment, you will:

- Master `plugin.json` and `marketplace.json` manifest schemas
- Package components (commands, hooks, skills, subagents, MCP servers) into plugins
- Design cohesive plugins — bundles that belong together
- Install, test, and use plugins from a local marketplace
- Version and distribute expertise across projects

## Why This Matters

- **Portable teams** — Everyone gets the same Claude Code setup with one install
- **Versioned expertise** — Bump a version, everyone updates
- **Separation of concerns** — Security, review, and workflow plugins live independently
- **Onboarding speed** — New hire installs your marketplace and inherits the team's full Claude setup

---

## Starter Repository Layout

The repo you've cloned has this structure:

```
.
├── .claude-plugin/
│   └── marketplace.json              # Marketplace manifest — edit this
├── plugins/
│   ├── plugin-one/                   # Placeholder — rename and fill
│   │   ├── .claude-plugin/plugin.json
│   │   └── README.md                 # Delete when you're done
│   ├── plugin-two/                   # Placeholder — rename and fill
│   │   ├── .claude-plugin/plugin.json
│   │   └── README.md                 # Delete when you're done
│   └── plugin-three/                 # Placeholder — rename and fill
│       ├── .claude-plugin/plugin.json
│       └── README.md                 # Delete when you're done
├── .gitignore                        # Pre-configured to allow dotfolders
├── README.md                         # This file
├── RUBRIC.md                         # Grading criteria
├── INSTALL.md                        # You will write this
├── TEST_EVIDENCE.md                  # You will write this
└── EXPLANATION.md                    # You will write this
```

The three plugin folders (`plugin-one`, `plugin-two`, `plugin-three`) are **placeholders with neutral names**. Rename them to something meaningful — for example `spring-security-kit`, `react-review-kit`, `android-workflow-kit`. The names should reflect what your plugins do.

---

## What You Will Deliver

### 1. A Working Marketplace Manifest

Edit `.claude-plugin/marketplace.json`:

- Replace `REPLACE-ME-marketplace-name` with a real marketplace name
- Set `owner` to your real name and email
- For each plugin entry: update `name`, `source`, `description`, `category`, `keywords`
- `source` paths must match your renamed plugin folders

### 2. Three Plugins

Each plugin lives in `plugins/<your-name>/` and must have:

- `.claude-plugin/plugin.json` — filled in with real values
- Component folders based on what your plugin does (see below)

**The component rule** — across your three plugins, you must use **at least 4 of these 5 component types**:

| Component | Folder / File | From Lecture |
|---|---|---|
| Commands | `commands/*.md` | Lecture 1 |
| Hooks | `hooks/hooks.json` + scripts | Lecture 2 |
| Skills | `skills/<name>/SKILL.md` | Lecture 3 |
| Subagents | `agents/*.md` | Lecture 4 |
| MCP servers | `.mcp.json` | Lecture 5 |

You choose the distribution. A plugin with one component is valid. A plugin with all five is a bonus (+10 points).

**Plugins must be cohesive** — the components inside serve one purpose. A plugin called `security-kit` that contains a blog-post skill loses points.

**Plugins must be track-specific** — generic plugins that would work for any language lose points. Your content must reflect your stack (Spring, React, Android, iOS, whatever you chose).

### 3. A Reference Exists — Build Your Own

The instructor's example marketplace was shown in class. It contains three real plugins with mixed components.

**Study its shape. Do not copy its content.**

The grader checks for originality. Plugins that duplicate the instructor's plugins (same names, same components, same logic) will lose points for originality. Your marketplace should reflect **your** choices for **your** practice area.

### 4. Documentation Files

Create three markdown files at the repository root:

- **`INSTALL.md`** — copy-paste commands to add and install your marketplace
- **`TEST_EVIDENCE.md`** — proof each plugin works (screenshots, logs, Claude output)
- **`EXPLANATION.md`** — why these three plugins, why these components, versioning thoughts

---

## Committing Dotfolders to Git

This is the trap most trainees hit. Plugin manifests live in `.claude-plugin/` folders — hidden by default in most IDEs.

The `.gitignore` in this repo is already configured to allow them. After your first commit, verify:

```bash
git ls-files | grep claude-plugin
```

You should see at least:

```
.claude-plugin/marketplace.json
plugins/<one>/.claude-plugin/plugin.json
plugins/<two>/.claude-plugin/plugin.json
plugins/<three>/.claude-plugin/plugin.json
```

If nothing shows up, your commits are missing the manifests. Check your global gitignore — something is overriding the repo's `.gitignore`.

---

## Step-by-Step Workflow

1. **Clone this starter repo** (done by GitHub Classroom)
2. **Read RUBRIC.md** — know what you're being scored on
3. **Design your three plugins** — on paper before writing code. What do they do? What components does each need?
4. **Rename the three plugin folders** — meaningful names, not `plugin-one`
5. **Edit `.claude-plugin/marketplace.json`** — reflect your real plugin names and paths
6. **Fill in each `plugins/<name>/.claude-plugin/plugin.json`**
7. **Build the components** — copy hooks from Lecture 2, skills from Lecture 3, agents from Lecture 4 where appropriate
8. **Delete the placeholder `README.md`** in each plugin folder
9. **Write `INSTALL.md`**, **`TEST_EVIDENCE.md`**, **`EXPLANATION.md`**
10. **Test the install locally**:
    ```
    /plugin marketplace add .
    /plugin install <your-plugin-one>@<your-marketplace-name>
    /plugin install <your-plugin-two>@<your-marketplace-name>
    /plugin install <your-plugin-three>@<your-marketplace-name>
    ```
11. **Capture evidence** of each plugin working — screenshots into `TEST_EVIDENCE.md`
12. **Commit, push, open PR** → grader runs automatically

---

## Bonus Challenges

| Bonus | Points |
|---|---|
| One plugin uses all 5 component types | +10 |
| Second marketplace.json entry pointing to a GitHub-hosted plugin source | +10 |
| Cross-plugin integration (command in plugin A invokes agent from plugin B, documented) | +5 |
| Per-plugin `CHANGELOG.md` in Keep-a-Changelog format | +5 |
| Semantic versioning across plugins with a `VERSION_LOG.md` | +5 |

---

## Submission

1. Create branch: `git checkout -b feature/plugin-marketplace`
2. Complete all files
3. **Verify dotfolders are tracked**: `git ls-files | grep claude-plugin`
4. Commit: `git commit -m "Complete plugin marketplace"`
5. Push: `git push origin feature/plugin-marketplace`
6. Open PR: `feature/plugin-marketplace → main`
7. The grader reads the PR diff, checks all changed files, and posts a grading report

---

## Resources

- [Plugins Documentation](https://docs.claude.com/en/docs/claude-code/plugins)
- [Plugin Marketplaces](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces)
- [Plugin Reference](https://docs.claude.com/en/docs/claude-code/plugins-reference)
- Instructor's example marketplace (shown in class) — **for shape, not content**
- Your own work from Lectures 2, 3, 4, 5

---

## Grading Summary

| Category | Points |
|---|---|
| Marketplace manifest | 15 |
| Plugin manifests (3) | 15 |
| Component diversity (4+ of 5 types) | 20 |
| Plugin cohesion | 15 |
| Practice-specific content | 10 |
| Originality (not a copy of instructor's example) | 5 |
| INSTALL.md | 5 |
| TEST_EVIDENCE.md | 10 |
| EXPLANATION.md | 5 |
| **Base total** | **100** |
| Bonus challenges | +35 max |
| **Maximum** | **135** |

See [RUBRIC.md](RUBRIC.md) for details.

---

## Common Mistakes

| Mistake | Consequence |
|---|---|
| `.claude-plugin/` gitignored | Grader sees no manifests → fails most criteria |
| Plugins still named `plugin-one`, `plugin-two` | Looks unfinished — originality/effort deduction |
| One plugin has five unrelated components | Cohesion tanks |
| Copy of instructor's marketplace | Originality: 0 |
| Generic plugin (works for any language) | Practice-specific score: 0 |
| Invalid JSON in manifest | Plugin won't install |
| `marketplace.json` plugin paths don't match renamed folders | Install fails |
| Placeholder `README.md` files left in plugin folders | Looks unfinished |
| No test evidence | Evidence score: 0 |

---

Good luck. Plugins are how your Claude Code work survives beyond your laptop.
