import { expect } from '@playwright/test';

class ListingPageLocators {
    constructor(page) {
        this.launchMatterportTourButton = page.getByRole('button', { name: 'Launch Matterport 3D Tour' });
        this.agentName = page.getByTestId('listing-details__agent-details-agent-name');
    }
}

export class ListingPage {
    constructor(page) {
        this.page = page;
        this.url = page.url();
        this.locators = new ListingPageLocators(page);
    }
    
    async waitForLoad() {
        await expect(this.page).toHaveURL(/\/([a-zA-Z0-9-]+)$/);
        await expect(this.locators.agentName).toBeVisible();
    }
}