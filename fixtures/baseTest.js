// fixtures/baseTest.js
import { test as base, expect } from '@playwright/test';
import * as Pages from '../pages/'; // Import your POM

export const test = base.extend({
    /* Define fixtures for each page object. These will be available in your tests as arguments. */

    /** @type {NavComponent} */
    navComponent: async ({ page }, use) => {
          // Block common ad domains
      await page.route('**/*', (route) => {
        const blockedDomains = [
            'googlesyndication.com',
            'doubleclick.net',
            'googletagmanager.com',
            'google-analytics.com',
            'adservice.google.com',
            'amazon-adsystem.com',
            'pagead2.googlesyndication.com',
            'static.doubleclick.net',
        ];
        const url = route.request().url();
        if (blockedDomains.some(domain => url.includes(domain))) {
            route.abort();
        } else {
            route.continue();
        }
    });
        await page.goto('/'); // Navigate to the home page before creating the NavComponent
        const navComponent = new Pages.NavComponent(page);
        // Guard: ensure nav component is loaded before using it in tests
        await navComponent.waitForLoad();
        await use(navComponent);
    },

    /** @type {HomePage} */

    homePage: async ({ page }, use) => {
        const homePage = new Pages.HomePage(page);
        // Note: we don't navigate to the sign up/login page directly, 
        // Instead, we rely on the test to navigate to the sign up/login page (e.g. by clicking a link on the nav component),
        //  and then we just wait for it to load.
        await use(homePage);
    },

    /** @type {SignupPage} */
    signupPage: async ({ page }, use) => {
        const signupPage = new Pages.SignupPage(page);
        // Note: we don't navigate to the sign up/login page directly, 
        // Instead, we rely on the test to navigate to the sign up/login page (e.g. by clicking a link on the nav component),
        //  and then we just wait for it to load.
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

export { expect }; // Export expect so your tests don't have to import it from playwright