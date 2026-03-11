
import { expect } from '@playwright/test';
import { urlPatterns } from '../config/urlPatterns';


class OwnersPageLocators {
    constructor(page) {
        this.heroSectionHeading = page.getByTestId('hero-section').getByRole('heading', { name: 'Domain for Owners' });
        this.searchBox = page.getByRole('searchbox', { name: 'Full address (eg, 292 Harris' })

    }
}

export class OwnersPage {
    constructor(page) {
        this.page = page;
        this.locators = new OwnersPageLocators(page);
     }

     async waitForLoad() {
         await expect(this.locators.heroSectionHeading).toBeVisible();
         await expect(this.page).toHaveURL(urlPatterns.owners);
     }

     async userCanSearchForTheirProperty(address) {
        await this.locators.searchBox.fill(address);
     }
}