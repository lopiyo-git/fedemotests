// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["junit", { outputFile: "test-results/results.xml" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // Global timeout for a single test (30-60s is standard)
  timeout: 60000,
  expect: {
    timeout: 15000, // it's a test website that can be slow at times, so we increase the default timeout for assertions to 15 seconds
  },
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "https://automationexercise.com",
    actionTimeout: 15000,
    navigationTimeout: 30000,
    // Capture a screenshot on failure so CI artefacts are useful for debugging
    screenshot: "only-on-failure",
    //block ads
    extraHTTPHeaders: {
      Accept: "application/json",
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects here*/
  projects: [
    // API tests — run once, no browser
    {
      name: "api",
      testMatch: "**/tests/api/**/*.spec.js",
      use: {}, // no browser device
    },

    // Browser tests — run for each browser
    {
      name: "chromium",
      testMatch: "**/tests/browser/**/*.spec.js",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      testMatch: "**/tests/browser/**/*.spec.js",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      testMatch: "**/tests/browser/**/*.spec.js",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
