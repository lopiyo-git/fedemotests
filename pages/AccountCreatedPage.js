import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class AccountCreatedPageLocators {
  constructor(page) {
    this.page = page;
    this.accountCreatedMessage = this.page.getByText("Account Created!");
    this.continueLink = this.page.getByRole("link", { name: "Continue" });
  }
}

class AccountCreatedPage {
  constructor(page) {
    this.page = page;
    this.locators = new AccountCreatedPageLocators(page);
  }

  async waitForLoad() {
    await expect(this.page).toHaveURL(urlPatterns.accountCreatedUrl);
    await expect(this.locators.accountCreatedMessage).toBeVisible();
  }

  async clickContinue() {
    await this.locators.continueLink.click();
  }
}

export { AccountCreatedPage };
