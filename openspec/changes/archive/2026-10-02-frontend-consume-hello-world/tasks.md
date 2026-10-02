# Tasks

## 1. Backend: allow the frontend origin

- [x] 1.1 Add a named CORS policy in `apps/LoginBackend/Program.cs` allowing `http://localhost:5173`, registered via `AddCors`/`UseCors` ahead of `UseAuthorization`/`MapControllers`, and verify `dotnet build` succeeds in `apps/LoginBackend`
- [x] 1.2 Run the backend and verify a cross-origin request carries the CORS header: `curl -i -H "Origin: http://localhost:5173" http://localhost:5015/HelloWorld` includes `Access-Control-Allow-Origin: http://localhost:5173` in the response, confirming the `hello-world-api` CORS requirement

## 2. Frontend: fetch and render the backend response

- [x] 2.1 Update `apps/LoginFrontend/src/App.tsx` to fetch `http://localhost:5015/HelloWorld` on mount (`useEffect`/`useState`, no new dependency), replacing the static "Welcome" render with the fetched response body, and verify `pnpm --filter loginfrontend build` succeeds (type-checks cleanly)
- [x] 2.2 Add a loading state rendered before the fetch resolves, and verify by reading the component that the initial render (before `useEffect`'s fetch completes) shows the loading state rather than the static text or a blank page
- [x] 2.3 Add an error state rendered when the fetch rejects or the response is not OK, and verify by running the frontend with the backend stopped: the page shows the error state instead of content

## 3. End-to-end verification

- [x] 3.1 Run both apps together (`moon run LoginBackend:run`, `moon run LoginFrontend:dev`) and load the frontend in a browser: verify the page displays `HelloWorld` (the backend's response), confirming the `welcome-page` "User loads the frontend application" scenario end-to-end with both apps live
