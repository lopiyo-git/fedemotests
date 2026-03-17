import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class NavLocators {
  constructor(page) {
    this.page = page;
    this.homeLogo = this.page.getByRole("img", {
      name: "demo website for practice",
    });
    this.signUpLoginLink = this.page.getByRole("link", {
      name: /Signup \/ Login/,
    });
    this.logoutButton = this.page.getByRole("link", { name: "Logout" });
    this.deleteAccountButton = this.page.getByRole("link", {
      name: "Delete Account",
    });
    this.cartLink = this.page.getByRole("link", { name: /Cart/ });
  }
}

class NavComponent {
  constructor(page) {
    this.page = page;
    this.locators = new NavLocators(page);
  }

  async waitForLoad() {
    await expect(this.locators.homeLogo).toBeVisible();
  }

  async clickSignUpLogin() {
    await this.locators.signUpLoginLink.click();
    await expect(this.page).toHaveURL(urlPatterns.loginUrl);
  }

  async clickDeleteAccount() {
    await this.locators.deleteAccountButton.click();
    await expect(this.page).toHaveURL(urlPatterns.deleteAccountUrl);
  }

  async verifyUserIsLoggedIn() {
    await expect(this.locators.logoutButton).toBeVisible();
  }

  async navigateToCart() {
    await this.locators.cartLink.click();
    await expect(this.page).toHaveURL(urlPatterns.cartUrl);
  }
}

export { NavComponent };
