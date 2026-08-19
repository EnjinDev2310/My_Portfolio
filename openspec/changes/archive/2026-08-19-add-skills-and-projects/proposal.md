# Proposal: Add Skills and Projects to Portfolio

## Intent

Expand the portfolio's skill set and project showcase to reflect current competencies (MySQL, MongoDB, C#, WPF, .NET) and recent GitHub work (Bar-App, Tienda-App). The portfolio currently underrepresents backend/database skills and omits two completed Angular projects.

## Scope

### In Scope
- Add 5 new skills: MySQL, MongoDB, C#, WPF, .NET
- Add 2 new projects: Bar-App, Tienda-App-Shop-App
- SVG icons for all 5 new skills in `public/assets/icons/`
- Icon registration in `icons-service.ts`
- Skill entries in `skills-service.ts` with Tailwind color classes
- Skill entries in `cv-service.ts` under appropriate categories
- Project entries in `project-service.ts` with tags, colors, and URLs

### Out of Scope
- UI layout changes to skills/projects display components
- Changing the `ISkills` or `IProject` interfaces
- Refactoring CV service to share types with skills service
- Adding deployment URLs (only gitUrl for new projects)

## Capabilities

### New Capabilities
None — this is data addition, not new behavioral capability.

### Modified Capabilities
None — no spec-level requirements change. Existing rendering behavior is unchanged.

## Approach

1. Create 5 SVG icon files in `public/assets/icons/` (mysql, mongodb, csharp, wpf, dotnet)
2. Add icon names to `Icons.icons[]` array in `icons-service.ts`
3. Add 5 entries to `SSkills.#skills` signal in `skills-service.ts` with brand-appropriate Tailwind colors
4. Add 5 entries to `SCv.#profile.skills` signal in `cv-service.ts` with categories: `language` for C#, `database` for MySQL/MongoDB, `tooling` for WPF/.NET
5. Add 2 entries to `SProject.#projects` signal in `project-service.ts`

### Color choices (brand-aligned)
| Skill | Icon | Tailwind Color |
|-------|------|----------------|
| MySQL | mysql | `!text-sky-700` |
| MongoDB | mongodb | `!text-green-500` |
| C# | csharp | `!text-violet-600` |
| WPF | wpf | `!text-blue-600` |
| .NET | dotnet | `!text-purple-600` |

### Project entries
| Project | Tags | Color | gitUrl |
|---------|------|-------|--------|
| Bar-App | Angular, TypeScript, Tailwind, CSS3 | `#3B82F6` | `https://github.com/EnjinDev2310/Bar-App` |
| Tienda-App | Angular, TypeScript, Tailwind, SQLite, WASM | `#F59E0B` | `https://github.com/EnjinDev2310/Tienda-App-Shop-App` |

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `public/assets/icons/*.svg` | New | 5 new SVG icon files |
| `src/app/services/icons-service.ts` | Modified | 5 new icon names in `icons[]` |
| `src/app/services/skills-service.ts` | Modified | 5 new skill entries in signal |
| `src/app/services/cv-service.ts` | Modified | 5 new CV skill entries |
| `src/app/services/project-service.ts` | Modified | 2 new project entries |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| SVG icons may not render if paths are wrong | Low | Follow existing `assets/icons/{name}.svg` pattern exactly |
| CV skill categories may not match existing category set | Low | Verify `ICvSkill.category` accepts new values; add if needed |
| `!size-10` Tailwind utility may conflict with icon container | Low | Match existing class pattern exactly |

## Rollback Plan

Remove the 5 SVG files, revert additions in all 4 service files. No schema changes, so rollback is clean revert of each file.

## Dependencies

- None. All changes are self-contained data additions.

## Success Criteria

- [ ] All 5 new icons render correctly via `mat-icon`
- [ ] Skills section displays 15 skills (10 existing + 5 new)
- [ ] Projects section displays 4 projects (2 existing + 2 new)
- [ ] CV page lists all 15 skills with correct categories
- [ ] Build passes with no errors
