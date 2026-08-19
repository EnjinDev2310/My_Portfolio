# Spec: Add Skills and Projects to Portfolio

## Change: add-skills-and-projects

### Type
Data addition — no new behavioral capability, no UI layout changes.

---

## 1. Requirements

### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-01 | Add 5 new skills to the skills section: MySQL, MongoDB, C#, WPF, .NET |
| FR-02 | Add 5 SVG icon files to `public/assets/icons/` for each new skill |
| FR-03 | Register all 5 new icons in `Icons.icons[]` in `icons-service.ts` |
| FR-04 | Add 5 entries to `SSkills.#skills` signal in `skills-service.ts` with brand-aligned Tailwind color classes |
| FR-05 | Add 5 entries to `SCv.#profile.skills` signal in `cv-service.ts` with correct categories |
| FR-06 | Add 2 new projects to `SProject.#projects` signal in `project-service.ts`: Bar-App and Tienda-App |
| FR-07 | Expand `ICvSkill.category` union type to include `'database'` for MySQL and MongoDB |
| FR-08 | Skills count in skills section must reach 15 (10 existing + 5 new) |
| FR-09 | Projects count in projects section must reach 4 (2 existing + 2 new) |
| FR-10 | CV page must list all 15 skills grouped by category |

### Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | All SVG icons must render correctly via `mat-icon` component |
| NFR-02 | Build must complete with zero errors |
| NFR-03 | No existing functionality must break (no regression) |
| NFR-04 | Tailwind color classes must use `!` prefix pattern matching existing skills |
| NFR-05 | Icon files must follow existing naming convention: lowercase, no spaces, `.svg` extension |

---

## 2. Scenarios

### Skills Display Scenarios

**SC-01: Skills section renders all 15 skills**
- **Given** the portfolio is loaded on the skills section
- **When** the skills component renders
- **Then** 15 skill items are visible, including MySQL, MongoDB, C#, WPF, and .NET

**SC-02: New skills display correct icons**
- **Given** the portfolio is loaded on the skills section
- **When** MySQL, MongoDB, C#, WPF, or .NET skill is visible
- **Then** each renders its corresponding SVG icon via `mat-icon`

**SC-03: New skills display correct brand colors**
- **Given** the portfolio is loaded on the skills section
- **When** each new skill renders
- **Then** MySQL is `!text-sky-700`, MongoDB is `!text-green-500`, C# is `!text-violet-600`, WPF is `!text-blue-600`, .NET is `!text-purple-600`

### Project Display Scenarios

**SC-04: Projects section renders all 4 projects**
- **Given** the portfolio is loaded on the projects section
- **When** the projects component renders
- **Then** 4 project cards are visible, including Bar-App and Tienda-App

**SC-05: Bar-App project card displays correct data**
- **Given** the portfolio is loaded on the projects section
- **When** Bar-App project card renders
- **Then** it shows title "Bar-App", tags ["Angular", "TypeScript", "Tailwind", "CSS3"], color `#3B82F6`, and gitUrl `https://github.com/EnjinDev2310/Bar-App`

**SC-06: Tienda-App project card displays correct data**
- **Given** the portfolio is loaded on the projects section
- **When** Tienda-App project card renders
- **Then** it shows title "Tienda-App", tags ["Angular", "TypeScript", "Tailwind", "SQLite", "WASM"], color `#F59E0B`, and gitUrl `https://github.com/EnjinDev2310/Tienda-App-Shop-App`

**SC-07: New projects have no webUrl**
- **Given** the portfolio is loaded on the projects section
- **When** Bar-App or Tienda-App project card renders
- **Then** no deployment URL button is displayed (only gitUrl link)

### CV Page Scenarios

**SC-08: CV page lists all 15 skills**
- **Given** the user navigates to the CV page
- **When** the skills section renders
- **Then** all 15 skills are listed including MySQL, MongoDB, C#, WPF, .NET

**SC-09: CV skills have correct categories**
- **Given** the user navigates to the CV page
- **When** the skills section renders
- **Then**:
  - C# has category `language`
  - MySQL and MongoDB have category `database`
  - WPF and .NET have category `tooling`

**SC-10: Existing CV skills unchanged**
- **Given** the user navigates to the CV page
- **When** the skills section renders
- **Then** all 10 existing skills retain their original categories

### Icon Rendering Scenarios

**SC-11: All new icons are registered**
- **Given** the application bootstraps
- **When** `Icons` service initializes
- **Then** `icons` array contains all 5 new names: `mysql`, `mongodb`, `csharp`, `wpf`, `dotnet`

**SC-12: Icon SVG files exist**
- **Given** the application builds
- **When** static assets are processed
- **Then** files exist at `public/assets/icons/mysql.svg`, `public/assets/icons/mongodb.svg`, `public/assets/icons/csharp.svg`, `public/assets/icons/wpf.svg`, `public/assets/icons/dotnet.svg`

---

## 3. Acceptance Criteria

### Build Verification
| AC | Criterion |
|----|-----------|
| AC-01 | `ng build` completes with exit code 0 and zero errors |
| AC-02 | `ng lint` passes with zero errors |
| AC-03 | TypeScript compilation succeeds with no type errors |

### Visual Verification
| AC | Criterion |
|----|-----------|
| AC-04 | Skills page shows 15 skill items with icons and colors |
| AC-05 | Projects page shows 4 project cards with titles, tags, and colors |
| AC-06 | Each new skill icon renders its SVG (no broken image icons) |
| AC-07 | CV page shows 15 skills under correct category headings |

### Data Verification
| AC | Criterion |
|----|-----------|
| AC-08 | `Icons.icons` array has 22 entries (17 existing + 5 new) |
| AC-09 | `SSkills` signal has 15 entries (10 existing + 5 new) |
| AC-10 | `SProject` signal has 4 entries (2 existing + 2 new) |
| AC-11 | `SCv` profile skills has 15 entries with correct categories |
| AC-12 | `ICvSkill.category` type includes `'database'` |

---

## 4. Out of Scope (Confirmed)

| Item | Reason |
|------|--------|
| UI layout changes to skills/projects components | Proposal confirms — data addition only |
| Changing `ISkills` interface | Proposal confirms — interface unchanged |
| Changing `IProject` interface | Proposal confirms — interface unchanged |
| Refactoring CV service to share types with skills service | Proposal confirms — separate concerns |
| Adding deployment URLs for new projects | Proposal confirms — gitUrl only |
| Adding `webUrl` to Bar-App or Tienda-App | Not deployed yet |

---

## 5. Interface Change Notice

**IMPORTANT**: The proposal states "no interface changes" in Out of Scope, but `ICvSkill.category` in `src/app/models/icv.ts:30` is typed as `'frontend' | 'tooling' | 'language'`. The proposal assigns MySQL and MongoDB to category `database`, which is NOT in the current union type.

**Resolution**: `ICvSkill.category` MUST be expanded to `'frontend' | 'tooling' | 'language' | 'database'`. This is a minimal, non-breaking type expansion — no existing code references the type by name in a way that would break. This is the ONLY interface change required.

---

## 6. Data Tables

### New Skills

| Skill | Icon filename | Tailwind class | CV category |
|-------|---------------|----------------|-------------|
| MySQL | `mysql.svg` | `!text-sky-700 !size-10` | `database` |
| MongoDB | `mongodb.svg` | `!text-green-500 !size-10` | `database` |
| C# | `csharp.svg` | `!text-violet-600 !size-10` | `language` |
| WPF | `wpf.svg` | `!text-blue-600 !size-10` | `tooling` |
| .NET | `dotnet.svg` | `!text-purple-600 !size-10` | `tooling` |

### New Projects

| Title | Tags | Color | gitUrl | webUrl |
|-------|------|-------|--------|--------|
| Bar-App | Angular, TypeScript, Tailwind, CSS3 | `#3B82F6` | `https://github.com/EnjinDev2310/Bar-App` | undefined |
| Tienda-App | Angular, TypeScript, Tailwind, SQLite, WASM | `#F59E0B` | `https://github.com/EnjinDev2310/Tienda-App-Shop-App` | undefined |

### Affected Files

| File | Change type | Description |
|------|-------------|-------------|
| `public/assets/icons/mysql.svg` | New | MySQL SVG icon |
| `public/assets/icons/mongodb.svg` | New | MongoDB SVG icon |
| `public/assets/icons/csharp.svg` | New | C# SVG icon |
| `public/assets/icons/wpf.svg` | New | WPF SVG icon |
| `public/assets/icons/dotnet.svg` | New | .NET SVG icon |
| `src/app/models/icv.ts` | Modified | Expand `ICvSkill.category` to include `'database'` |
| `src/app/services/icons-service.ts` | Modified | Add 5 icon names to `icons[]` |
| `src/app/services/skills-service.ts` | Modified | Add 5 entries to `#skills` signal |
| `src/app/services/cv-service.ts` | Modified | Add 5 entries to `#profile.skills` signal |
| `src/app/services/project-service.ts` | Modified | Add 2 entries to `#projects` signal |

---

## 7. Rollback Plan

- Delete 5 new SVG files from `public/assets/icons/`
- Revert `icons-service.ts` to original `icons[]` array
- Revert `skills-service.ts` to original `#skills` signal
- Revert `cv-service.ts` to original `#profile.skills` signal
- Revert `project-service.ts` to original `#projects` signal
- Revert `icv.ts` to original `ICvSkill.category` type
- No data migration needed — pure data addition, clean revert

---

## 8. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| SVG icons may not render if viewBox/paths are wrong | Medium | High | Use official brand SVGs from Simple Icons or official sources |
| `ICvSkill.category` expansion breaks existing consumers | Very Low | Low | Grep for category usage; only CV service consumes it |
| Tailwind purge removes new `!` prefixed classes | Very Low | Low | Existing skills already use this pattern successfully |
| Project description text may overflow card layout | Low | Low | Match existing description length patterns |
