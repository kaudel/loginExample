# hello-world-api Specification

## Purpose

Confirms the backend API skeleton's routing and controller wiring work end-to-end, independent of any business feature, by exposing a trivial fixed-response endpoint.

## Requirements

### Requirement: HelloWorld endpoint returns a fixed greeting
The system SHALL expose an HTTP GET endpoint, reachable as the `HelloWorld` action, that returns HTTP 200 with the exact response body `HelloWorld`.

#### Scenario: Client requests the HelloWorld endpoint
- **WHEN** a client sends a GET request to the HelloWorld endpoint
- **THEN** the system responds with HTTP 200 and a body containing exactly `HelloWorld`

### Requirement: HelloWorld endpoint allows cross-origin requests from the frontend
The system SHALL include CORS headers permitting the configured frontend origin to read the response of the `HelloWorld` endpoint from a browser.

#### Scenario: Browser-based frontend reads the response
- **WHEN** a browser running on the configured frontend origin issues a GET request to the HelloWorld endpoint
- **THEN** the response includes CORS headers allowing that origin to read the response body
