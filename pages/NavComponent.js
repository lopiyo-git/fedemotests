import { expect } from '@playwright/test';
import { urlPatterns } from '../config/urlPatterns';

class NavLocators {
    constructor(page) {
        this.homeLogo = page.getByRole('img', { name: 'demo website for practice' });
        this.signUpLoginLink = page.getByRole('link', { name: ' Signup / Login' });
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
    }
}

class NavComponent {
    constructor(page) {
        this.page = page;
        this.locators = new NavLocators(page);
    }

    async goToHome() {
        await this.page.goto('/');
    }

    async waitForLoad() {
        await expect(this.locators.homeLogo).toBeVisible();
    }

     async clickSignUpLogin() {
        await this.locators.signUpLoginLink.click();
        await expect(this.page).toHaveURL(urlPatterns.clickSignupURL);
    }

    async clickDeleteAccount() {
        await this.locators.deleteAccountButton.click();
        await expect(this.page).toHaveURL(urlPatterns.deleteAccountURL);
    }

    async verifyUserIsLoggedIn() {
        await expect(this.locators.logoutButton).toBeVisible();
    }

}

export { NavComponent };