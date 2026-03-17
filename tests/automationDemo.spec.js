import { test, expect } from "../fixtures/baseTest";

test.describe("demo tests for automation exercises website", () => {
  test("Complete checkout flow for authenticated user", async ({
    navigateToHomePage: _navigation,
    navComponent,
    loginPage,
    homePage,
    viewCartPage,
    checkoutPage,
    paymentPage,
    orderPlacedPage,
    userData,
    paymentData,
  }) => {
    const { validUser } = userData;

    //user signed up via api and account deleted via api
    await navComponent.clickSignUpLogin();
    await loginPage.waitForLoad();
    await loginPage.login(validUser.email, validUser.password);
    await homePage.waitForLoad();
    await navComponent.verifyUserIsLoggedIn();
    await homePage.addProductToCart("Blue Top");
    await homePage.addProductToCart("Men Tshirt");
    await navComponent.navigateToCart();
    await viewCartPage.waitForCartToLoadWithItems();
    await viewCartPage.proceedToCheckout();
    await checkoutPage.waitForLoad();
    await checkoutPage.placeOrder();
    await paymentPage.waitForLoad();
    await paymentPage.enterPaymentDetails(paymentData.visaData);
    await paymentPage.confirmPayment();
    await orderPlacedPage.waitForLoad();
    await orderPlacedPage.clickContinue();
    await homePage.waitForLoad();
    await navComponent.verifyUserIsLoggedIn();
    await expect(homePage.locators.featuresItemsHeading).toBeVisible();
  });

  test(
    "Full user registration and account deletion journey",
    { tag: "@skipApiAuth" },
    async ({
      navigateToHomePage: _navigation,
      homePage,
      navComponent,
      loginPage,
      signupPage,
      accountCreatedPage,
      deleteAccountPage,
      userData,
    }) => {
      const { validUser } = userData;

      await navComponent.clickSignUpLogin();
      await loginPage.waitForLoad();
      await loginPage.signUp(
        `${validUser.firstName} ${validUser.lastName}`,
        validUser.email,
      );
      await signupPage.waitForLoad();
      await signupPage.enterSignUpInformation(userData.validUser);
      await signupPage.clickCreateAccount();
      await accountCreatedPage.waitForLoad();
      await accountCreatedPage.clickContinue();
      await navComponent.verifyUserIsLoggedIn();
      await navComponent.clickDeleteAccount();
      await deleteAccountPage.waitForLoad();
      await deleteAccountPage.verifyAccountIsDeleted();
      await deleteAccountPage.clickContinue();
      await homePage.waitForLoad();
      await expect(navComponent.locators.signUpLoginLink).toBeVisible();
      await expect(homePage.locators.featuresItemsHeading).toBeVisible();
    },
  );
});
