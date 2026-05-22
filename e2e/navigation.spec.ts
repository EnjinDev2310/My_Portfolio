import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have 5 nav links', async ({ page }) => {
    const navLinks = page.locator('header nav ul a');
    await expect(navLinks).toHaveCount(5);
  });

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('link', { name: /Sobre Mi/i }).first().click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: /enjin.dev/ })).toBeVisible();
  });

  test('should navigate to Experience page', async ({ page }) => {
    await page.getByRole('link', { name: /Experiencia/i }).click();
    await expect(page).toHaveURL('/experience');
    await expect(page.getByRole('heading', { name: /Experiencia Profesional/i })).toBeVisible();
  });

  test('should navigate to Projects page', async ({ page }) => {
    await page.getByRole('link', { name: /Proyectos/i }).first().click();
    await expect(page).toHaveURL('/proyects');
    await expect(page.getByRole('heading', { name: /Proyectos Destacados/i }).first()).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.getByRole('link', { name: /Contacto/i }).click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByText(/mandame un mail/i)).toBeVisible();
  });

  test('should navigate back to Home via brand link', async ({ page }) => {
    await page.getByRole('link', { name: /Experiencia/i }).click();
    await expect(page).toHaveURL('/experience');

    await page.locator('header a').first().click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Hola, soy EnjinDev')).toBeVisible();
  });

  test('should have hamburger menu button (hidden on desktop)', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label="Toggle menu"]');
    // Button exists in DOM but is hidden on desktop via md:hidden
    await expect(toggleButton).toBeAttached();
  });
});
