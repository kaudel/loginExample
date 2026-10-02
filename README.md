# LoginExample

A monorepo containing the LoginExample applications: a .NET backend and a React frontend, orchestrated with [moon](https://moonrepo.dev) and [pnpm](https://pnpm.io) workspaces.

## Getting started

Install JS dependencies (pnpm workspace, covers `apps/LoginFrontend`):

```bash
pnpm install
```

Build every project (backend + frontend) in one go:

```bash
moon run :build
```

Run an individual project's task:

```bash
moon run LoginBackend:build
moon run LoginBackend:run

moon run LoginFrontend:build
moon run LoginFrontend:dev
```

### Apps

- `apps/LoginBackend` — ASP.NET Core Web API (controller-based). Exposes a `GET /HelloWorld` smoke-test endpoint.
- `apps/LoginFrontend` — React app scaffolded with Vite. Renders a `Welcome` placeholder page.

Both apps are currently skeletons; login functionality has not been implemented yet.
