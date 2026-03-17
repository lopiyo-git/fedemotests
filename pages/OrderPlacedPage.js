import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class OrderPlacedPageLocators {
  constructor(page) {
    this.page = page;
    this.orderPlacedHeader = this.page.getByText("Order Placed!");
    this.downloadInvoiceLink = this.page.getByRole("link", {
      name: "Download Invoice",
    });
    this.continueLink = this.page.getByRole("link", { name: "Continue" });
  }
}

class OrderPlacedPage {
  constructor(page) {
    this.page = page;
    this.locators = new OrderPlacedPageLocators(page);
  }

  async waitForLoad() {
    await expect(this.page).toHaveURL(urlPatterns.orderPlacedUrl);
    await expect(this.locators.orderPlacedHeader).toBeVisible();
  }

  async clickContinue() {
    await this.locators.continueLink.click();
  }
}

export { OrderPlacedPage };
