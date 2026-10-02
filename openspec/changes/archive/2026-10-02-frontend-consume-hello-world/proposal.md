# Proposal

## Why

The two app skeletons currently run in isolation — LoginBackend serves `GET /HelloWorld` and LoginFrontend renders a static "Welcome" string, but neither talks to the other. Before any real login feature is built, the frontend needs to prove it can actually call the backend end-to-end (network request, cross-origin handling, rendering a response), the same way the backend's `HelloWorld` endpoint already proved the API skeleton works on its own.

## What Changes

- LoginFrontend fetches `GET /HelloWorld` from LoginBackend on page load and renders the response body in place of the static "Welcome" text.
- LoginBackend enables CORS for the frontend's dev origin (`http://localhost:5173`), since a browser blocks the cross-origin response otherwise — the current `Program.cs` has no CORS policy configured.
- While the request is in flight, the page shows a lightweight loading state; if the request fails (e.g. backend not running), the page shows an error message instead of the fetched content.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `hello-world-api`: adds a requirement that the endpoint permits cross-origin requests from the configured frontend origin, so a browser-based client can read the response (the existing "returns a fixed greeting" requirement is unchanged).
- `welcome-page`: the existing "displays Welcome text" requirement is replaced — the page now fetches and displays the backend's `HelloWorld` response instead of a static string, with loading and error states for the fetch.

## Impact

- `apps/LoginBackend/Program.cs`: add a CORS policy.
- `apps/LoginFrontend/src/App.tsx`: add a fetch call, loading/error state, and render the fetched content.
- No new dependencies expected (CORS is part of ASP.NET Core; `fetch` is a browser built-in).
- Both apps must be running simultaneously to observe the end-to-end behavior (documented in tasks/design, not a new requirement).
