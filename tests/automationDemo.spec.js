import { test, expect } from "../fixtures/baseTest";

test.describe("demo tests for automation exercises website", () => {
  test("Complete checkout flow for authenticated user", async ({
    navigateToHomePage: _navigation,
    pages,
  }) => {
    const {
      nav,
      home,
      login,
      cart,
      checkout,
      payment,
      orderPlaced,
      userData,
      paymentData,
    } = pages;
    const { validUser } = userData;

    //user signed up via api and account deleted via api
    await nav.clickSignUpLogin();
    await login.waitForLoad();
    await login.login(validUser.email, validUser.password);
    await home.waitForLoad();
    await nav.verifyUserIsLoggedIn();
    await home.addProductToCart("Blue Top");
    await home.addProductToCart("Men Tshirt");
    await nav.navigateToCart();
    await cart.waitForCartToLoadWithItems();
    await cart.proceedToCheckout();
    await checkout.waitForLoad();
    await checkout.placeOrder();
    await payment.waitForLoad();
    await payment.enterPaymentDetails(paymentData.visaData);
    await payment.confirmPayment();
    await orderPlaced.waitForLoad();
    await orderPlaced.clickContinue();
    await home.waitForLoad();
    await nav.verifyUserIsLoggedIn();
    await expect(home.locators.featuresItemsHeading).toBeVisible();
  });

  test(
    "Full user registration and account deletion journey",
    { tag: "@skipApiAuth" },
    async ({ navigateToHomePage: _navigation, pages }) => {
      const {
        nav,
        home,
        login,
        signup,
        accountCreated,
        deleteAccount,
        userData,
      } = pages;

      const { validUser } = userData;

      await nav.clickSignUpLogin();
      await login.waitForLoad();
      await login.signUp(
        `${validUser.firstName} ${validUser.lastName}`,
        validUser.email,
      );
      await signup.waitForLoad();
      await signup.enterSignUpInformation(validUser);
      await signup.clickCreateAccount();
      await accountCreated.waitForLoad();
      await accountCreated.clickContinue();
      await nav.verifyUserIsLoggedIn();
      await nav.clickDeleteAccount();
      await deleteAccount.waitForLoad();
      await deleteAccount.verifyAccountIsDeleted();
      await deleteAccount.clickContinue();
      await home.waitForLoad();
      await expect(nav.locators.signUpLoginLink).toBeVisible();
      await expect(home.locators.featuresItemsHeading).toBeVisible();
    },
  );
});
