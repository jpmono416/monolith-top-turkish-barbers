import { test, expect, type Page } from '@playwright/test';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

async function selectBookingDate(page: Page, day: number, monthName: string) {
  await page.locator('#booking-day').getByRole('option', { name: String(day), exact: true }).click();
  await page.locator('#booking-month').getByRole('option', { name: monthName, exact: true }).click();
}

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
  const monthName = MONTH_NAMES[futureDate.getMonth()] as (typeof MONTH_NAMES)[number];

  await selectBookingDate(page, futureDate.getDate(), monthName);
  await expect(page.getByLabel('Your name')).toBeVisible();

  await page.getByLabel('Your name').fill('Demo Customer');
  await page.getByLabel(/Phone/).fill('+447700900000');
  await page.getByRole('button', { name: 'Submit request' }).click();

  await expect(page.getByRole('heading', { name: 'Request received' })).toBeVisible();
  await expect(page.getByText(/appointment request has been received/i)).toBeVisible();
});
