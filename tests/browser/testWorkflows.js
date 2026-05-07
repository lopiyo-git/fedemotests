import { expect } from "../../fixtures/baseTest";

/**
 * Test workflows for browser E2E tests.
 * Contains reusable multi-step user journeys (login, signup, checkout, etc.).
 *
 * Scope: tests/browser/ only — do not import in API tests.
 * Purpose: Reduce code duplication by encapsulating common workflows.
 */

/**
 * Performs complete login flow for an authenticated user
 * @param {Object} login - Login page object
 * @param {Object} home - Home page object
 * @param {Object} nav - Navigation component
 * @param {Object} validUser - User credentials with email and password
 */
export async function loginAsUser(login, home, nav, validUser) {
  await nav.clickSignUpLogin();
  await login.waitForLoad();
  await login.login(validUser.email, validUser.password);
  await home.waitForLoad();
  await nav.verifyUserIsLoggedIn();
}

/**
 * Verifies home page has loaded and features items are visible
 * @param {Object} home - Home page object
 */
export async function verifyHomePageLoaded(home) {
  await home.waitForLoad();
  await expect(home.locators.featuresItemsHeading).toBeVisible();
}

/**
 * Performs complete sign up flow for a new user
 * @param {Object} login - Login page object
 * @param {Object} nav - Navigation component
 * @param {Object} signup - Signup page object
 * @param {Object} validUser - User data with firstName, lastName, email, etc.
 */
export async function signUpNewUser(login, nav, signup, validUser) {
  await nav.clickSignUpLogin();
  await login.waitForLoad();
  await login.signUp(
    `${validUser.firstName} ${validUser.lastName}`,
    validUser.email,
  );
  await signup.waitForLoad();
  await signup.enterSignUpInformation(validUser);
  await signup.clickCreateAccount();
}

/**
 * Adds multiple products to cart
 * @param {Object} home - Home page object
 * @param {Array<string>} products - Array of product names to add
 */
export async function addProductsToCart(home, products) {
  for (const product of products) {
    await home.addProductToCart(product);
  }
}
