import { expect } from '@playwright/test';
import { urlPatterns } from '../config/urlPatterns';

class DeleteAccountPageLocators {
    constructor(page) {
        this.deleteAccountButton = page.getByText('Account Deleted!');
        this.continueLink = page.getByRole('link', { name: 'Continue' });
    }
}

class DeleteAccountPage {
    constructor(page) {
        this.page = page;
        this.locators = new DeleteAccountPageLocators(page);
    }

    async waitForLoad() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(urlPatterns.deleteAccountURL);
        await expect(this.locators.deleteAccountButton).toBeVisible();
    }

     async clickContinue() {
            await this.locators.continueLink.click();
        }
}

export { DeleteAccountPage };