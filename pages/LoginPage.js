const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.usernameInput = page.locator('#userid');
    this.continueButton = page.locator('#signin-continue-btn');
    this.passwordInput = page.locator('#pass');
    this.signInButton = page.locator('#sgnBt');
    this.greeting = page.locator('.gh-identity__greeting');
  }

  async login(username, password) {
    await this.page.goto('/');

    await Promise.all([
      this.page.waitForNavigation(),
      this.signInLink.click()
    ]);

    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.type(username, { delay: 100 });

    await this.continueButton.click();

    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.type(password, { delay: 100 });

    await this.signInButton.click();

    const skipLink = this.page.getByRole('link', { name: 'Skip for now' });

    if (await skipLink.isVisible().catch(() => false)) {
      await skipLink.click();
    }

    await expect(this.greeting).toBeVisible();
  }
}

module.exports = { LoginPage };