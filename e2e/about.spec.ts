import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('should display the heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /enjin.dev/ })).toBeVisible();
  });

  test('should display the subtitle', async ({ page }) => {
    await expect(page.getByText('Frontend Developer')).toBeVisible();
  });

  test('should render profile image', async ({ page }) => {
    const profileImg = page.locator('app-profile-rounded img');
    await expect(profileImg).toBeVisible();
    await expect(profileImg).toHaveAttribute('alt', 'enjin.dev');
  });

  test('should show 3 metric cards', async ({ page }) => {
    const metrics = page.locator('app-about .grid > div');
    await expect(metrics).toHaveCount(3);
  });

  test('should display "20+" projects metric', async ({ page }) => {
    await expect(page.getByText(/20\+/)).toBeVisible();
    await expect(page.getByText('Proyectos', { exact: true }).last()).toBeVisible();
  });

  test('should display "100%" dedication metric', async ({ page }) => {
    await expect(page.getByText('100%')).toBeVisible();
    await expect(page.getByText('Dedicacion')).toBeVisible();
  });

  test('should contain developer bio', async ({ page }) => {
    await expect(page.getByText(/Hola Mundo/i)).toBeVisible();
    await expect(page.getByText(/Angular/i)).toBeVisible();
    await expect(page.getByText(/TypeScript/i)).toBeVisible();
  });
});
