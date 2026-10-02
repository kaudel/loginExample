# Tasks

## 1. Root workspace tooling

- [x] 1.1 Create `pnpm-workspace.yaml` (packages: `apps/*`) and a root `package.json` (private, pins the `packageManager` field to the chosen pnpm version) and verify `pnpm install` runs without error from the repo root
- [x] 1.2 Create `.moon/workspace.yml` declaring projects under `apps/*` and `.moon/toolchains.yml` pinning the Node version (pnpm toolchain plugin); .NET SDK pinned via `global.json` since moon has no built-in .NET toolchain. Verified `moon --version` and `moon projects --json` run without configuration errors (empty project list expected until app `moon.yml` files exist)

## 2. LoginBackend skeleton (hello-world-api)

- [x] 2.1 Scaffold a controller-based ASP.NET Core Web API project at `apps/LoginBackend` (`dotnet new webapi --use-controllers`) and verify `LoginBackend.csproj` and `Program.cs` exist with `AddControllers()`/`MapControllers()` wired in (default WeatherForecast template files removed as out-of-scope boilerplate)
- [x] 2.2 Add `HelloWorldController` with a `[HttpGet]` action named `HelloWorld` returning the string `HelloWorld`, and verify `dotnet build` succeeds in `apps/LoginBackend`
- [x] 2.3 Add `apps/LoginBackend/moon.yml` with `build`/`run` tasks wrapping `dotnet build`/`dotnet run`, and verify `moon run LoginBackend:build` succeeds from the repo root
- [x] 2.4 Run the API locally and verify a GET request to the `HelloWorld` endpoint returns HTTP 200 with body `HelloWorld`, confirming the `hello-world-api` spec scenario

## 3. LoginFrontend skeleton (welcome-page)

- [x] 3.1 Scaffold a Vite React (TypeScript) app at `apps/LoginFrontend` (`pnpm create vite . --template react-ts`) and verify `package.json` and `src/main.tsx` exist
- [x] 3.2 Update the initial page component to render the text `Welcome` (removed now-orphaned default template assets), and verify `pnpm --filter loginfrontend build` succeeds (npm package name is lowercase per convention)
- [x] 3.3 Add `apps/LoginFrontend/moon.yml` with `dev`/`build` tasks, and verify `moon run LoginFrontend:build` succeeds from the repo root
- [x] 3.4 Run the dev server and verify the root page renders the text `Welcome`, confirming the `welcome-page` spec scenario

## 4. Cross-project integration

- [x] 4.1 Run `pnpm install` from the repo root with both apps present and verify the workspace resolves `LoginFrontend` as a workspace package
- [x] 4.2 Run `moon run :build` from the repo root and verify both `LoginBackend` and `LoginFrontend` build successfully in a single invocation, confirming moon orchestrates both languages correctly
- [x] 4.3 Add a short "Getting started" section to the repo root `README.md` listing the install/build/run commands, and verify each documented command runs as written
