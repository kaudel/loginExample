# Spec Delta

## ADDED Requirements

### Requirement: HelloWorld endpoint allows cross-origin requests from the frontend
The system SHALL include CORS headers permitting the configured frontend origin to read the response of the `HelloWorld` endpoint from a browser.

#### Scenario: Browser-based frontend reads the response
- **WHEN** a browser running on the configured frontend origin issues a GET request to the HelloWorld endpoint
- **THEN** the response includes CORS headers allowing that origin to read the response body
