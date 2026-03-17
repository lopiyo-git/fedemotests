import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class PaymentPageLocators {
  constructor(page) {
    this.page = page;
    this.nameOnCardInput = this.page.locator('input[name="name_on_card"]');
    this.cardNumberInput = this.page.locator('input[name="card_number"]');
    this.cvcInput = this.page.getByRole("textbox", { name: "ex." });
    this.expiryMonthInput = this.page.getByRole("textbox", { name: "MM" });
    this.expiryYearInput = this.page.getByRole("textbox", { name: "YYYY" });
    this.payAndConfirmButton = this.page.getByRole("button", {
      name: "Pay and Confirm Order",
    });
  }
}

class PaymentPage {
  constructor(page) {
    this.page = page;
    this.locators = new PaymentPageLocators(page);
  }

  async waitForLoad() {
    await expect(this.page).toHaveURL(/\/payment$/);
    await expect(this.locators.nameOnCardInput).toBeVisible();
  }

  async enterPaymentDetails({
    nameOnCard,
    cardNumber,
    cvc,
    expiryMonth,
    expiryYear,
  }) {
    await this.locators.nameOnCardInput.fill(nameOnCard);
    await this.locators.cardNumberInput.fill(cardNumber);
    await this.locators.cvcInput.fill(cvc);
    await this.locators.expiryMonthInput.fill(expiryMonth);
    await this.locators.expiryYearInput.fill(expiryYear);
  }

  async confirmPayment() {
    await this.locators.payAndConfirmButton.click();
    await expect(this.page).toHaveURL(urlPatterns.orderPlacedUrl);
  }
}

export { PaymentPage };
