# CV Print Specification

## Purpose

Ensure the CV page renders correctly when downloaded as PDF, including the header section with photo, name, role, and contact links.

## Requirements

### Requirement: PDF Download Includes CV Header

The CV header section SHALL be visible in the downloaded PDF output, including the developer photo, name, role title, and contact links.

#### Scenario: User downloads CV PDF with header visible

- GIVEN the user navigates to the CV page
- WHEN the user triggers PDF download
- THEN the generated PDF contains the header section with photo, name, role, and contact info
- AND the header is NOT hidden by any print media styles

#### Scenario: Global print styles do not suppress CV header

- GIVEN the global stylesheet defines `@media print { header { display: none !important; } }`
- WHEN the CV page header element is rendered
- THEN the CV header element SHALL use a non-`<header>` tag so the global print rule does not match it
- AND all existing CSS targeting `.cv-header` class continues to apply correctly

### Requirement: CV Page Layout Integrity

The CV page layout SHALL remain visually identical after the PDF fix in both screen and print rendering modes.

#### Scenario: Screen rendering is unchanged

- GIVEN the CV page is viewed in a browser
- WHEN the page renders
- THEN the header section displays with the same layout, spacing, and styling as before the fix

#### Scenario: Print preview shows complete CV

- GIVEN the user opens the browser print preview for the CV page
- WHEN the print preview renders
- THEN all CV sections including header, experience, education, and skills are visible
