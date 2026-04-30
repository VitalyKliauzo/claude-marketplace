# Changelog

All notable changes to the `fullstack-orchestrator` plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-30

### Added
- `/build-pipeline` command for orchestrating full-stack feature development across 7 agents
- `/release-prep` command for validating and preparing releases
- `release` skill for executing version bumps with release-it
- `changelog` skill for generating changelogs from conventional commits
- `tech-lead` skill for coordinating the full SDLC pipeline
- `architect` agent for technical architecture and design
- `doc-writer` agent for documentation updates
- `ba` agent for business analysis and user stories
- Context7 MCP server for documentation lookup
- Cross-plugin integration: `build-pipeline` and `tech-lead` delegate to `@nest-dev`, `@db-dev` (from nestjs-dev-kit) and `@react-dev`, `@qa` (from react-quality-suite)
