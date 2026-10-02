# Design

## Context

The repo is currently empty except for OpenSpec scaffolding and Claude Code plugin config — no application code exists yet. See proposal.md - Why for the motivation (a second API and second frontend are planned later, both sharing code with their siblings).

## Goals / Non-Goals

**Goals:**
- Pick a monorepo orchestrator and package-management setup that won't need to be re-architected when the second API and second frontend are added.
- Stand up both initial apps as empty skeletons that prove the toolchain works end-to-end (build, run, routing).

**Non-Goals:**
- Implementing any login/auth functionality (explicitly deferred).
- Creating shared `packages/`/`libs/` directories — nothing exists yet to share between siblings, so these are deferred until the second API/frontend land.
- Setting up CI pipelines.

## Decisions

### Orchestrator: moon, not Nx or Turborepo
Both future siblings (second API, second frontend) are expected to share code with their counterparts — meaning both the .NET side and the JS/TS side need equally solid cross-project tooling. Nx's .NET support is a community plugin (`@nx-dotnet/core`), second-tier relative to its native JS/TS tooling. Turborepo has no toolchain-version-pinning story and is purely a task runner. moon treats any language as a first-class "system" platform — a `.NET` task and a `JS` task are both just hashed inputs/outputs — and `proto` lets it pin the Node and .NET SDK versions in one place. Trade-off accepted: moon has no code generators and no enforced module-boundary linting, unlike Nx; boundary discipline between future shared packages and apps will rely on code review rather than tooling.

### Package manager: pnpm
Chosen for strict, non-flat dependency resolution — avoids phantom-dependency bugs once a shared `packages/` directory exists and both frontends depend on it.

### Backend: controller-based ASP.NET Core Web API
Explicit choice over the minimal-API template style, per requirement. `Program.cs` calls `AddControllers()`/`MapControllers()`; `HelloWorldController` is a standard `ControllerBase` subclass with a `[HttpGet]` action.

### Frontend: Vite (not Next.js)
No SSR/file-based-routing requirement exists yet; Vite is the lower-ceremony choice for a plain SPA skeleton and pairs cleanly with pnpm workspaces.

### Folder layout
```
LoginExample/
├── .moon/
│   ├── workspace.yml
│   └── toolchain.yml
├── apps/
│   ├── LoginBackend/
│   └── LoginFrontend/
├── pnpm-workspace.yaml
└── package.json
```
`apps/` is used (not `services/`+`clients/` or similar split) so the convention already fits the second API/frontend pair without renaming anything. No `packages/`/`libs/` directory is created yet — see Non-Goals.

## Risks / Trade-offs

- [moon has a smaller community/ecosystem than Nx or Turborepo] → Accepted: the polyglot symmetry it provides outweighs ecosystem size for a repo with real sharing needs on both stacks.
- [No enforced module-boundary tooling between future shared packages and apps] → Mitigation: rely on code review discipline; revisit if boundary violations become a recurring problem.
- [Deferring shared `packages/`/`libs/` means some rework when the second API/frontend land] → Accepted: extracting shared code once real duplication exists is cheaper and more accurate than guessing its shape now.

## Migration Plan

Not applicable — greenfield repo, no existing system to migrate or roll back.
