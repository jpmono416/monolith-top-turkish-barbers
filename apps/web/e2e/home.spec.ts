import { test, expect } from '@playwright/test';

test('home page loads with barber branding and sections', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Top Turkish Barbers' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Crafted for every visit' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The atmosphere' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Request an appointment' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Find the shop' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Request appointment' })).toBeVisible();
});
