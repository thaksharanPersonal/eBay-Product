class SearchPage {
    constructor(page) {
      this.page = page;
      this.searchInput = page.locator('#gh-ac');
      this.searchButton = page.locator('.gh-search-button__label');
      this.results = page.locator(
        'ul.srp-results.srp-grid.clearfix > li.s-card.s-card--vertical'
      );
    }
  
    async searchFor(term) {
      await this.searchInput.waitFor({ state: 'visible' });
      await this.searchInput.type(term, { delay: 100 });
      await this.searchButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    }
  
    async openNthResult(n, context) {
      await this.results.first().waitFor({ state: 'visible' });
  
      const resultLink = this.results.nth(n).locator('a').first();
  
      const newPagePromise = context.waitForEvent('page').catch(() => null);
      await resultLink.click();
  
      const newPage = await Promise.race([
        newPagePromise,
        this.page.waitForNavigation().then(() => this.page)
      ]);
  
      return newPage || this.page;
    }
  }
  
  module.exports = { SearchPage };