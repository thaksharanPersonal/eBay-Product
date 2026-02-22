const { test, expect } = require('@playwright/test');
require('dotenv').config();

async function waitForPageStable(page) {
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
}

test('eBay Login Flow', async ({ page }) => {

  await page.goto('/');
  await page.waitForTimeout(1500);
  
  const signInLink = page.getByRole('link', { name: 'Sign in' });

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    signInLink.click()
  ]);

  await page.waitForSelector('#userid', { state: 'visible' });

  await page.waitForFunction(() => {
    const el = document.querySelector('#userid');
    return el && !el.disabled && el.offsetParent !== null;
  });

  await page.type('#userid', process.env.USERNAME, { delay: 100 });

  await Promise.all([
    page.waitForSelector('#pass', { state: 'visible' }),
    page.click('#signin-continue-btn')
  ]);

  await page.waitForLoadState('networkidle');

  await page.waitForFunction(() => {
    const el = document.querySelector('#pass');
    return el && !el.disabled && el.offsetParent !== null;
  });

  await page.type('#pass', process.env.PASSWORD, { delay: 100 });

  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.click('#sgnBt')
  ]);

  const skipLink = page.getByRole('link', { name: 'Skip for now' });

  if (await skipLink.isVisible().catch(() => false)) {
    await Promise.all([
      page.waitForLoadState('networkidle'),
      skipLink.click()
    ]);
  }

  await expect(page.locator('.gh-identity__greeting')).toBeVisible();

});