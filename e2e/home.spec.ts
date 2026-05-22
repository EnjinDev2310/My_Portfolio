import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the hero heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Hola, soy EnjinDev/i })).toBeVisible();
  });

  test('should display the subtitle', async ({ page }) => {
    await expect(page.getByText('Frontend')).toBeVisible();
    await expect(page.getByText('Developer')).toBeVisible();
  });

  test('should have navigation buttons', async ({ page }) => {
    await expect(page.getByText('Ver Proyectos').first()).toBeVisible();
    await expect(page.getByText('Sobre Mi').first()).toBeVisible();
  });

  test('should render the skills component', async ({ page }) => {
    const skills = page.locator('app-skills-component');
    await expect(skills).toBeVisible();
  });

  test('skills component should show skill cards', async ({ page }) => {
    const skillCards = page.locator('app-skills-component .skill-card');
    await expect(skillCards.first()).toBeVisible();
    const count = await skillCards.count();
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test('should navigate to projects via link', async ({ page }) => {
    await page.getByText('Ver Proyectos').first().click();
    await expect(page).toHaveURL('/proyects');
  });

  test('should navigate to about via link', async ({ page }) => {
    await page.getByText('Sobre Mi').first().click();
    await expect(page).toHaveURL('/about');
  });
});
