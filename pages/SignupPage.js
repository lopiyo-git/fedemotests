import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class SignupPageLocators {
  constructor(page) {
    this.signUpName = page.getByRole("textbox", {
      name: "Name *",
      exact: true,
    });
    this.signUpEmail = page.getByRole("textbox", {
      name: "Email *",
      exact: true,
    });
    this.password = page.getByRole("textbox", { name: "Password *" });
    this.firstName = page.getByRole("textbox", { name: "First name *" });
    this.lastName = page.getByRole("textbox", { name: "Last name *" });
    this.address = page.getByRole("textbox", {
      name: "Address * (Street address, P.",
    });
    this.country = page.getByLabel("Country");
    this.state = page.getByRole("textbox", { name: "State *" });
    this.city = page.getByRole("textbox", { name: "City *" });
    this.zipcode = page.locator("#zipcode");
    this.mobileNumber = page.getByRole("textbox", { name: "Mobile Number *" });
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
  }
}

class SignupPage {
  constructor(page) {
    this.page = page;
    this.locators = new SignupPageLocators(page);
  }
  async waitForLoad() {
    await expect(this.page).toHaveURL(urlPatterns.signupUrl);
    await expect(this.locators.signUpName).toBeVisible();
    await expect(this.locators.signUpEmail).toBeVisible();
  }

  async scrollAndFill(locator, value) {
    await locator.scrollIntoViewIfNeeded();
    await locator.fill(value);
  }

  async enterSignUpInformation(users) {
    await this.locators.password.fill(users.password);
    await this.locators.firstName.fill(users.firstName);
    await this.locators.lastName.fill(users.lastName);
    await this.locators.address.fill(users.address);
    await this.locators.country.selectOption({ label: users.country });
    await this.scrollAndFill(this.locators.state, users.state);
    await this.scrollAndFill(this.locators.city, users.city);
    await this.scrollAndFill(this.locators.zipcode, users.zipcode);
    await this.scrollAndFill(this.locators.mobileNumber, users.mobileNumber);
  }

  async clickCreateAccount() {
    await this.locators.createAccountButton.click();
  }
}

export { SignupPage };
