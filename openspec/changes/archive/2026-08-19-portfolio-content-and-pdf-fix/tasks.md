# Tasks: Portfolio Content Update & PDF Download Fix

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 25-35 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Single PR — all changes are tightly coupled | PR 1 | `ng build && bun test` | Browser print preview | `git revert` the single commit |

## Phase 1: Type System Foundation

- [x] 1.1 Add `'backend'` to `ICvSkill.category` union in `src/app/models/icv.ts:30`

## Phase 2: PDF Print Fix

- [x] 2.1 Change `<header class="cv-header">` to `<div class="cv-header">` in `src/app/pages/cv/cv.html:3`
- [x] 2.2 Change closing `</header>` to `</div>` in `src/app/pages/cv/cv.html:26`
- [x] 2.3 Remove `header,` selector from print media query in `src/app/pages/cv/cv.css:191` (keep other selectors intact)

## Phase 3: Content Updates — Data Layer

- [x] 3.1 Update `role` from `'Frontend Developer'` to `'Fullstack Developer'` in `src/app/services/cv-service.ts:10`
- [x] 3.2 Add Supabase, PostgreSQL, Docker, Node.js entries to `skills` array in `src/app/services/cv-service.ts:34-50` (assign `'backend'` category)
- [x] 3.3 Add education entry for late 2025 — May 2026 backend/DB studies to `education` array in `src/app/services/cv-service.ts:16-29`
- [x] 3.4 Update `about` bio to reflect fullstack scope in `src/app/services/cv-service.ts:15`
- [x] 3.5 Update experience `role` from `'Desarrollador Frontend Junior'` to `'Desarrollador Fullstack Junior'` and descriptions in `src/app/services/cv-service.ts:54-57`
- [x] 3.6 Update experience `role` and descriptions for consistency in `src/app/services/experience-service.ts:10-14`

## Phase 4: Content Updates — Templates

- [x] 4.1 Change `Frontend Developer` to `Fullstack Developer` in `src/app/pages/about/about.html:6`
- [x] 4.2 Update bio paragraphs in `src/app/pages/about/about.html:8-25` to reference fullstack capabilities
- [x] 4.3 Change `<span class="">Frontend</span>` to `<span class="">Fullstack</span>` in `src/app/pages/home/home.html:7`

## Phase 5: E2E Test Updates

- [x] 5.1 Change `'Frontend Developer'` assertion to `'Fullstack Developer'` in `e2e/about.spec.ts:13`
- [x] 5.2 Change `'Frontend'` assertion to `'Fullstack'` in `e2e/home.spec.ts:13`

## Phase 6: Verification

- [x] 6.1 Run `ng build` — confirm no compilation errors
- [x] 6.2 Run `bun test` — confirm all E2E tests pass
- [ ] 6.3 Verify CV print preview shows header (manual check: open `/cv`, trigger PDF download, confirm header visible)
