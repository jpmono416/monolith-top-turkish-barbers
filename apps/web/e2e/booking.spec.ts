import { test, expect } from '@playwright/test';

test('booking request flow reveals fields and completes successfully', async ({ page }) => {
  await page.route('**/api/booking-request', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message:
          'Your appointment request has been received. We will confirm your booking shortly.',
      }),
    });
  });

  await page.goto('/#booking');

  await expect(page.getByLabel('Your name')).not.toBeVisible();

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const dateValue = futureDate.toISOString().slice(0, 10);

  await page.getByLabel('Preferred date').fill(dateValue);
  await expect(page.getByLabel('Your name')).toBeVisible();

  await page.getByLabel('Your name').fill('Demo Customer');
  await page.getByLabel(/Phone/).fill('+447700900000');
  await page.getByRole('button', { name: 'Submit request' }).click();

  await expect(page.getByRole('heading', { name: 'Request received' })).toBeVisible();
  await expect(page.getByText(/appointment request has been received/i)).toBeVisible();
});
