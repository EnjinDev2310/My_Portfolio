import { test, expect } from '@playwright/test';

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display social-icons component', async ({ page }) => {
    const socialIcons = page.locator('app-social-icons');
    await expect(socialIcons).toBeVisible();
  });

  test('should display email link', async ({ page }) => {
    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toContainText('Rodriguez.Lorenzo');
  });

  test('should have social links with aria-labels', async ({ page }) => {
    const socialLinks = page.locator('app-social-icons a[aria-label]');
    const count = await socialLinks.count();
    // Should have at least Discord, Instagram, Linkedin, Reddit, Telegram
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('social links should open in new tab', async ({ page }) => {
    const socialLinks = page.locator('app-social-icons a');
    await expect(socialLinks.first()).toHaveAttribute('target', '_blank');
    await expect(socialLinks.first()).toHaveAttribute('rel', 'noopener');
  });

  test('should render mat-icon for email', async ({ page }) => {
    const emailIcon = page.locator('mat-icon[svgIcon="email"]');
    await expect(emailIcon).toBeVisible();
  });
});
