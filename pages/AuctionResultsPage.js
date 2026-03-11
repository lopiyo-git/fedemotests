import { expect } from '@playwright/test';
import { urlPatterns } from '../config/urlPatterns';

class AuctionResultsLocators {
    constructor(page) {
        this.page = page;
        this.auctionResultsHeading = page.getByRole('heading', { name: 'Auction Results' });
        this.auctionResultsMenu = page.getByRole('button', { name: 'open menu' });
    }
}

export class AuctionResultsPage {
    constructor(page) {
        this.page = page;
        this.locators = new AuctionResultsLocators(page);
    }
    
    async waitForLoad() {
        await expect(this.locators.auctionResultsHeading).toBeVisible();
        await expect(this.page).toHaveURL(urlPatterns.auctionResults);
    }   
}
