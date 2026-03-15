import {expect} from '@playwright/test';
import { urlPatterns } from '../config/urlPatterns';

class HomePageLocators {
    constructor(page) {
        this.categoryHeading = page.getByRole('heading', { name: 'Category' });
        this.featuresItemsHeading = page.getByRole('heading', { name: 'Features Items' });
    }
}

class HomePage {
    constructor(page) {
        this.page = page;
        this.locators = new HomePageLocators(page);
    }

    async waitForLoad() {
        await expect(this.page).toHaveURL(urlPatterns.homeUrl);
        await expect(this.locators.categoryHeading).toBeVisible();
    }
}

export { HomePage };