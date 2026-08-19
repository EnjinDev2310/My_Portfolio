# Portfolio Content Specification

## Purpose

Ensure the portfolio accurately reflects the developer's current fullstack profile, including title, skills, education, experience, and about bio.

## Requirements

### Requirement: Developer Title Display

All portfolio pages SHALL display "Fullstack Developer" as the developer role title.

#### Scenario: Home page shows fullstack title

- GIVEN the user visits the home page
- WHEN the page renders
- THEN the developer title text reads "Fullstack Developer"
- AND no instance of "Frontend Developer" appears anywhere on the page

#### Scenario: About page shows fullstack title

- GIVEN the user visits the about page
- WHEN the page renders
- THEN the developer title text reads "Fullstack Developer"

#### Scenario: CV service role field matches

- GIVEN the CV service provides data to the CV page
- WHEN the CV data is loaded
- THEN the role field value is "Fullstack Developer"

### Requirement: Skills Include Backend Technologies

The skills section SHALL include Supabase, PostgreSQL, Docker, and Node.js with appropriate category assignments.

#### Scenario: Backend skills are present in skill data

- GIVEN the CV service loads the skills array
- WHEN the skills data is returned
- THEN it contains entries for Supabase, PostgreSQL, Docker, and Node.js
- AND each skill has a valid category value

#### Scenario: Backend category type is supported

- GIVEN the `ICvSkill.category` type union is defined
- WHEN a skill with category `'backend'` is added
- THEN the type system accepts the value without compilation errors

### Requirement: Education Reflects Backend Studies

The education section SHALL include an entry for backend and database studies spanning late 2025 through May 2026.

#### Scenario: Education array contains backend studies entry

- GIVEN the CV service loads the education array
- WHEN the education data is returned
- THEN it includes an entry with a date range covering late 2025 to May 2026
- AND the entry describes backend and database studies

#### Scenario: Total education entry count is three

- GIVEN the CV service education array
- WHEN the array is loaded
- THEN it contains exactly three education entries

### Requirement: About Bio Reflects Fullstack Scope

The about page bio SHALL describe the developer as a fullstack developer rather than frontend-only.

#### Scenario: About page bio mentions fullstack capabilities

- GIVEN the user visits the about page
- WHEN the bio section renders
- THEN the text references both frontend and backend capabilities
- AND no text describes the developer as frontend-only

### Requirement: Experience Data Consistency

The experience service and CV service SHALL report consistent role titles and descriptions for the same positions.

#### Scenario: Experience roles match across services

- GIVEN both `experience-service.ts` and `cv-service.ts` define experience entries
- WHEN both services are loaded
- THEN role titles for the same position are identical across services
- AND descriptions reflect fullstack work where applicable

### Requirement: E2E Test Assertions Match Content

E2E tests SHALL assert the correct "Fullstack Developer" title and pass against the updated content.

#### Scenario: About page E2E test passes

- GIVEN the about page E2E test checks the developer title
- WHEN the test runs against the updated about page
- THEN the assertion matches "Fullstack Developer"
- AND the test passes

#### Scenario: Home page E2E test passes

- GIVEN the home page E2E test checks the developer title
- WHEN the test runs against the updated home page
- THEN the assertion matches "Fullstack Developer"
- AND the test passes
