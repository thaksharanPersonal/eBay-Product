const { test } = require('@playwright/test');
require('dotenv').config();

const { LoginPage } = require('../pages/LoginPage');
const { SearchPage } = require('../pages/SearchPage');
const { ProductPage } = require('../pages/ProductPage');

test('Search and validate similar items secticon in product page', async ({ page, context }) => {

  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);

  await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

  await searchPage.searchFor('Wallet');

  const productTab = await searchPage.openNthResult(1, context);

  const productPage = new ProductPage(productTab);

  await productPage.validateUrlContainsWallet();
  await productPage.validateTitleContainsWallet();
  await productPage.validateSimilarItems();
});