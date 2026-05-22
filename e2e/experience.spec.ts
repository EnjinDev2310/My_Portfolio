import { test, expect } from '@playwright/test';

test.describe('Experience page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experience');
  });

  test('should display the heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Experiencia Profesional/i })).toBeVisible();
  });

  test('should display the subtitle', async ({ page }) => {
    await expect(page.getByText('Mi trayectoria en el mundo del desarrollo')).toBeVisible();
  });

  test('should show 3 experience entries', async ({ page }) => {
    const entries = page.locator('section h3');
    const count = await entries.count();
    expect(count).toBe(3);
  });

  test('first entry should have "Actual" badge', async ({ page }) => {
    await expect(page.getByText(/Actual/).first()).toBeVisible();
  });

  test('first entry should be current role', async ({ page }) => {
    await expect(page.getByText('Desarrollador Frontend Junior')).toBeVisible();
    await expect(page.getByText('2026 — Actualidad')).toBeVisible();
  });

  test('second entry should be freelance', async ({ page }) => {
    await expect(page.getByText('Desarrollador Freelance')).toBeVisible();
    await expect(page.getByText('2025 — 2026')).toBeVisible();
  });

  test('entries should have tech tags', async ({ page }) => {
    const tags = page.locator('section h3 ~ div span');
    await expect(tags.first()).toBeVisible();
  });
});
