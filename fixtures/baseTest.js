import { test as base, expect } from "@playwright/test";
import * as Pages from "../pages/";
import { blockAds } from "../utils/blockAds";
import { ApiAuthHelper } from "../utils/ApiAuthHelper";
import { users } from "../testData/users";
import { paymentInfo } from "../testData/paymentInfo";

export const test = base.extend({
  // Test Data Fixtures
  /** @type {import('../testData/users').users} */
  userData: async ({}, use) => {
    await use(users);
  },
  /** @type { paymentInfo} */
  paymentData: async ({}, use) => {
    await use(paymentInfo);
  },

  // Setup & Teardown via API if test requires a registered user, otherwise skip API auth setup
  registeredUser: [
    async ({ request }, use, testInfo) => {
      // Check if the test has the @skipApiAuth tag
      const shouldSkip =
        testInfo.project.metadata?.skipApiAuth ||
        testInfo.tags.includes("@skipApiAuth");

      if (shouldSkip) {
        // Provide a null or empty object so the test doesn't break if it asks for the fixture
        await use(null);
        return;
      }

      const apiAuth = new ApiAuthHelper(request);
      // Clean up any leftover user from a previous failed run
      await apiAuth
        .deleteUserViaApi(users.validUser.email, users.validUser.password)
        .catch((e) => console.warn("Pre-test cleanup skipped:", e.message)); // silently ignore if user doesn't exist
      // Perform any necessary setup for API authentication here, such as logging in and storing tokens
      await apiAuth.createUserViaApi(users.validUser);
      await use(apiAuth);
      // Perform any necessary cleanup after tests, such as deleting test users
      await apiAuth
        .deleteUserViaApi(users.validUser.email, users.validUser.password)
        .catch((e) => console.warn("Post-test cleanup failed:", e.message));
    },
    { auto: true },
  ], //This makes it run automatically in tests

  //an API to handle user creation and deletion via API, can be used directly in tests if needed for more complex scenarios
  // or to avoid the overhead of the full registeredUser fixture setup/teardown when not necessary.
  apiUser: async ({ request }, use) => {
    const apiAuth = new ApiAuthHelper(request);
    await use(apiAuth);
  },

  // Override built-in page fixture to block ads globally
  page: async ({ page }, use) => {
    await blockAds(page);
    await use(page);
  },

  // Navigate to home and wait for page to be ready
  navigateToHomePage: async ({ page }, use) => {
    await page.goto("/");
    await use(page);
  },

  /** @type {NavComponent} */
  navComponent: async ({ page }, use) => {
    await use(new Pages.NavComponent(page));
  },

  /** @type {HomePage} */
  homePage: async ({ page }, use) => {
    await use(new Pages.HomePage(page));
  },

  /** @type {LoginPage} */
  loginPage: async ({ page }, use) => {
    await use(new Pages.LoginPage(page));
  },

  /** @type {SignupPage} */
  signupPage: async ({ page }, use) => {
    await use(new Pages.SignupPage(page));
  },

  /** @type {AccountCreatedPage} */
  accountCreatedPage: async ({ page }, use) => {
    await use(new Pages.AccountCreatedPage(page));
  },

  /** @type {DeleteAccountPage} */
  deleteAccountPage: async ({ page }, use) => {
    await use(new Pages.DeleteAccountPage(page));
  },

  /** @type {Pages.ViewCartPage} */
  viewCartPage: async ({ page }, use) => {
    await use(new Pages.ViewCartPage(page));
  },

  /** @type {CheckoutPage} */
  checkoutPage: async ({ page }, use) => {
    await use(new Pages.CheckoutPage(page));
  },

  /** @type {PaymentPage} */
  paymentPage: async ({ page }, use) => {
    await use(new Pages.PaymentPage(page));
  },

  /** @type {OrderPlacedPage} */
  orderPlacedPage: async ({ page }, use) => {
    await use(new Pages.OrderPlacedPage(page));
  },

  /**
   * Bundled fixture — all page objects and test data in one place.
   * Keeps test signatures concise without losing individual fixture reusability.
   *
   * @type {{
   *   nav: NavComponent,
   *   home: HomePage,
   *   login: LoginPage,
   *   signup: SignupPage,
   *   accountCreated: AccountCreatedPage,
   *   deleteAccount: DeleteAccountPage,
   *   cart: Pages.ViewCartPage,
   *   checkout: CheckoutPage,
   *   payment: PaymentPage,
   *   orderPlaced: OrderPlacedPage,
   *   userData: import('../testData/users').users,
   *   paymentData: paymentInfo,
   * }}
   */
  fixtures: async (
    {
      registeredUser,
      apiUser,
      page,
      navComponent,
      homePage,
      loginPage,
      signupPage,
      accountCreatedPage,
      deleteAccountPage,
      viewCartPage,
      checkoutPage,
      paymentPage,
      orderPlacedPage,
      userData,
      paymentData,
    },
    use,
  ) => {
    await use({
      apiUser: apiUser,
      registeredUser: registeredUser,
      nav: navComponent,
      home: homePage,
      login: loginPage,
      signup: signupPage,
      accountCreated: accountCreatedPage,
      deleteAccount: deleteAccountPage,
      cart: viewCartPage,
      checkout: checkoutPage,
      payment: paymentPage,
      orderPlaced: orderPlacedPage,
      userData,
      paymentData,
    });
  },
});

export { expect };
