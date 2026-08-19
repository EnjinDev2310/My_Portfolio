# Exploration: Portfolio Content & PDF Fix

## Work Item 1: PDF Download Bug

### Current State

The CV download uses `window.print()` — a **print-to-PDF** approach (no html2canvas/jspdf). Flow:
1. Header nav `CV` button → navigates to `/cv`
2. CV page renders a "Download CV" button → calls `window.print()`
3. Browser print dialog → user saves as PDF

### ROOT CAUSE FOUND: `@media print` kills `<header>` elements

**`src/styles.css:183-194`** (global print styles):
```css
@media print {
  app-header-nav,
  app-footer,
  header,        /* ← THIS KILLS ALL <header> ELEMENTS */
  footer {
    display: none !important;
  }
}
```

**`src/app/pages/cv/cv.html:3-26`** — the CV header is a semantic `<header>` element:
```html
<header class="cv-header">          <!-- ← MATCHES `header` selector -->
  <div class="cv-header-info">
    <h1>{{ cv().name }}</h1>
    <p class="role">{{ cv().role }}</p>
    <!-- email, linkedin, github contact lines -->
  </div>
  @if (cv().photo) {
    <img [src]="cv().photo" alt="" class="cv-photo" />  <!-- ← IMAGE INSIDE -->
  }
</header>
```

**The global `header { display: none !important; }` hides the ENTIRE `.cv-header`**, which contains:
- Profile photo (`cv-photo`)
- Name (`h1`)
- Role/title (`.role`)
- All contact lines (email, LinkedIn, GitHub)

The CV's own `@media print` at `cv.css:214-217` styles `.cv-header` and `.cv-photo` — but those styles never apply because the element is already `display: none` from the global rule.

### Why the image doesn't render in PDF

The image itself (`public/img/profile/profile3.png`) exists and the path is correct. The image doesn't render because its parent `<header>` is hidden by the global print rule. It's not an image loading issue — it's a CSS visibility issue.

### Why nearby content is lost

Same root cause. The `<header class="cv-header">` contains the name, role, and social links. All hidden by `header { display: none !important; }`.

### Affected Files (WI-1)

| File | Issue |
|------|-------|
| `src/styles.css:183-194` | Global `header { display: none !important; }` matches CV's `<header class="cv-header">` |
| `src/app/pages/cv/cv.html:3` | CV header uses semantic `<header>` tag |
| `src/app/pages/cv/cv.css:34-51` | `.cv-header` and `.cv-photo` styles exist but never apply in print |
| `src/app/pages/cv/cv.css:183-284` | `@media print` block with header/photo sizing — dead code due to global override |

### Approaches Considered

**Approach A — Rename the CV header element (RECOMMENDED)**
Change `<header class="cv-header">` to `<div class="cv-header">` in `cv.html`. This avoids the global `header` selector while keeping all existing styles intact (they target `.cv-header` class, not the element).

- Pros: One-line change, no risk to other pages, all existing CSS continues to work
- Cons: Minor semantic HTML change (acceptable — `div` is fine for layout)

**Approach B — Narrow the global print selector**
Change `header` to `body > header` or `app-header-nav header` in `styles.css`.

- Pros: Preserves semantic HTML
- Cons: Risk of breaking other pages if they add `<header>` elements; more fragile

**Approach C — Add override in CV print styles**
Add `header.cv-header { display: flex !important; }` in `cv.css` `@media print`.

- Pros: Targets only the CV page
- Cons: Specificity battle with `!important`; fragile if global rules change

**Recommendation: Approach A** — simplest, safest, zero side effects.

---

## Work Item 2: Content Updates

### Title Location Map

| Location | Current Value | Source | Editable Via |
|----------|--------------|--------|-------------|
| `cv-service.ts:10` | `'Frontend Developer'` | `ICvProfile.role` | Data model (single source for CV) |
| `about.html:6` | `Frontend Developer` | Hardcoded in template | Template edit |
| `home.html:7-8` | `Frontend` / `Developer` | Hardcoded in template (split across two `<span>`) | Template edit |
| `e2e/about.spec.ts:13` | `'Frontend Developer'` | Test assertion | Test update |

### Data Model Structure

**`src/app/models/icv.ts`** — `ICvProfile`:
- `role: string` — the developer title
- `skills: ICvSkill[]` — where `ICvSkill.category` is `'frontend' | 'tooling' | 'language' | 'database'`
- `education: ICvEducation[]` — degree, institution, period, description
- `experience: ICvExperience[]` — period, role, company, description

**`src/app/models/iexperience.ts`** — `IExperience`:
- Separate from CV model; used by the Experience page
- Has `tags: string[]` and `current?: boolean` (CV model doesn't have these)

### Skills Gap Analysis

**Currently in `cv-service.ts` skills:**
HTML5, CSS3, JavaScript, TypeScript, Tailwind, Git, Angular, GitBash, npm, GitHub, MySQL, MongoDB, C#, WPF, .NET

**Missing (per user's request):**
- Supabase
- PostgreSQL
- Docker
- Node.js
- Angular (already present)

**Note:** The `ICvSkill.category` type doesn't include `'backend'` — may need to add it for Node.js, .NET, etc. Currently `.NET` and `WPF` are categorized as `'tooling'`.

### Education Gap

Current education entries:
1. `2020 — 2024`: University (4 years Computer Engineering)
2. `2024 — 2025`: Self-taught (1.5 years frontend)

**Missing:** Late 2025 — May 2026 backend/database studies entry.

### About Page Bio

The about page text (`about.html:8-25`) is entirely frontend-focused. It mentions "desarrollo frontend moderno" and Angular/TypeScript specialization. Needs updating to reflect fullstack scope.

### Experience Service

`experience-service.ts` has separate data from `cv-service.ts`. Both need updating:
- CV service: `experience` array (lines 51-73)
- Experience service: `#experience` signal (lines 8-34)

### Affected Files (WI-2)

| File | Change Needed |
|------|--------------|
| `src/app/services/cv-service.ts` | Update `role`, `skills`, `education`, `experience`, `about` |
| `src/app/pages/about/about.html` | Update title + bio paragraphs |
| `src/app/pages/home/home.html` | Update "Frontend" / "Developer" text |
| `src/app/services/experience-service.ts` | Update roles/descriptions to reflect fullstack |
| `src/app/models/icv.ts` | Possibly add `'backend'` to `ICvSkill.category` union |
| `e2e/about.spec.ts` | Update "Frontend Developer" assertion |
| `src/app/pages/home/home.spec.ts` | Update "Developer" assertion if text changes |

---

## Risks

1. **WI-1 (PDF fix):** Low risk. Renaming `<header>` to `<div>` is safe. The CV page uses its own `:host` selector in CSS, not element selectors. Verify with print preview after change.

2. **WI-2 (Content):** Medium risk due to **data duplication**. The CV service and Experience service have overlapping but inconsistent data. Changes must be made in both places. Consider whether to unify them (future refactor — out of scope).

3. **WI-2 (Tests):** E2E tests assert "Frontend Developer" text. Must update in sync or tests will fail.

4. **WI-2 (Category type):** Adding `'backend'` to `ICvSkill.category` union type may affect any code that switches on or filters by category. Need to verify no exhaustive switch exists.

---

## Ready for Proposal?

**Yes.** Both work items are well-understood with clear root causes and affected files. The PDF fix is a one-line CSS/HTML change. The content updates are data-driven changes across service files and templates.

**Recommended split:**
- **Change A:** Fix PDF print — rename `<header>` to `<div>` in CV template
- **Change B:** Content updates — update title, skills, education, experience across services and templates
