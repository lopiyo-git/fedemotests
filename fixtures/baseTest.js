// fixtures/baseTest.js
import { test as base, expect } from '@playwright/test';
import * as Pages from '../pages/';
import { blockAds } from '../utils/blockAds';

export const test = base.extend({

    // Override built-in page fixture to block ads globally
    page: async ({ page }, use) => {
        await blockAds(page);
        await use(page);
    },

    /** @type {NavComponent} */
    navComponent: async ({ page }, use) => {
        await page.goto('/');
        const navComponent = new Pages.NavComponent(page);
        await navComponent.waitForLoad();
        await use(navComponent);
    },

    /** @type {HomePage} */
    homePage: async ({ page }, use) => {
        await page.goto('/');
        const homePage = new Pages.HomePage(page);
        await homePage.waitForLoad();
        await use(homePage);
    },

    /** @type {LoginPage} */
    loginPage: async ({ page }, use) => {
        const loginPage = new Pages.LoginPage(page);
        await use(loginPage);
    },

    /** @type {SignupPage} */
    signupPage: async ({ page }, use) => {
        const signupPage = new Pages.SignupPage(page);
        await use(signupPage);
    },

    /** @type {AccountCreatedPage} */
    accountCreatedPage: async ({ page }, use) => {
        const accountCreatedPage = new Pages.AccountCreatedPage(page);
        await use(accountCreatedPage);
    },

    /** @type {DeleteAccountPage} */
    deleteAccountPage: async ({ page }, use) => {
        const deleteAccountPage = new Pages.DeleteAccountPage(page);
        await use(deleteAccountPage);
    },

});

export { expect };