# Portfolio — EnjinDev2310

Portfolio personal con CV descargable, proyectos, experiencia y contacto. Construido con Angular 21, Tailwind CSS 4 y Angular Material. Desplegado en GitHub Pages.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Angular 21** | Framework SPA |
| **Tailwind CSS 4** | Utility-first styling |
| **Angular Material** | SVG icons |
| **Vitest** | Unit testing |
| **Playwright** | E2E testing |
| **GitHub Pages** | Hosting |

## Sections / Routes

| Route | Section | Description |
|-------|---------|-------------|
| `/` | Home | Hero section with animated background, skills component |
| `/about` | About | Perfil profesional con foto y descripción |
| `/experience` | Experience | Timeline de experiencia laboral y freelance |
| `/proyects` | Projects | Portfolio de proyectos con enlaces a GitHub y demos |
| `/cv` | CV | Currículum imprimible en una página con botón de descarga PDF |
| `/contact` | Contact | Redes sociales y enlace de correo |

## Features

- **Dark mode** with subtle animations and neon accents
- **Printable CV** — single-page layout with print button; opens browser's native Save as PDF dialog on desktop and mobile
- **PDF download via native `window.print()`** — no external libraries, works offline, supports Android "Save as PDF"
- **Interactive social icons** (Discord, Instagram, GitHub, LinkedIn, Reddit, Telegram)
- **Real project portfolio** with GitHub and live demo links
- **Responsive design** — Tailwind utilities for all screen sizes
- **Lazy loading routes** for optimal bundle size
- **Unit tests** (Vitest) + **E2E tests** (Playwright)
- **Server-side rendering** (Angular SSR via Express)

## Setup

```bash
# Install dependencies
bun install

# Development server
bunx ng serve          # → http://localhost:4200

# Production build
bunx ng build          # Output: dist/portfolio/browser/

# Unit tests (Vitest)
bunx ng test

# E2E tests (Playwright)
bunx playwright test

# E2E tests with UI mode
bunx playwright test --ui
```

## Deployment

The app is deployed to GitHub Pages:

```
https://enjindev2310.github.io/My_Portfolio/
```

### Manual deploy

```bash
bunx ng build
npx angular-cli-ghpages --dir=dist/portfolio/browser
```

## Architecture

```
src/
├── app/
│   ├── components/       # Reusable UI components
│   │   ├── footer/
│   │   ├── header-nav/
│   │   ├── profile-rounded/
│   │   ├── skills-component/
│   │   └── social-icons/
│   ├── pages/            # Route-level page components
│   │   ├── about/
│   │   ├── contact/
│   │   ├── cv/           # Printable CV with download button
│   │   ├── experience/
│   │   ├── home/         # Hero section with masked background
│   │   └── proyects/
│   ├── services/         # Data services singletons (SCv, SProject, etc.)
│   ├── models/           # TypeScript interfaces (I prefix)
│   └── app.config.ts     # Route configuration
├── main.ts
└── styles.css            # Global styles
```

## CV Page

The CV page supports browser-native PDF download:

1. Click **📥 Download CV** button
2. Browser opens print dialog → choose **Save as PDF**
3. After printing/closing, automatically navigates back to home

No external PDF libraries required. Works on desktop and Android Chrome.

## Testing

- **Unit tests**: Vitest via `@angular/build:unit-test` — 88+ tests across 18 files
- **E2E tests**: Playwright — covers all page routes
- Test files follow a `.spec.ts` naming convention
- Strict TDD applied to new features

## License

MIT
