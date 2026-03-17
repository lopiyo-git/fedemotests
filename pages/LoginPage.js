import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class LoginPageLocators {
  constructor(page) {
    this.page = page;
    this.signUpName = this.page.getByRole("textbox", { name: "Name" });
    this.signUpEmail = this.page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address");
    this.signUpButton = this.page.getByRole("button", { name: "Signup" });
    this.loginEmail = this.page
      .locator("form")
      .filter({ hasText: "Login" })
      .getByPlaceholder("Email Address");
    this.loginPassword = this.page.getByRole("textbox", { name: "Password" });
    this.loginButton = this.page.getByRole("button", { name: "Login" });
  }
}

class LoginPage {
  constructor(page) {
    this.page = page;
    this.locators = new LoginPageLocators(page);
  }

  async waitForLoad() {
    await expect(this.page).toHaveURL(urlPatterns.loginUrl);
    await expect(this.locators.signUpButton).toBeVisible();
  }

  async signUp(name, email) {
    await this.locators.signUpName.fill(name);
    await this.locators.signUpEmail.fill(email);
    await this.locators.signUpButton.click();
  }

  async login(email, password) {
    await this.locators.loginEmail.fill(email);
    await this.locators.loginPassword.fill(password);
    await this.locators.loginButton.click();
  }
}

export { LoginPage };
