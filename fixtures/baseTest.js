// fixtures/baseTest.js
import { test as base, expect } from '@playwright/test';
import * as Pages from '../pages/'; // Import your POM

export const test = base.extend({
    /** @type {HomePage} */
  homePage: async ({ page }, use) => {
    const homePage = new Pages.HomePage(page);
    await homePage.navigate();
    // Guard: ensure page is loaded
    await homePage.waitForLoad();
    await use(homePage);
  },
  /** @type {ListingPage} */
  listingPage: async ({ page }, use) => {
    const listingPage = new Pages.ListingPage(page);
        // Note: we don't navigate to the listing page directly, 
        // Instead, we rely on the test to navigate to the listing page (e.g. by clicking a link on the home page),
        //  and then we just wait for it to load.
    await use(listingPage);
  },
  /** @type {OwnersPage} */
  ownersPage: async ({ page }, use) => {
    const ownersPage = new Pages.OwnersPage(page);
    await use(ownersPage);
  },
  /** @type {AuctionResultsPage} */
  auctionResultsPage: async ({ page }, use) => {
    const auctionResultsPage = new Pages.AuctionResultsPage(page);
    await use(auctionResultsPage);
  },
  /** @type {SearchResultsPage} */
  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new Pages.SearchResultsPage(page);
    await use(searchResultsPage);
  },

});

export { expect }; // Export expect so your tests don't have to import it from playwright