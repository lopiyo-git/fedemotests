import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class CheckoutPageLocators {
  constructor(page) {
    this.page = page;
    this.checkoutHeader = this.page.getByRole("heading", {
      name: "Address Details",
    });
    this.placeOrderLink = this.page.getByRole("link", { name: "Place Order" });
  }
}

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.locators = new CheckoutPageLocators(page);
  }

  async waitForLoad() {
    await expect(this.page).toHaveURL(urlPatterns.checkoutUrl);
    await expect(this.locators.checkoutHeader).toBeVisible();
  }

  async placeOrder() {
    await this.locators.placeOrderLink.click();
    await expect(this.page).toHaveURL(urlPatterns.paymentUrl);
  }
}

export { CheckoutPage };
