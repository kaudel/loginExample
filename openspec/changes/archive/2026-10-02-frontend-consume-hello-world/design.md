# Design

## Context

`apps/LoginBackend/Program.cs` currently has no CORS policy — only `AddControllers()`/`MapControllers()`. The backend's dev `applicationUrl` is `http://localhost:5015` (from `Properties/launchSettings.json`); the frontend's Vite dev server runs on the default `http://localhost:5173` (no `server.port` override in `vite.config.ts`). A browser-based fetch from the frontend to the backend is therefore cross-origin, and without CORS headers the browser blocks the frontend from reading the response even though the request itself succeeds. See proposal.md - Why for the motivation.

## Goals / Non-Goals

**Goals:**
- Prove the frontend can call the backend over HTTP from a browser and render the result, including the cross-origin/CORS piece that a same-origin dev setup would hide.
- Handle the two non-happy-path states (loading, fetch failure) that any real network call needs, even though this is still a skeleton feature.

**Non-Goals:**
- No configurable API base URL / environment system — the backend URL is hardcoded to the known local dev address. Revisit once a real deployment topology exists for either app.
- No retry logic, caching, or request de-duplication.
- No authentication on the endpoint or the request.
- No CORS configuration beyond the single local dev origin — production/staging origins are undecided and out of scope.

## Decisions

### CORS on the backend, not a Vite dev proxy
Two ways to solve the cross-origin problem: (a) enable CORS on LoginBackend for the frontend's origin, or (b) configure a Vite dev-server proxy (`server.proxy`) so the frontend calls a same-origin path that Vite forwards to the backend. Chose CORS: it's owned by the backend and works regardless of what calls it (browser fetch, a future second frontend, a test harness), whereas a Vite proxy only solves this for Vite's own dev server and would need to be reconfigured or reinvented for anything else that talks to the API. Trade-off accepted: the allowed origin is hardcoded for now (see Non-Goals) and will need revisiting once real environments exist.

### Native `fetch` in a `useEffect`/`useState`, no new dependency
The call is a single hardcoded GET with no params, retries, or caching needs. Pulling in a data-fetching library (react-query, SWR) or an HTTP client (axios) for one trivial call would be premature — native `fetch` plus a small `useState` for `{status: 'loading'|'success'|'error', data}` is enough and keeps `apps/LoginFrontend/package.json` dependency-free beyond the Vite/React scaffold it already has.

## Risks / Trade-offs

- [Hardcoded `http://localhost:5015` backend URL only works in local dev] → Accepted for now; no other environment exists yet for either app. Flag as a follow-up once a deployment story is decided.
- [CORS policy allow-lists a single origin inline in `Program.cs`] → Mitigation: name the policy and keep the allowed origin as a single clearly-named constant, so it's easy to find and extend when a second frontend is added later.
- [No automated test covers the loading/error states] → Accepted, consistent with how the rest of this skeleton has been verified so far (manual browser check via the browser-automation tooling, not a test suite).

## Migration Plan

Not applicable — no deployed users or persisted data; this changes two still-unreleased skeleton apps. Implementation order: add the CORS policy to LoginBackend first (so the frontend's fetch has something to succeed against), then update LoginFrontend's `App.tsx` to fetch/render/handle states, then verify both running together in a browser.
