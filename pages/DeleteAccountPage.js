import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class DeleteAccountPageLocators {
  constructor(page) {
    this.page = page;
    this.continueLink = this.page.getByRole("link", { name: "Continue" });
    this.accountDeletedText = this.page.getByText(
      "Account Deleted! Your account",
    );
  }
}

class DeleteAccountPage {
  constructor(page) {
    this.page = page;
    this.locators = new DeleteAccountPageLocators(page);
  }

  async waitForLoad() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(urlPatterns.deleteAccountUrl);
  }

  async verifyAccountIsDeleted() {
    await expect(this.locators.accountDeletedText).toBeVisible();
  }

  async clickContinue() {
    await this.locators.continueLink.click();
  }
}

export { DeleteAccountPage };
