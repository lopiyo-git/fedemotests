import { expect } from "@playwright/test";
import { urlPatterns } from "../config/urlPatterns";

class ContactUsPageLocators {
  constructor(page) {
    this.page = page;
    this.getInTouchHeading = this.page.getByRole("heading", {
      name: "Get In Touch",
    });
    this.nameInput = this.page.getByRole("textbox", { name: "Name" });
    this.emailInput = this.page.getByRole("textbox", {
      name: "Email",
      exact: true,
    });
    this.subjectInput = this.page.getByRole("textbox", { name: "Subject" });
    this.messageInput = this.page.getByRole("textbox", {
      name: "Your Message Here",
    });
    this.chooseFileButton = this.page.getByRole("button", {
      name: "Choose File",
    });
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
    this.successMessage = this.page
      .getByText("Success! Your details have been submitted successfully.")
      .first();
  }
}

class ContactUsPage {
  constructor(page) {
    this.page = page;
    this.locators = new ContactUsPageLocators(page);
  }

  async waitForLoad() {
    await expect(this.page).toHaveURL(urlPatterns.contactUsUrl);
    await expect(this.locators.getInTouchHeading).toBeVisible();
  }

  async fillContactForm({ name, email, subject, message, filePath }) {
    await this.locators.nameInput.fill(name);
    await this.locators.emailInput.pressSequentially(email, { delay: 50 });
    await this.locators.subjectInput.fill(subject);
    await this.locators.messageInput.fill(message);
    await this.locators.chooseFileButton.setInputFiles(filePath);
  }

  async submitForm() {
    // Setup dialog listener just before submit (critical: must occur before click)
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await this.locators.submitButton.click();
  }
}

export { ContactUsPage };
