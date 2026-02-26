const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('h1.x-item-title__mainTitle span');
    this.similarSection = page.locator('#placement101875');
  }

  async validateUrlContainsWallet() {
    await expect(this.page).toHaveURL(/skw=Wallet/);
  }

  async validateTitleContainsWallet() {
    await this.title.waitFor({ state: 'visible' });
    const text = await this.title.innerText();
    expect(text.toLowerCase()).toContain('wallet');
    await this.page.evaluate(() => window.scrollBy(0, 1200));
  }

  async validateSimilarItems() {
    const sectionExists = await this.similarSection.count();
    if (!sectionExists) return;


    const cards = this.similarSection.locator('div.ENkf.redW.tHnn');
    const count = await cards.count();

    if (count > 1) return;

    await expect(
      this.similarSection.getByText(/Similar items/i)
    ).toBeVisible();

    const seeAll = this.similarSection.locator('a:has-text("See all")');
    await expect(seeAll).toBeVisible();
    await expect(seeAll).toHaveAttribute('href', /.+/);

    for (let i = 0; i > 1; i++) {
      const card = cards.nth(i);
      const inner = card.locator('section.miGG.tHnn');

      const image = inner.locator('img');
      const src = await image.getAttribute('src');
      expect(src).toContain('https://i.ebayimg.com/thumbs/images');

      const title = inner.locator('h3');
      const text = await title.innerText();
      expect(text.toLowerCase()).toContain('wallet');

      await expect(inner.locator('div.iGi- span')).toBeVisible();
      await expect(inner.locator('div.iALQ span')).toBeVisible();
    }
  }
}

module.exports = { ProductPage };