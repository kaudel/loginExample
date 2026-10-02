# welcome-page Specification

## Purpose

Confirms the frontend skeleton renders through its build tooling before any login UI exists, by displaying a fixed placeholder landing page.

## Requirements

### Requirement: Landing page displays Welcome text
The system SHALL fetch the backend's HelloWorld endpoint on initial page load and render the response body as the page's content, replacing the previous static text. While the request is in flight the system SHALL show a loading state, and if the request fails the system SHALL show an error state instead of fetched content.

#### Scenario: User loads the frontend application
- **WHEN** a user navigates to the frontend application's root page and the backend's HelloWorld endpoint responds successfully
- **THEN** the page displays the response body returned by the backend

#### Scenario: Request is in flight
- **WHEN** a user navigates to the frontend application's root page and the backend request has not yet completed
- **THEN** the page displays a loading state instead of content

#### Scenario: Backend request fails
- **WHEN** a user navigates to the frontend application's root page and the request to the backend's HelloWorld endpoint fails
- **THEN** the page displays an error state instead of content
