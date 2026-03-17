import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class ViewCartPageLocators {
  constructor(page) {
    this.page = page;
    this.checkoutButton = this.page.getByText("Proceed To Checkout");
  }
}

class ViewCartPage {
  constructor(page) {
    this.page = page;
    this.locators = new ViewCartPageLocators(page);
  }

  async waitForCartToLoadWithItems() {
    await expect(this.page).toHaveURL(urlPatterns.cartUrl);
    await expect(this.locators.checkoutButton).toBeVisible();
  }

  async proceedToCheckout() {
    await this.locators.checkoutButton.click();
    await expect(this.page).toHaveURL(urlPatterns.checkoutUrl);
  }
}

export { ViewCartPage };
