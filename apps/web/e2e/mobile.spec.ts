import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 390, height: 844 },
});

test('mobile navigation and booking layout', async ({ page }) => {
  await page.route('**/api/booking-request', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: 'Your appointment request has been received.',
      }),
    });
  });

  await page.goto('/');

  await expect(page.getByText('Menu', { exact: true })).toBeVisible();
  await page.getByText('Menu', { exact: true }).click();
  await page.getByLabel('Mobile').getByRole('link', { name: 'Book now' }).click();

  await expect(page).toHaveURL(/#booking/);
  await expect(page.getByRole('heading', { name: 'Request an appointment' })).toBeVisible();

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 14);

  await page.getByLabel('Preferred date').fill(futureDate.toISOString().slice(0, 10));
  await page.getByLabel('Your name').fill('Mobile Guest');
  await page.getByLabel(/Phone/).fill('+447700900001');
  await page.getByRole('button', { name: 'Submit request' }).click();

  await expect(page.getByRole('heading', { name: 'Request received' })).toBeVisible();
});
