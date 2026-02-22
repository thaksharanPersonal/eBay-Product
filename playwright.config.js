require('dotenv').config();

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 60000,
  use: {
    baseURL: process.env.BASE_URL,
    headless: false, // Important: avoid headless for lower detection
    channel: 'chrome', // Use real Chrome
    viewport: null,
    launchOptions: {
      args: ['--disable-blink-features=AutomationControlled']
    }
  }
};

module.exports = config;