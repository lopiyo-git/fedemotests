import { test, expect } from '../fixtures/baseTest';
import { users } from '../testData/users';

test.describe('demo tests for automation exercises website', () => { 
    test('register new user then delete account', async ({ homePage, navComponent, loginPage, signupPage, accountCreatedPage, deleteAccountPage }) => {
        await navComponent.clickSignUpLogin();
        await loginPage.waitForLoad();
        await loginPage.signUp(users.validUser.name, users.validUser.email);
        await signupPage.waitForLoad();
        await signupPage.enterSignUpInformation(users.validUser);
        await signupPage.clickCreateAccount();
        await accountCreatedPage.waitForLoad();
        await accountCreatedPage.clickContinue();
        await navComponent.verifyUserIsLoggedIn();
        await navComponent.clickDeleteAccount();
        await deleteAccountPage.waitForLoad();
        await deleteAccountPage.clickContinue();
        await homePage.waitForLoad
        await expect(navComponent.locators.signUpLoginLink).toBeVisible();
        await expect(homePage.locators.featuresItemsHeading).toBeVisible();
    });


});