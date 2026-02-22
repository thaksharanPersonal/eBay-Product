const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { login } = require('./login');

test('Search and open third result', async ({ page, context }) => {

  await login(page);

  await expect(
    page.locator('#gh-ac[placeholder="Search for anything"]')
  ).toBeVisible();

  await page.type('#gh-ac', 'Wallet', { delay: 100 });

  const searchButton = page.locator('.gh-search-button__label');

  await Promise.all([
    page.waitForURL('**/sch/**'),
    searchButton.click()
  ]);

  const results = page.locator(
    'ul.srp-results.srp-grid.clearfix > li.s-card.s-card--vertical'
  );

  await results.first().waitFor({ state: 'visible' });

  const count = await results.count();
  expect(count).toBeGreaterThan(2);

  const thirdResult = results.nth(2);

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    thirdResult.click()
  ]);

  await newPage.waitForLoadState('domcontentloaded');

});