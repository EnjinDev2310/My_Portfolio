# Proposal: Portfolio Content Update & PDF Download Fix

## Intent

Two issues block the portfolio from representing the developer's current profile. The CV PDF download is broken because the global `@media print` rule hides all `<header>` elements, which includes the CV header containing the photo, name, and contact info. Separately, the portfolio content is outdated — the developer title is "Frontend Developer" but skills now span fullstack (Angular, Supabase, PostgreSQL, Docker, Node.js, .NET, C#).

## Scope

### In Scope
- Fix PDF download by renaming `<header class="cv-header">` to `<div class="cv-header">` in cv.html
- Update developer title from "Frontend Developer" to "Fullstack Developer" across all pages
- Add missing skills: Supabase, PostgreSQL, Docker, Node.js
- Add `'backend'` to `ICvSkill.category` union type
- Add education entry for late 2025 — May 2026 backend/database studies
- Update about page bio to reflect fullstack scope
- Update experience service roles/descriptions for consistency
- Update E2E test assertions to match new title

### Out of Scope
- Unifying `cv-service.ts` and `experience-service.ts` into a single data source (future refactor)
- Restructuring the experience data model
- Visual/layout changes to any page
- Adding new pages or components

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None — no existing specs in `openspec/specs/`. This is a content and CSS bugfix change, not a behavioral spec change.

## Approach

**PDF Fix (Low Risk):** Rename `<header class="cv-header">` → `<div class="cv-header">` in `src/app/pages/cv/cv.html:3`. All CSS targets the `.cv-header` class, not the element. The global `header { display: none !important; }` in `src/styles.css:183-194` stops matching. One-line change.

**Content Updates (Medium Risk):** Update `role`, `skills`, `education`, and `about` in `cv-service.ts`. Add `'backend'` to `ICvSkill.category` in `icv.ts`. Update hardcoded titles in `about.html` and `home.html`. Update `experience-service.ts` roles/descriptions. Update E2E assertions in `e2e/about.spec.ts` and `e2e/home.spec.ts`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/pages/cv/cv.html:3` | Modified | `<header>` → `<div>` to fix PDF print |
| `src/app/models/icv.ts:30` | Modified | Add `'backend'` to `ICvSkill.category` union |
| `src/app/services/cv-service.ts` | Modified | Update role, skills, education, about, experience |
| `src/app/services/experience-service.ts` | Modified | Update role descriptions for consistency |
| `src/app/pages/about/about.html` | Modified | Update title and bio to fullstack |
| `src/app/pages/home/home.html` | Modified | Update "Frontend Developer" text |
| `e2e/about.spec.ts:13` | Modified | Update "Frontend Developer" assertion |
| `e2e/home.spec.ts:13-14` | Modified | Update "Frontend" / "Developer" assertions |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| PDF fix breaks CV print layout | Low | CSS targets class, not element; verify with print preview |
| `'backend'` category addition breaks exhaustive switches | Low | Search codebase for `switch` on category; add case if found |
| E2E tests fail after title change | Medium | Update assertions in same changeset; run `bun test` |
| Content inconsistency between cv-service and experience-service | Medium | Update both services in same changeset; document unification as future work |

## Rollback Plan

- **PDF fix:** Revert `cv.html` line 3 (`<div>` → `<header>`). Instant rollback.
- **Content updates:** `git revert` the commit. All content is hardcoded in services/templates — no database migration needed.
- **If E2E tests break:** Check both `about.spec.ts` and `home.spec.ts` for stale text assertions.

## Dependencies

None.

## Success Criteria

- [ ] PDF download shows photo, name, role, and contact links
- [ ] All pages display "Fullstack Developer" instead of "Frontend Developer"
- [ ] Skills section includes Supabase, PostgreSQL, Docker, Node.js with correct categories
- [ ] Education shows three entries including 2025-2026 studies
- [ ] About page bio reflects fullstack scope
- [ ] E2E tests pass with updated assertions
