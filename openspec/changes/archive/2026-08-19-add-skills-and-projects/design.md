# Design: Add Skills and Projects to Portfolio

## Change: add-skills-and-projects

---

## 1. Architecture Decisions

### AD-1: SVG Icon Source — Simple Icons CDN

**Decision**: Source official brand SVGs from [Simple Icons](https://simpleicons.org/) CDN (`https://cdn.simpleicons.org/{icon}`).

**Rationale**: Simple Icons provides consistent, minimal, single-path SVGs for all major tech brands. All existing project SVGs already use `currentColor` (fill or stroke), which is exactly how Simple Icons deliver their icons. This guarantees visual consistency.

**WPF Exception**: Simple Icons does not include WPF. Source a minimal WPF logo from Microsoft's official assets or create a simplified path representing the WPF diamond shape. Fallback: use the generic `.NET` icon with a distinct color.

### AD-2: SVG Rendering — `currentColor` Inheritance

**Decision**: All new SVGs MUST use `currentColor` for fill or stroke (not hardcoded colors). The Tailwind `!text-{color}` class on the `ISkills.class` field controls the actual color at runtime via Angular Material's `mat-icon`.

**Verified**: Existing icons (`angular.svg:1`, `github.svg:1`) both use `currentColor`. This is the project convention.

### AD-3: ICvSkill.category Type Expansion

**Decision**: Expand `ICvSkill.category` from `'frontend' | 'tooling' | 'language'` to `'frontend' | 'tooling' | 'language' | 'database'`.

**Why NOT 'framework'**: The spec assigns WPF and `.NET` to `tooling`, and C# to `language`. Only MySQL and MongoDB need a new category. Adding a single `'database'` value is minimal and matches the spec's classification.

**Impact analysis**: `ICvSkill` is consumed only in `cv-service.ts` (data) and `cv.html` (template). The template at `cv.html:87-92` renders skills as a flat `@for` loop — it does NOT group or filter by category. Adding a new union member is type-safe and template-safe. Zero consumers will break.

### AD-4: Data Structure — No Interface Changes

**Decision**: Keep `ISkills`, `IProject` interfaces unchanged. All additions are data entries only.

**Rationale**: The proposal explicitly scoped out interface changes. The current interfaces are sufficient:
- `ISkills { name: string; icon: string; class: string; }` — works for all new skills
- `IProject { title: string; description: string; tags: string[]; color: string; gitUrl?: string; webUrl?: string; }` — works for both new projects (webUrl stays `undefined`)

### AD-5: Icon Registration Convention

**Decision**: Icon names are lowercase, no spaces, matching the SVG filename without extension. Append to the end of the existing `Icons.icons[]` array.

**Convention verified**: Existing icons at `icons-service.ts:12` follow this pattern exactly: `'angular'`, `'gitbash'`, `'npm'`, `'github'`.

---

## 2. Data Design

### 2.1 New Skill Entries

All entries follow the exact same structure as existing skills in `skills-service.ts:8-59`.

| # | Skill | Icon name | `ISkills.class` | CV category | Brand color source |
|---|-------|-----------|-----------------|-------------|-------------------|
| 1 | MySQL | `mysql` | `!text-sky-700 !size-10` | `database` | MySQL official brand blue |
| 2 | MongoDB | `mongodb` | `!text-green-500 !size-10` | `database` | MongoDB leaf green |
| 3 | C# | `csharp` | `!text-violet-600 !size-10` | `language` | C# official purple |
| 4 | WPF | `wpf` | `!text-blue-600 !size-10` | `tooling` | WPF framework blue |
| 5 | .NET | `dotnet` | `!text-purple-600 !size-10` | `tooling` | .NET official purple |

**Exact code to add** in `skills-service.ts` after line 58 (after GitHub entry, before closing `]`):

```typescript
{
  name: 'MySQL',
  icon: 'mysql',
  class: '!text-sky-700 !size-10',
},
{
  name: 'MongoDB',
  icon: 'mongodb',
  class: '!text-green-500 !size-10',
},
{
  name: 'C#',
  icon: 'csharp',
  class: '!text-violet-600 !size-10',
},
{
  name: 'WPF',
  icon: 'wpf',
  class: '!text-blue-600 !size-10',
},
{
  name: '.NET',
  icon: 'dotnet',
  class: '!text-purple-600 !size-10',
},
```

**Expected result**: `SSkills` signal goes from 10 → 15 entries.

### 2.2 New CV Skill Entries

All entries follow the exact same structure as existing skills in `cv-service.ts:34-45`.

**Exact code to add** in `cv-service.ts` after line 44 (after GitHub entry, before closing `]`):

```typescript
{ name: 'MySQL', category: 'database' },
{ name: 'MongoDB', category: 'database' },
{ name: 'C#', category: 'language' },
{ name: 'WPF', category: 'tooling' },
{ name: '.NET', category: 'tooling' },
```

**Expected result**: `SCv` profile skills goes from 10 → 15 entries.

### 2.3 New Project Entries

All entries follow the exact same structure as existing projects in `project-service.ts:8-27`.

**Exact code to add** in `project-service.ts` after line 26 (after Portfolio project, before closing `]`):

```typescript
{
  title: 'Bar-App',
  description:
    'Aplicación de gestión de barras desarrollada con Angular y Tailwind CSS. Interfaz moderna y responsiva para la administración de productos, pedidos y usuarios.',
  tags: ['Angular', 'TypeScript', 'Tailwind', 'CSS3'],
  color: '#3B82F6',
  gitUrl: 'https://github.com/EnjinDev2310/Bar-App',
},
{
  title: 'Tienda-App',
  description:
    'Aplicación de tienda en línea construida con Angular, SQLite y WebAssembly. Rendimiento nativo en el navegador con persistencia local de datos.',
  tags: ['Angular', 'TypeScript', 'Tailwind', 'SQLite', 'WASM'],
  color: '#F59E0B',
  gitUrl: 'https://github.com/EnjinDev2310/Tienda-App-Shop-App',
},
```

**Note**: `webUrl` is intentionally omitted (undefined) per the proposal — these projects are not deployed yet.

**Expected result**: `SProject` signal goes from 2 → 4 entries.

### 2.4 Icon Registration

**Exact code to add** in `icons-service.ts` line 12, append to the `icons` array:

Current array ends with `'github'`. Append: `, 'mysql', 'mongodb', 'csharp', 'wpf', 'dotnet'`

**Expected result**: `Icons.icons` array goes from 17 → 22 entries.

---

## 3. Icon Strategy

### 3.1 Source URLs

| Icon | Simple Icons slug | CDN URL |
|------|-------------------|---------|
| MySQL | `mysql` | `https://cdn.simpleicons.org/mysql` |
| MongoDB | `mongodb` | `https://cdn.simpleicons.org/mongodb` |
| C# | `csharp` | `https://cdn.simpleicons.org/csharp` |
| .NET | `dotnet` | `https://cdn.simpleicons.org/dotnet` |
| WPF | N/A | See fallback below |

### 3.2 WPF Fallback Strategy

Simple Icons does not include WPF. Options (in priority order):

1. **Create minimal SVG** — A 24x24 viewBox with a simplified WPF diamond/glyph shape using `currentColor`. This is the cleanest approach since WPF's logo is simple geometry.
2. **Use the Windows logo** from Simple Icons (`windows`) with the `wpf` filename — not ideal semantically but avoids custom SVG work.
3. **Use .NET icon** with a different color — already covered by `dotnet`, so this would duplicate.

**Recommendation**: Option 1 — create a minimal custom SVG. The WPF icon should be recognizable as the framework logo (the stylized diamond shape).

### 3.3 SVG Template

All SVGs must follow this structure (matching existing `angular.svg` pattern):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="currentColor" d="..." />
</svg>
```

**Key constraints**:
- `viewBox="0 0 24 24"` — standard for Simple Icons output
- `fill="currentColor"` — NOT hardcoded colors; the Tailwind `!text-*` class handles color
- No `width`/`height` attributes — Angular Material `mat-icon` controls sizing via the `!size-10` class
- Single `<path>` element preferred (Simple Icons output is single-path)

### 3.4 File Naming Convention

- Lowercase, no spaces, no special characters
- Match the icon name in `Icons.icons[]` exactly
- Pattern: `{name}.svg` where name = `mysql`, `mongodb`, `csharp`, `wpf`, `dotnet`
- Location: `public/assets/icons/` (same as all 17 existing icons)

### 3.5 SVG Optimization

Simple Icons SVGs are already optimized (single path, no metadata). Minimal post-processing:
1. Remove `<title>` element if present (Angular Material handles accessibility)
2. Ensure `fill="currentColor"` is set (Simple Icons default)
3. Remove any `xmlns:xlink` if present (not needed for single-path SVGs)
4. Strip comments and metadata

---

## 4. Implementation Order

### 4.1 Dependency Graph

```
icv.ts (type expansion)
  └─→ cv-service.ts (data addition — depends on type)
  └─→ skills-service.ts (data addition — independent, but type-safe after expansion)

icons-service.ts (registration — depends on SVG files existing)
  └─→ public/assets/icons/*.svg (files must exist for registration to work)

project-service.ts (data addition — fully independent)
```

### 4.2 Optimal Sequence

| Step | File | Action | Depends on | Verification |
|------|------|--------|------------|--------------|
| 1 | `src/app/models/icv.ts:30` | Expand `ICvSkill.category` union | Nothing | TypeScript compiles |
| 2 | `public/assets/icons/*.svg` (×5) | Create SVG files | Nothing | Files exist, valid XML |
| 3 | `src/app/services/icons-service.ts:12` | Append 5 icon names to array | Step 2 | Array has 22 entries |
| 4 | `src/app/services/skills-service.ts` | Append 5 entries to signal | Nothing | Signal has 15 entries |
| 5 | `src/app/services/cv-service.ts` | Append 5 entries + step 1 type | Step 1 | 15 entries, all valid categories |
| 6 | `src/app/services/project-service.ts` | Append 2 entries to signal | Nothing | Signal has 4 entries |
| 7 | Build verification | `ng build` | Steps 1-6 | Exit code 0 |

**Steps 2, 4, and 6 can run in parallel** (no dependencies between them). Steps 1 and 5 are sequential (type must exist before data uses it). Step 3 depends on step 2 (files must exist before registration).

### 4.3 Verification Checkpoints

| Checkpoint | When | Command | Pass criteria |
|------------|------|---------|---------------|
| CP-1 | After step 1 | `ng build --configuration=development` | TypeScript compiles with new type |
| CP-2 | After step 3 | Visual check of `icons` array length | 22 entries |
| CP-3 | After steps 4-6 | Visual check of all service signals | 15 skills, 4 projects, 15 CV skills |
| CP-4 | After step 7 | `ng build` | Zero errors, zero warnings |
| CP-5 | After build | `ng serve` + visual inspection | All icons render, all data displays |

---

## 5. Testing Strategy

### 5.1 Build Verification

```bash
# Full production build — must complete with zero errors
ng build

# Development build — faster iteration
ng build --configuration=development

# Lint check
ng lint
```

**Pass criteria**: Exit code 0, no TypeScript errors, no Angular template errors.

### 5.2 Visual Verification Approach

Since this is a data-only change with no UI modifications, visual verification focuses on **data rendering**:

| Page | What to verify | Expected count |
|------|---------------|----------------|
| Home/Skills section | Skill items with icons | 15 items |
| Home/Projects section | Project cards | 4 cards |
| CV page | Skills list | 15 items |
| CV page | Project entries | 4 entries |

**Icon rendering check**: Each of the 5 new icons must render as a visible SVG (not a broken image or empty space). Verify by:
1. Opening dev tools → Elements panel
2. Checking `<mat-icon>` elements have rendered `<svg>` children
3. Confirming `currentColor` is inherited from the Tailwind text color class

### 5.3 Regression Check

| Check | Method | Expected |
|-------|--------|----------|
| Existing 10 skills unchanged | Visual comparison before/after | Identical rendering |
| Existing 2 projects unchanged | Visual comparison before/after | Identical rendering |
| CV page existing entries unchanged | Visual comparison before/after | Identical rendering |
| No new TypeScript errors | `ng build` | Zero errors |
| No new lint warnings | `ng lint` | Zero warnings |
| Icon registration doesn't break existing icons | Render all 22 icons | All visible |

### 5.4 Manual Test Script

```
1. ng serve
2. Navigate to home page → skills section
   - Count skill items: expect 15
   - Verify MySQL icon (sky blue), MongoDB (green), C# (violet), WPF (blue), .NET (purple)
3. Navigate to projects section
   - Count project cards: expect 4
   - Verify Bar-App card has blue accent (#3B82F6)
   - Verify Tienda-App card has amber accent (#F59E0B)
   - Verify both have GitHub links, no demo links
4. Navigate to CV page
   - Scroll to Skills section: expect 15 items
   - Verify MySQL and MongoDB present (database category)
   - Verify C# present (language category)
   - Verify WPF and .NET present (tooling category)
   - Scroll to Projects section: expect 4 entries
5. Check browser console for errors: expect none
```

---

## 6. Affected Files Summary

| File | Type | Lines affected |
|------|------|---------------|
| `src/app/models/icv.ts` | Modified | Line 30: type expansion |
| `public/assets/icons/mysql.svg` | New | Full file |
| `public/assets/icons/mongodb.svg` | New | Full file |
| `public/assets/icons/csharp.svg` | New | Full file |
| `public/assets/icons/wpf.svg` | New | Full file |
| `public/assets/icons/dotnet.svg` | New | Full file |
| `src/app/services/icons-service.ts` | Modified | Line 12: append 5 entries |
| `src/app/services/skills-service.ts` | Modified | Lines 58-59: append 5 entries |
| `src/app/services/cv-service.ts` | Modified | Lines 44-45: append 5 entries |
| `src/app/services/project-service.ts` | Modified | Lines 26-27: append 2 entries |

**Total**: 4 modified files + 5 new files = 9 files touched.
