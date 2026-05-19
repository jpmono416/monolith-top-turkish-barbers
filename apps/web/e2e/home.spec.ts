import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Monolith' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Get started' })).toBeVisible();
});
