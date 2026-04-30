# Changelog

All notable changes to the `nestjs-dev-kit` plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-04-30

### Added
- `/api-scaffold` command for generating complete NestJS modules with controller, service, DTOs, and tests
- Context7 MCP server integration for NestJS and Prisma documentation lookup

### Changed
- Improved `nest-dev` agent instructions with clearer Swagger decorator guidance

## [2.0.0] - 2026-04-15

### Added
- `design-api` skill for designing NestJS API contracts
- `test-nest-api` skill for generating @nestjs/testing unit tests
- `review-perf-nest-api` skill for backend performance reviews
- `nest-dev` agent for NestJS module implementation
- `db-dev` agent for Prisma schema changes and migrations
- Pre-tool-use hook blocking dangerous Prisma and SQL operations

### Breaking Changes
- Agents now require `CLAUDE.md` at the project root for convention discovery

## [1.0.0] - 2026-03-01

### Added
- Initial release with `nest-dev` agent and basic hooks
