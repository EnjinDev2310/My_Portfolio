# Tasks: Add Skills and Projects to Portfolio

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 100–150 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: Type Expansion

- [x] 1.1 Expand `ICvSkill.category` union in `src/app/models/icv.ts:30` from `'frontend' | 'tooling' | 'language'` to `'frontend' | 'tooling' | 'language' | 'database'` (+1 line)

## Phase 2: SVG Icons

- [x] 2.1 Create `public/assets/icons/mysql.svg` — MySQL brand icon, viewBox `0 0 15 15`, `fill="currentColor"`, all paths use `currentColor`
- [x] 2.2 Create `public/assets/icons/mongodb.svg` — MongoDB brand icon, same pattern
- [x] 2.3 Create `public/assets/icons/csharp.svg` — C# brand icon, same pattern
- [x] 2.4 Create `public/assets/icons/wpf.svg` — WPF icon (custom SVG, no Simple Icons entry), same pattern
- [x] 2.5 Create `public/assets/icons/dotnet.svg` — .NET brand icon, same pattern

## Phase 3: Icon Registration

- [x] 3.1 Add `'mysql', 'mongodb', 'csharp', 'wpf', 'dotnet'` to `icons: string[]` in `src/app/services/icons-service.ts:12` (+1 line)

## Phase 4: Skills Data

- [x] 4.1 Add 5 entries to `#skills` signal in `src/app/services/skills-service.ts` after the GitHub entry (~15 lines):
  - MySQL: `icon: 'mysql', class: '!text-sky-700 !size-10'`
  - MongoDB: `icon: 'mongodb', class: '!text-green-500 !size-10'`
  - C#: `icon: 'csharp', class: '!text-violet-600 !size-10'`
  - WPF: `icon: 'wpf', class: '!text-blue-600 !size-10'`
  - .NET: `icon: 'dotnet', class: '!text-purple-600 !size-10'`

## Phase 5: CV Skills Data

- [x] 5.1 Add 5 entries to `#profile.skills` signal in `src/app/services/cv-service.ts` after GitHub entry (~5 lines):
  - `{ name: 'MySQL', category: 'database' }`
  - `{ name: 'MongoDB', category: 'database' }`
  - `{ name: 'C#', category: 'language' }`
  - `{ name: 'WPF', category: 'tooling' }`
  - `{ name: '.NET', category: 'tooling' }`

## Phase 6: Projects Data

- [x] 6.1 Add 2 entries to `#projects` signal in `src/app/services/project-service.ts` after Developer Portfolio (~16 lines):
  - Bar-App: tags `['Angular', 'TypeScript', 'Tailwind', 'CSS3']`, color `#3B82F6`, gitUrl `https://github.com/EnjinDev2310/Bar-App`, no webUrl
  - Tienda-App: tags `['Angular', 'TypeScript', 'Tailwind', 'SQLite', 'WASM']`, color `#F59E0B`, gitUrl `https://github.com/EnjinDev2310/Tienda-App-Shop-App`, no webUrl

## Phase 7: Build Verification

- [x] 7.1 Run `ng build` — expect exit code 0, zero errors
- [x] 7.2 Run `ng lint` — expect zero errors
- [x] 7.3 Verify `Icons.icons` array has 22 entries
- [x] 7.4 Verify `SSkills` signal has 15 entries
- [x] 7.5 Verify `SProject` signal has 4 entries
- [x] 7.6 Verify `SCv` profile skills has 15 entries
