import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class HomePageLocators {
  constructor(page) {
    this.page = page;
    this.categoryHeading = page.getByRole("heading", { name: "Category" });
    this.featuresItemsHeading = page.getByRole("heading", {
      name: "Features Items",
    });
    this.cartModal = page.locator("#cartModal");
    this.continueShoppingBtn = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  productCard(productName) {
    return this.page
      .locator(".single-products")
      .filter({ hasText: productName })
      .first();
  }

  addToCartBtn(productName) {
    return this.productCard(productName).locator("[data-product-id]").first();
  }
}

class HomePage {
  constructor(page) {
    this.page = page;
    this.locators = new HomePageLocators(page);
  }

  async waitForLoad() {
    await expect(this.page).toHaveURL(urlPatterns.homeUrl);
    await expect(this.locators.categoryHeading).toBeVisible();
  }

  async closeCartModal() {
    await this.locators.continueShoppingBtn.click();
    await this.locators.cartModal.waitFor({ state: "hidden" });
  }

  async addProductToCart(productName) {
    await this.locators.addToCartBtn(productName).click();
    await this.closeCartModal();
  }
}

export { HomePage };
