import { test, expect } from '../fixtures/baseTest';
import { SearchResultsPage } from '../pages';

test.describe('demo tests for home page', () => {

    test('user can view listing with matterport view', async ({ homePage, listingPage }) => {
        await homePage.clickFirstMatterportListing();
        await listingPage.waitForLoad();
        await expect(listingPage.locators.launchMatterportTourButton).toBeVisible();
    });


    test('user can see what their home may be worth', async ({ homePage, ownersPage }) => {
        const testAddress = '123 Main St';
        await homePage.clickSeeWhatYourHomeMayBeWorth();
        await ownersPage.waitForLoad();
        await ownersPage.userCanSearchForTheirProperty(testAddress);
        await expect(ownersPage.locators.searchBox).toHaveValue(testAddress);
    });

    test('user can see auction results', async ({ homePage, auctionResultsPage }) => {
        await homePage.clickSeeAuctionResults();
        await auctionResultsPage.waitForLoad(); 
        await expect(auctionResultsPage.locators.auctionResultsMenu).toBeVisible();
    });

    test('user can search for listed property', async ({ homePage, searchResultsPage }) => {
        await homePage.clickSearchForListedProperty('Cordeaux Heights', 'Cordeaux Heights, NSW, 2526');
        await searchResultsPage.waitForLoad();
        await expect(searchResultsPage.locators.listViewButton).toHaveAttribute('data-selected', 'true');
        await expect(searchResultsPage.locators.mapViewButton).toHaveAttribute('data-selected', 'false');
        await expect(searchResultsPage.locators.inspectionsButton).toHaveAttribute('data-selected', 'false');
    
    });

});