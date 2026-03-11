import { expect } from '@playwright/test';

class SearchResultsPageLocators {
    constructor(page) { 
        this.page = page;
        this.inspectionsButton = page.getByTestId('button-inspection-auction-switch');
        this.listViewButton = page.getByTestId('button-list-switch');
        this.mapViewButton = page.getByTestId('button-map-switch');
        this.summaryText = page.getByTestId('summary').getByText('in Cordeaux Heights, NSW,')
    }
}

export class SearchResultsPage {
    constructor(page) {
        this.page = page;
        this.locators = new SearchResultsPageLocators(page);
    }
    
    async waitForLoad() {
        await expect(this.locators.summaryText).toBeVisible();
    }
}
