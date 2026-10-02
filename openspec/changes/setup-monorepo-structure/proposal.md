# Proposal

## Why

LoginExample needs a repo structure before the login feature itself can be built. The team already knows a second API and a second frontend are coming later, and both pairs will share code with their siblings, so the structure chosen now needs to support that without a rewrite — a plain two-folder layout would have to be restructured when the second apps arrive, which is avoidable by picking the right scaffolding up front.

## What Changes

- Add a moon workspace at the repo root (`.moon/workspace.yml`, `.moon/toolchain.yml`) to orchestrate tasks across apps and pin the Node and .NET SDK versions via `proto`.
- Add a pnpm workspace at the repo root (`pnpm-workspace.yaml`, root `package.json`) for the JS/TS side.
- Add `apps/LoginBackend`: a controller-based ASP.NET Core Web API skeleton (`Program.cs` wired with `MapControllers()`), including a `HelloWorldController` with a `GET` action named `HelloWorld` that returns the string `"HelloWorld"`.
- Add `apps/LoginFrontend`: a React app scaffolded with Vite, whose initial page renders the text `"Welcome"`.
- No shared `packages/` or `libs/` are introduced in this change — those are deferred until the second API and second frontend exist, so there's something real to extract into them.
- No login functionality (auth, forms, persistence) is implemented in this change — both apps are skeletons; the `HelloWorld` endpoint and `Welcome` page exist only to prove the toolchain and routing are wired end-to-end.

## Capabilities

### New Capabilities
- `hello-world-api`: A backend HTTP endpoint that confirms the API skeleton's routing and controller wiring work end-to-end, independent of any business feature.
- `welcome-page`: A frontend landing page that confirms the Vite/React skeleton renders, independent of any business feature.

### Modified Capabilities
(none — repo is greenfield, nothing existing changes)

## Impact

- New root-level tooling files: `.moon/workspace.yml`, `.moon/toolchain.yml`, `pnpm-workspace.yaml`, root `package.json`.
- New directories: `apps/LoginBackend` (.NET project + solution wiring) and `apps/LoginFrontend` (Vite project).
- No existing code, specs, or dependencies are affected (repo currently contains only OpenSpec scaffolding and plugin configuration).
- CI pipeline setup is out of scope for this change.
