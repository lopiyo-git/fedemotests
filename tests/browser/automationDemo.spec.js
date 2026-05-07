import { test, expect } from "../../fixtures/baseTest";
import {
  loginAsUser,
  verifyHomePageLoaded,
  signUpNewUser,
  addProductsToCart,
} from "./testWorkflows";

test.describe("demo tests for automation exercises website", () => {
  test.beforeAll(async ({}) => {
    console.log("Running setup before all tests in this suite");
  });
  test("Complete checkout flow for authenticated user", async ({
    navigateToHomePage: _navigation,
    fixtures,
  }) => {
    const {
      nav,
      home,
      login,
      cart,
      checkout,
      payment,
      orderPlaced,
      userData: { validUser },
      paymentData,
    } = fixtures;

    await loginAsUser(login, home, nav, validUser);
    await addProductsToCart(home, ["Blue Top", "Men Tshirt"]);
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
    await verifyHomePageLoaded(home);
  });

  test(
    "Full user registration and account deletion journey",
    { tag: ["@skipUserRegistration", "@smoke"] },
    async ({ navigateToHomePage: _navigation, fixtures }) => {
      const {
        nav,
        home,
        login,
        signup,
        accountCreated,
        deleteAccount,
        userData: { validUser },
      } = fixtures;

      await signUpNewUser(login, nav, signup, validUser);
      await accountCreated.waitForLoad();
      await accountCreated.clickContinue();
      await nav.verifyUserIsLoggedIn();
      await nav.clickDeleteAccount();
      await deleteAccount.waitForLoad();
      await deleteAccount.verifyAccountIsDeleted();
      await deleteAccount.clickContinue();
      await home.waitForLoad();
      await expect(nav.locators.signUpLoginLink).toBeVisible();
      await verifyHomePageLoaded(home);
    },
  );

  test("Contact us form submission", async ({
    navigateToHomePage: _navigation,
    fixtures,
  }) => {
    const {
      nav,
      home,
      login,
      contactUs,
      userData: { validUser },
    } = fixtures;

    await loginAsUser(login, home, nav, validUser);
    await nav.navigateToContactUs();
    await contactUs.waitForLoad();
    await contactUs.fillContactForm({
      name: "Tests",
      email: "test@example.com",
      subject: "Subject",
      message: "test message",
      filePath: "testData/files/submit.txt",
    });
    await contactUs.submitForm();
    await expect(contactUs.locators.successMessage).toBeVisible();
  });
});
