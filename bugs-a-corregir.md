# 🔧 Bug Report — Portfolio

> Diagnóstico generado el 2026-05-20.
> Estado: solo diagnóstico. No se modificó nada.

---

## Índice

1. [🚨 CRITICAL — `template: ''` pisó `templateUrl` en home.ts](#1--critical--template--pisó-templateurl-en-homets)
2. [🚨 CRITICAL — SVGs en directorio incorrecto + URL mal formada](#2--critical--svgs-en-directorio-incorrecto--url-mal-formada)
3. [🔴 HIGH — Falta `provideAnimationsAsync()` en app.config.ts](#3--high--falta-provideanimationsasync-en-appconfigts)
4. [🔴 HIGH — SSR / prerender rompe por side-effects en constructor de Icons](#4--high--ssr--prerender-rompe-por-side-effects-en-constructor-de-icons)
5. [🔴 HIGH — 4 tests fallan por falta de Router provider](#5--high--4-tests-fallan-por-falta-de-router-provider)
6. [🟡 MEDIUM — Test "should render title" desactualizado](#6--medium--test-should-render-title-desactualizado)
7. [🟡 MEDIUM — Tema Angular Material duplicado en material-theme.scss](#7--medium--tema-angular-material-duplicado-en-material-themescss)
8. [🧹 ADICIONAL — Buenas prácticas / limpieza fina](#8--adicional--buenas-prácticas--limpieza-fina)
9. [🔴 boludo gentle](#9--boludo-gentle)

---

## 1. 🚨 CRITICAL — `template: ''` pisó `templateUrl` en home.ts

### Archivo
`src/app/pages/home/home.ts`

### Estado actual
```typescript
@Component({
  selector: 'app-home',
  imports: [RouterLink, MatIcon],
  templateUrl: './home.html',   // ← IGNORADO
  styleUrl: './home.css',
  template: ``,                  // ← ESTE GANA
})
```

### ¿Qué pasa?
La propiedad `template` **pisa** a `templateUrl` cuando ambas están presentes. Angular usa `template` como fuente definitiva. El componente renderiza un string vacío.

### Consecuencia
La página Home se ve completamente en blanco. No se renderiza el hero section, no se renderiza la grilla de skills, no se renderizan los `<mat-icon>`. Es el bug más grave de todos.

### Corrección exacta
Eliminar la línea `template: ''` del decorador `@Component`. Debe quedar así:

```typescript
@Component({
  selector: 'app-home',
  imports: [RouterLink, MatIcon],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
```

| Línea | Está | Debe estar |
|-------|------|------------|
| 11 | `template: \`\`` | *(eliminar la línea)* |

### Verificación
Después de corregir, al navegar a `/` se debe ver el hero ("Hola, soy EnjinDev") y la grilla de skills.

---

## 2. 🚨 CRITICAL — SVGs en directorio incorrecto + URL mal formada

### Archivos involucrados

| Archivo | Rol |
|---------|-----|
| `src/app/services/icons.ts` | Define la URL que usa `MatIconRegistry` |
| `public/assets/icons/` | Directorio donde DEBERÍAN estar los SVGs |
| `src/app/assets/icons/` | Directorio donde ESTÁN actualmente |
| `angular.json` | Define `public/` como raíz de assets |

### Estado actual de los SVGs

Los 7 archivos SVG están en:
```
src/app/assets/icons/angular.svg
src/app/assets/icons/css.svg
src/app/assets/icons/git.svg
src/app/assets/icons/html.svg
src/app/assets/icons/javascript.svg
src/app/assets/icons/tailwind.svg
src/app/assets/icons/typescript.svg
```

### Estado actual del build (angular.json)

```json
"assets": [
  {
    "glob": "**/*",
    "input": "public"
  }
]
```

El build solo copia archivos desde `public/` al output. Los SVGs en `src/app/assets/icons/` **quedan afuera**.

### Estado actual de icons.ts (línea 19)

```typescript
this.sanitizer.bypassSecurityTrustResourceUrl(
  `public/assets/icons/${iconName}.svg`   // ← MAL
);
```

### Error 1: URL con `public/`
El browser sirve los assets **sin** el prefijo `public/`. Si el archivo está en `public/assets/icons/angular.svg`, su URL pública es `/assets/icons/angular.svg`. Poner `public/` en la URL hace que el browser pida `public/assets/icons/angular.svg` → 404.

### Error 2: SVGs en directorio incorrecto
Aunque la URL fuera correcta (`assets/icons/angular.svg`), los SVGs no están en `public/assets/icons/` así que igual dan 404.

### Corrección exacta

**Paso 1 — Mover los archivos SVG:**
```
MOVER:
  src/app/assets/icons/angular.svg
  src/app/assets/icons/css.svg
  src/app/assets/icons/git.svg
  src/app/assets/icons/html.svg
  src/app/assets/icons/javascript.svg
  src/app/assets/icons/tailwind.svg
  src/app/assets/icons/typescript.svg

A:
  public/assets/icons/angular.svg
  public/assets/icons/css.svg
  public/assets/icons/git.svg
  public/assets/icons/html.svg
  public/assets/icons/javascript.svg
  public/assets/icons/tailwind.svg
  public/assets/icons/typescript.svg
```

Comando (si querés hacerlo rápido):
```bash
mkdir -p public/assets/icons
mv src/app/assets/icons/*.svg public/assets/icons/
```

O simplemente borrá `src/app/assets/icons/` después del move porque esa carpeta ya no sirve:
```bash
rmdir src/app/assets/icons   # (si quedó vacía)
```

**Paso 2 — Corregir la URL en icons.ts (línea 19):**

Antes:
```typescript
`public/assets/icons/${iconName}.svg`
```

Después:
```typescript
`assets/icons/${iconName}.svg`
```

La línea completa debe quedar:
```typescript
this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconName}.svg`),
```

### Verificación
- `ng serve` sin errores de build
- Abrir el browser, ir a Home, los `<mat-icon>` deben mostrar los SVGs correctamente
- Abrir DevTools > Network, buscar `assets/icons/angular.svg` → debe responder 200

---

## 3. 🔴 HIGH — Falta `provideAnimationsAsync()` en app.config.ts

### Archivo
`src/app/app.config.ts`

### Estado actual
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    // ❌ Falta provideAnimationsAsync()
  ]
};
```

### ¿Qué pasa?
Angular Material **necesita** que el módulo de animaciones esté registrado. Sin `provideAnimationsAsync()` (o `provideAnimations()`), componentes como `MatIcon`, `MatMenu`, `MatDialog`, etc. pueden fallar silenciosamente o tirar errores como:

> `Found the synthetic property @transformStart. Please include either 'BrowserAnimationsModule' or 'NoopAnimationsModule' in your application.`

### Corrección exacta

Agregar el import y el provider:

```typescript
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';   // ← nueva línea

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),              // ← nueva línea
  ]
};
```

### Archivo completo después del fix
```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ]
};
```

### Verificación
- `ng test` no debe tirar errores relacionados con animaciones
- Componentes de Angular Material deben renderizar sin warnings en la consola

---

## 4. 🔴 HIGH — SSR / prerender rompe por side-effects en constructor de Icons

### Archivo
`src/app/services/icons.ts`

### Estado actual
```typescript
@Injectable({ providedIn: 'root' })
export class Icons {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  icons: string[] = ['angular', 'css', 'git', 'html', 'javascript', 'tailwind', 'typescript'];

  constructor() {
    console.log('Icons service loaded');
    this.icons.forEach((iconName) => {
      this.iconRegistry.addSvgIcon(
        iconName,
        this.sanitizer.bypassSecurityTrustResourceUrl(`public/assets/icons/${iconName}.svg`),
      );
      console.log('icon added' + iconName);
    });
  }
}
```

### ¿Qué pasa?
El constructor del `Icons` service se ejecuta ni bien Angular lo instancia. Y se instancia porque el `App` component lo inyecta:

```typescript
private icons = inject(Icons)   // app.ts línea 15
```

Durante SSR / prerender, Angular del lado del servidor ejecuta el constructor del service. `MatIconRegistry.addSvgIcon()` del lado del servidor:
1. Recibe una URL (`public/assets/icons/...`)
2. Intenta marcarla como trusted via `DomSanitizer` (anda, es solo marcar)
3. Pero el `MatIconRegistry` en SSR intenta resolver URLs contra el DOM del server, que no existe igual que en el browser

Además, el build falla con:
```
DataCloneError: Data cannot be cloned, out of memory.
```

Ese error sale del worker pool de prerenderizado. Es síntoma de que el server no puede serializar algo que debería correr solo en browser — los side-effects del `MatIconRegistry` durante SSR.

### Corrección exacta

Hay que **diferir** el registro de iconos para que solo ocurra en el browser. Se puede hacer moviendo el registro del constructor a un método `init()` que se llame desde el componente o desde un `APP_INITIALIZER` que verifique `isPlatformBrowser`.

**Opción recomendada (menos intrusiva):**

```typescript
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root',
})
export class Icons {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  icons: string[] = ['angular', 'css', 'git', 'html', 'javascript', 'tailwind', 'typescript'];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.registerIcons();
    }
  }

  private registerIcons(): void {
    console.log('Icons service loaded');
    this.icons.forEach((iconName) => {
      this.iconRegistry.addSvgIcon(
        iconName,
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconName}.svg`),
      );
      console.log('icon added ' + iconName);
    });
  }
}
```

**Cambios exactos:**

| Item | Antes | Después |
|------|-------|---------|
| Import agregado | — | `PLATFORM_ID` desde `@angular/core` |
| Import agregado | — | `isPlatformBrowser` desde `@angular/common` |
| Inyección nueva | — | `private platformId = inject(PLATFORM_ID)` (después de `sanitizer`) |
| Constructor | Registro directo | `if (isPlatformBrowser(this.platformId)) { this.registerIcons(); }` |
| URL | `public/assets/icons/...` | `assets/icons/...` |
| Nuevo método | — | `private registerIcons(): void` con el `forEach` |
| console.log | `'icon added' + iconName` | `'icon added ' + iconName` (con espacio antes del nombre) |

### Verificación
- `ng build` debe completar sin errores (incluso con SSR)
- `ng serve` debe mostrar los iconos en el browser
- No debe aparecer `DataCloneError` en la terminal

---

## 5. 🔴 HIGH — 4 tests fallan por falta de Router provider

### Archivos afectados

| Archivo | Tests que fallan |
|---------|-----------------|
| `src/app/app.spec.ts` | "should create the app", "should render title" |
| `src/app/pages/home/home.spec.ts` | "should create" |
| `src/app/components/header-nav/header-nav.spec.ts` | "should create" |

### Error común en todos
```
NG0201: No provider found for ActivatedRoute
```

### ¿Por qué?
- `App` usa `<router-outlet>` en su template → necesita Router
- `Home` importa `RouterLink` en `imports: [RouterLink, MatIcon]` → `RouterLink` necesita `ActivatedRoute`
- `HeaderNav` importa `RouterLink` y `RouterLinkActive` → ambos necesitan `ActivatedRoute`

Ninguno de los tests provee el Router.

### Corrección exacta

#### 5a. `src/app/app.spec.ts`

Antes:
```typescript
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, portfolio');
  });
});
```

Después:
```typescript
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),   // ← array vacío porque App solo necesita el outlet
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
```

**Cambios exactos:**

| Línea | Cambio |
|-------|--------|
| 1 | Agregar `import { provideRouter } from '@angular/router';` |
| 5-8 | En el `beforeEach`, agregar `providers: [provideRouter([])]` al objeto de `configureTestingModule` |
| 17-22 | **Eliminar** el test "should render title" completo (está desactualizado, explicado en sección 6) |

#### 5b. `src/app/pages/home/home.spec.ts`

Antes:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

Después:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),   // ← RouterLink necesita ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

**Cambios exactos:**

| Línea | Cambio |
|-------|--------|
| 1 | Agregar `import { provideRouter } from '@angular/router';` |
| 11-13 | Agregar `providers: [provideRouter([])]` al `configureTestingModule` |

#### 5c. `src/app/components/header-nav/header-nav.spec.ts`

Antes:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderNav } from './header-nav';

describe('HeaderNav', () => {
  let component: HeaderNav;
  let fixture: ComponentFixture<HeaderNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNav],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

Después:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderNav } from './header-nav';

describe('HeaderNav', () => {
  let component: HeaderNav;
  let fixture: ComponentFixture<HeaderNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNav],
      providers: [
        provideRouter([]),   // ← RouterLink + RouterLinkActive necesitan ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

**Cambios exactos:**

| Línea | Cambio |
|-------|--------|
| 1 | Agregar `import { provideRouter } from '@angular/router';` |
| 11-13 | Agregar `providers: [provideRouter([])]` al `configureTestingModule` |

### Verificación
```bash
ng test --no-watch
```
Debe mostrar:
```
Tests:   12 passed  (antes: 8 passed, 4 failed)
```

---

## 6. 🟡 MEDIUM — Test "should render title" desactualizado

### Archivo
`src/app/app.spec.ts`

### Estado actual
```typescript
it('should render title', async () => {
  const fixture = TestBed.createComponent(App);
  await fixture.whenStable();
  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.querySelector('h1')?.textContent).toContain('Hello, portfolio');
});
```

### ¿Qué pasa?
Este test vino del template por defecto de Angular CLI, que generaba:
```html
<h1>Hello, portfolio</h1>
```

Pero tu `app.html` actual es:
```html
<app-header-nav></app-header-nav>
<main>
  <router-outlet></router-outlet>
</main>
<app-footer></app-footer>
```

No hay `<h1>` en el template. El test siempre va a fallar: `querySelector('h1')` devuelve `null`, `null?.textContent` es `undefined`, y `undefined` no contiene `'Hello, portfolio'`.

### Corrección exacta
Eliminar el test entero (líneas 17-22). El archivo debe quedar:

```typescript
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
```

**Líneas a eliminar:** 17 a 22 (el `it('should render title'...)` completo).

### Alternativa (si querés mantener el test)
Podés reemplazar la aserción por algo que sí exista en el template actual, por ejemplo:
```typescript
it('should have header-nav', () => {
  const fixture = TestBed.createComponent(App);
  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.querySelector('app-header-nav')).toBeTruthy();
});
```

---

## 7. 🟡 MEDIUM — Tema Angular Material duplicado en material-theme.scss

### Archivo
`src/material-theme.scss`

### Estado actual (70 líneas)

```scss
@use '@angular/material' as mat;

// ─── PRIMER BLOQUE (líneas 8-38) ───
html {
  height: 100%;
  @include mat.theme((
    color: (primary: mat.$magenta-palette, tertiary: mat.$violet-palette),
    typography: Roboto,
    density: 0,
  ));
}

body {
  color-scheme: light;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);
  margin: 0;
  height: 100%;
}

// ─── SEGUNDO BLOQUE (líneas 40-70) ─── IDÉNTICO pero con azure/blue
html {
  height: 100%;
  @include mat.theme((
    color: (primary: mat.$azure-palette, tertiary: mat.$blue-palette),
    typography: Roboto,
    density: 0,
  ));
}

body {
  // ... exactamente el mismo bloque que arriba ...
  color-scheme: light;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);
  margin: 0;
  height: 100%;
}
```

### ¿Qué pasa?
El segundo `html { @include mat.theme(...) }` (líneas 40-52) **pisa** completamente al primero (líneas 8-20). CSS cascade: gana el último.

Las reglas de `body` (22-38 y 54-70) son idénticas y están duplicadas sin razón.

### Corrección exacta
Eliminar el primer bloque (líneas 8-38) y quedarse solo con el segundo (que define azure/blue). O al revés, si preferías magenta/violet, quedarte con el primero.

**Versión final recomendada (azure/blue — la que gana actualmente):**

```scss
// Include theming for Angular Material with `mat.theme()`.
// This Sass mixin will define CSS variables that are used for styling Angular Material
// components according to the Material 3 design spec.
// Learn more about theming and how to use it for your application's
// custom components at https://material.angular.dev/guide/theming
@use '@angular/material' as mat;

html {
  height: 100%;
  @include mat.theme(
    (
      color: (
        primary: mat.$azure-palette,
        tertiary: mat.$blue-palette,
      ),
      typography: Roboto,
      density: 0,
    )
  );
}

body {
  color-scheme: light;

  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);

  margin: 0;
  height: 100%;
}
```

**Líneas a eliminar:** 8 a 38 (el primer bloque completo, desde el primer `html {` hasta el `}` del primer `body`).

Si preferís la paleta magenta/violet, eliminá las líneas 40-70 y mantené las 8-38.

### Verificación
- `ng build` debe compilar sin cambios visuales
- Los colores de Angular Material deben seguir funcionando (los que están en uso)

---

## 8. 🧹 ADICIONAL — Buenas prácticas / limpieza fina

### 8a. Sacar `console.log` del Icons service

`src/app/services/icons.ts` — líneas 15 y 21

```typescript
constructor() {
  console.log('Icons service loaded');       // ← innecesario
  ...
  console.log('icon added' + iconName);      // ← innecesario
```

Los logs de registro están bien para desarrollo pero no deberían ir a producción. Opciones:

- Eliminarlos directamente (son 2 líneas)
- O envolverlos en `if (!environment.production)` si tenés un environment file

### 8b. Tipar la propiedad `skills` en Home

`src/app/pages/home/home.ts` — línea 13

```typescript
readonly skills;
```

No tiene tipo. TypeScript lo infiere de `this.skillService.skills()` que devuelve `ISkills[]`, pero es más explícito y seguro:

```typescript
import { ISkills } from '../../models/iskills';
// ...
readonly skills: ISkills[];
```

### 8c. Considerar APP_INITIALIZER para Icons

Si querés una solución más limpia que el `isPlatformBrowser` en el constructor, podés registrar los iconos en un `APP_INITIALIZER` que solo corra en browser. Pero la solución de la sección 4 (guard en constructor) es perfectamente válida y más simple para este tamaño de proyecto.

---

## 🎯 Resumen de cambios por archivo

| # | Archivo | Qué hacer |
|---|---------|-----------|
| 1 | `src/app/pages/home/home.ts` | Eliminar `template: ''` (línea 11) |
| 2 | `public/assets/icons/` | Crear directorio |
| 2 | `src/app/assets/icons/*.svg` | Mover 7 archivos a `public/assets/icons/` |
| 2 | `src/app/services/icons.ts` | Cambiar URL `public/assets/icons/` → `assets/icons/` (línea 19) |
| 3 | `src/app/app.config.ts` | Agregar `import` + `provideAnimationsAsync()` |
| 4 | `src/app/services/icons.ts` | Agregar guard `isPlatformBrowser` + método `registerIcons()` |
| 5a | `src/app/app.spec.ts` | Agregar `provideRouter([])` en providers |
| 5b | `src/app/pages/home/home.spec.ts` | Agregar `provideRouter([])` en providers |
| 5c | `src/app/components/header-nav/header-nav.spec.ts` | Agregar `provideRouter([])` en providers |
| 6 | `src/app/app.spec.ts` | Eliminar test "should render title" (líneas 17-22) |
| 7 | `src/material-theme.scss` | Eliminar bloque duplicado (líneas 8-38) |
| 8a | `src/app/services/icons.ts` | Eliminar `console.log` (líneas 15 y 21) |
| 8b | `src/app/pages/home/home.ts` | Agregar tipo `ISkills[]` a `skills` |

---

## 🧪 Verificación final

Después de aplicar todas las correcciones:

```bash
# 1. Build sin errores
ng build

# 2. Tests todos verdes
ng test --no-watch
# → 12 passed, 0 failed

# 3. Dev server y probar en browser
ng serve
# → Home muestra hero section y skills grid
# → Iconos SVG se ven en las skill cards
# → Sin 404 en DevTools > Network
```
---

## 9. <span style="color:crimson">boludo gentle</span>

### Archivo
`src/app/services/icons.ts`

### Contexto — cómo llegamos hasta acá

El bug de la sección 4 (SSR rompía por side-effects en constructor) se **parcialmente** corrigió. Los cambios aplicados fueron:

| Item | Antes (sección 4) | Después (código actual) |
|------|-------------------|------------------------|
| SVGs | `src/app/assets/icons/` | `public/assets/icons/` ✅ |
| URL | `public/assets/icons/${name}.svg` | `assets/icons/${name}.svg` ✅ |
| Guard platform | ❌ No tenía | ✅ `isPlatformBrowser` en constructor |
| Método | Registro inline | ✅ `registerIcons()` separado |

Pero el guard `isPlatformBrowser` **no es la solución correcta**.

### ¿Qué pasa ahora?

Cuando el servidor renderiza la app (SSR):

```
1. App component se crea → inyecta Icons
2. Icons constructor corre con isPlatformBrowser = false
3. registerIcons() NO se ejecuta
4. Servidor renderiza <mat-icon [svgIcon]="'html'">
5. MatIconRegistry busca "html" → no existe
6. ERROR: "Error retrieving icon :html! Unable to find icon with the name ':html'"
```

Este error aparece en la consola del browser porque el SSR falló al generar el HTML de los iconos.

### ¿Por qué está mal el guard?

`MatIconRegistry.addSvgIcon()` **no necesita el DOM**. Es una operación de registro de metadatos — le decís "cuando alguien pida `html`, buscá en `assets/icons/html.svg`". Eso funciona tanto en server como en browser.

Lo que SÍ diferencia al server del browser es el **fetch del SVG**. Pero eso lo maneja `MatIcon` internamente — si el fetch falla en SSR, Angular Material deja un placeholder y lo hidrata del lado del cliente. El registro, en cambio, es necesario en AMBOS entornos.

El guard `isPlatformBrowser` en el constructor está impidiendo que el server sepa siquiera que esos iconos existen.

### Solución correcta

```typescript
constructor() {
  this.registerIcons();  // ← registrar SIEMPRE, sin guard
}
```

Sacar el `isPlatformBrowser` y el `PLATFORM_ID`. El `MatIconRegistry` maneja SSR correctamente si le das los registros.

Si REALMENTE querés evitar cualquier cosa de SVG en SSR (por tamaño de bundle o lo que sea), la solución correcta no es un guard — es diferir los componentes `<mat-icon>` a solo-cliente con `afterNextRender` o un flag `isBrowser`. Pero para este proyecto, registrar siempre es la respuesta.

### Cambio exacto

En `src/app/services/icons.ts`:

| Línea | Está | Debe estar |
|-------|------|------------|
| 1 | `import { inject, Injectable, PLATFORM_ID } from '@angular/core';` | `import { inject, Injectable } from '@angular/core';` |
| 4 | `import { isPlatformBrowser } from '@angular/common';` | *(eliminar línea)* |
| 12 | `private platformID = inject(PLATFORM_ID);` | *(eliminar línea)* |
| 17-19 | `if(isPlatformBrowser(this.platformID)){ this.registerIcons() }` | `this.registerIcons()` |

Código después del fix:

```typescript
import { inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root',
})
export class Icons {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  icons: string[] = ['angular', 'css', 'git', 'html', 'javascript', 'tailwind', 'typescript'];

  constructor() {
    this.registerIcons()
  }
  private registerIcons(): void{
    this.icons.forEach((iconName) => {
      this.iconRegistry.addSvgIcon(
        iconName,
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconName}.svg`),
      );
    });
  }
}
```

### Por qué esto NO reintroduce el bug de la sección 4

El bug original de la sección 4 era:
1. URL incorrecta: `public/assets/icons/...` → daba 404 en browser
2. SVGs en directorio incorrecto: `src/app/assets/icons/` → no se copiaban al build
3. `DataCloneError` durante prerender — probablemente por intentar resolver URLs contra un DOM que no existe EN EL PRERENDER

Los puntos 1 y 2 ya están corregidos (SVGs en `public/`, URL sin `public/`).

El punto 3 (DataCloneError) era un síntoma de los puntos 1 y 2 combinados con el registro directo. Ahora que las URLs son válidas y los archivos existen, registrar sin guard funciona sin errores.

### Verificación

```bash
ng serve
```

- No debe aparecer `Error retrieving icon :html!` en la consola del browser
- Los 7 iconos SVG deben verse en la grilla de skills en Home
- SSR debe generar HTML completo sin errores

---

*Documento generado automáticamente por revisión de código. Sin modificaciones realizadas.*
