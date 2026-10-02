# Tasks

## 1. Root workspace tooling

- [x] 1.1 Create `pnpm-workspace.yaml` (packages: `apps/*`) and a root `package.json` (private, pins the `packageManager` field to the chosen pnpm version) and verify `pnpm install` runs without error from the repo root
- [ ] 1.2 Create `.moon/workspace.yml` declaring projects under `apps/*` and `.moon/toolchain.yml` pinning the Node and .NET SDK versions via `proto`, and verify `moon --version` and `moon query projects` run without configuration errors (empty project list is expected until 2.x/3.x add project `moon.yml` files)

## 2. LoginBackend skeleton (hello-world-api)

- [ ] 2.1 Scaffold a controller-based ASP.NET Core Web API project at `apps/LoginBackend` (`dotnet new webapi --use-controllers`) and verify `LoginBackend.csproj` and `Program.cs` exist with `AddControllers()`/`MapControllers()` wired in
- [ ] 2.2 Add `HelloWorldController` with a `[HttpGet]` action named `HelloWorld` returning the string `HelloWorld`, and verify `dotnet build` succeeds in `apps/LoginBackend`
- [ ] 2.3 Add `apps/LoginBackend/moon.yml` with `build`/`run` tasks wrapping `dotnet build`/`dotnet run`, and verify `moon run LoginBackend:build` succeeds from the repo root
- [ ] 2.4 Run the API locally and verify a GET request to the `HelloWorld` endpoint returns HTTP 200 with body `HelloWorld`, confirming the `hello-world-api` spec scenario

## 3. LoginFrontend skeleton (welcome-page)

- [ ] 3.1 Scaffold a Vite React (TypeScript) app at `apps/LoginFrontend` (`pnpm create vite . --template react-ts`) and verify `package.json` and `src/main.tsx` exist
- [ ] 3.2 Update the initial page component to render the text `Welcome`, and verify `pnpm --filter LoginFrontend build` succeeds
- [ ] 3.3 Add `apps/LoginFrontend/moon.yml` with `dev`/`build` tasks, and verify `moon run LoginFrontend:build` succeeds from the repo root
- [ ] 3.4 Run the dev server and verify the root page renders the text `Welcome`, confirming the `welcome-page` spec scenario

## 4. Cross-project integration

- [ ] 4.1 Run `pnpm install` from the repo root with both apps present and verify the workspace resolves `LoginFrontend` as a workspace package
- [ ] 4.2 Run `moon run :build` from the repo root and verify both `LoginBackend` and `LoginFrontend` build successfully in a single invocation, confirming moon orchestrates both languages correctly
- [ ] 4.3 Add a short "Getting started" section to the repo root `README.md` listing the install/build/run commands, and verify each documented command runs as written
