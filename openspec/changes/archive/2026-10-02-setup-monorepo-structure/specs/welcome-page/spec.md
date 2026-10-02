# Spec Delta

## Purpose

Confirms the frontend skeleton renders through its build tooling before any login UI exists, by displaying a fixed placeholder landing page.

## ADDED Requirements

### Requirement: Landing page displays Welcome text
The system SHALL render the text `Welcome` on the initial page load of the frontend application.

#### Scenario: User loads the frontend application
- **WHEN** a user navigates to the frontend application's root page
- **THEN** the page displays the text `Welcome`
