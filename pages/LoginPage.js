import { expect } from '@playwright/test';
import { urlPatterns } from '../config/urlPatterns';

class LoginPageLocators {
    constructor(page) {
        this.signUpName = page.getByRole('textbox', { name: 'Name' })
        this.signUpEmail = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = page.getByRole('button', { name: 'Signup' });
        this.categoryHeading = page.getByRole('heading', { name: 'Category' })
        this.featureItemsHeading = page.getByRole('heading', { name: 'Features Items' });
    }
}

class LoginPage {
    constructor(page) {
        this.page = page;   
        this.locators = new LoginPageLocators(page);
    }

    async waitForLoad() {
        await expect(this.page).toHaveURL(urlPatterns.loginUrl);
        await expect(this.locators.signUpButton).toBeVisible();
    }

    async signUp(name, email) {
        await this.locators.signUpName.fill(name);
        await this.locators.signUpEmail.fill(email);
        await this.locators.signUpButton.click();
    }

}

export { LoginPage};