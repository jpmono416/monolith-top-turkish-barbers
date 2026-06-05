import { test, expect } from '@playwright/test';

test('home page loads with barber branding and sections', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: /Premium Grooming/i }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Gallery' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Booking' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Visit Us' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Book Appointment' }).first()).toBeVisible();
});
