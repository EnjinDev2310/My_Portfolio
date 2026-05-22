import { test, expect } from '@playwright/test';

test.describe('Projects page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/proyects');
  });

  test('should display the heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Proyectos Destacados/i })).toBeVisible();
  });

  test('should display the subtitle', async ({ page }) => {
    await expect(page.getByText('Algunos de los proyectos en los que he trabajado')).toBeVisible();
  });

  test('should show 4 project cards', async ({ page }) => {
    const cards = page.locator('section .grid > div');
    const count = await cards.count();
    expect(count).toBe(4);
  });

  test('first project should be E-Commerce Dashboard', async ({ page }) => {
    await expect(page.getByText('E-Commerce Dashboard')).toBeVisible();
  });

  test('last project should be Developer Portfolio', async ({ page }) => {
    await expect(page.getByText('Developer Portfolio')).toBeVisible();
  });

  test('each card should have a "Ver proyecto" link', async ({ page }) => {
    const links = page.getByText('Ver proyecto');
    const count = await links.count();
    expect(count).toBe(4);
  });

  test('cards should display tech tags', async ({ page }) => {
    await expect(page.getByText('Angular').first()).toBeVisible();
    await expect(page.getByText('TypeScript').first()).toBeVisible();
    await expect(page.getByText('Tailwind').first()).toBeVisible();
  });
});
