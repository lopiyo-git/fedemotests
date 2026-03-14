import { test, expect } from '../fixtures/baseTest';
import { users } from '../testData/users';

test.describe('demo tests for automation exercises website', () => { 
    test('register new user then delete account', async ({ navComponent , homePage, signupPage, accountCreatedPage, deleteAccountPage }) => {
        await navComponent.clickSignUpLogin();
        await homePage.waitForLoad();
        await homePage.signUp(users.validUser.name, users.validUser.email);
        await signupPage.waitForLoad();
        await signupPage.enterSignUpInformation(users.validUser);
        await signupPage.clickCreateAccount();
        await accountCreatedPage.waitForLoad();
        await accountCreatedPage.clickContinue();
        await navComponent.verifyUserIsLoggedIn();
        await navComponent.clickDeleteAccount();
        await deleteAccountPage.waitForLoad();
        await deleteAccountPage.clickContinue();
        await expect(navComponent.locators.signUpLoginLink).toBeVisible();
        await expect(homePage.locators.categoryHeading).toBeVisible();
    });


});