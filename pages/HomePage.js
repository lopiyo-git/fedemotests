import { expect } from '@playwright/test';

class HomePageLocators {
    constructor(page) {
        this.matterportListingItems = page.getByTestId('matterport-listing-item');
        this.seeWhatYourHomeMayBeWorthLink = page.getByRole('link', { name: 'See what your home may be worth' });
        this.seeAuctionResultsLink = page.getByRole('link', { name: 'See auction results' });
        this.searchBox = page.getByRole('textbox', { name: 'Try a location or a school or' });
        this.suburbPillLabel = page.getByTestId('pill__label');
        this.searchButton = page.getByTestId('search-button');
    }
}

export class HomePage {
    constructor(page) {
        this.page = page;
        this.url = page.url();
        this.locators = new HomePageLocators(page);
    }

    async waitForLoad() {
        await expect(this.locators.matterportListingItems.first()).toBeVisible();
    }

    async navigate() {
        await this.page.goto('/');
    }

    async clickFirstMatterportListing() {
        await this.locators.matterportListingItems.first().click();
    }

    async clickSeeWhatYourHomeMayBeWorth() {
        await this.locators.seeWhatYourHomeMayBeWorthLink.scrollIntoViewIfNeeded();
        await this.locators.seeWhatYourHomeMayBeWorthLink.click();
    }

    async clickSeeAuctionResults() {
        await this.locators.seeAuctionResultsLink.scrollIntoViewIfNeeded();
        await this.locators.seeAuctionResultsLink.click();
    }

    /**
     * @param {string} suburbName - suburb name e.g Cordeaux Heights
     * @param {string} fullSuburbName - full suburb name as seen in drop down option e.g Cordeaux Heights, NSW, 2526
     */
    async clickSearchForListedProperty(suburbName, fullSuburbName) { 
        await this.locators.searchBox.fill(suburbName);
        await this.locators.searchBox.click();
        await this.page.getByText(fullSuburbName).click();
        await expect(this.locators.suburbPillLabel).toBeVisible();
        await this.locators.searchButton.click();
    }
}