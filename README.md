# FEDEMOTESTS: Modern Quality Orchestration Architecture

![Playwright Tests](https://github.com/lopiyo-git/fedemotests/actions/workflows/playwright.yml/badge.svg)[![Test Report](https://img.shields.io/badge/Test%20Report-View-blue)](https://lopiyo-git.github.io/fedemotests/playwright-report/)

### AI Usage

This repository integrates **AI-Augmented Engineering** to enhance delivery velocity and ensure code consistency across the framework.

- **Tooling:** **GitHub Copilot** and **Gemini 3 Flash** were utilized for architecture scaffolding, boilerplate generation, and complex configuration optimization.

## Executive Summary

This project is a high-performance **quality orchestration showcase** targeting `automationexercise.com`. It demonstrates a commitment to **speed-to-value** through a resilient, containerized Playwright framework designed for complex, high-traffic web applications. The architecture prioritizes **continuous testing pipelines** and patterns that minimize technical debt while maximizing delivery efficiency.

## Core Technical Features

Aligned with enterprise-grade standards, this framework implements:

- **Two-Class Page Object Model (POM):** A refined architecture that strictly separates **Locators** from **Action logic** within the same file, ensuring high maintainability.
- **Automated Security Guardrails:** Integrated DevSecOps practices within the CI/CD pipeline, ensuring every build is audited for vulnerabilities and exposure before testing begins.
- **Playwright Fixtures:** Utilizes custom fixtures (`baseTest.js`) for dependency injection, providing an isolated, clean state for every test and reducing setup overhead.
- **Idempotent Test Design:** Implemented end-to-end (E2E) user lifecycles (Registration → Navigation → Deletion) that handle their own data cleanup.
- **CI/CD & DevOps Readiness:** Integrated with GitHub Actions for manual trigger for now though this can be automated for regression on every push/PR, alongside a local Docker Compose workflow for environment parity.

## Framework Architecture

The structure follows a modular "Squad-ready" design with a clear separation between API and browser test concerns:

```text
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI/CD pipeline definition
├── config/                        # Centralised URL patterns and constants
├── testData/                      # Dynamic JS objects for user profiles and payment data
├── pages/                         # POM implementation (Actions + Locators separation)
├── fixtures/                      # baseTest.js for advanced dependency injection
├── utils/                         # Shared helpers e.g. ApiAuthHelper, blockAds
├── tests/
│   ├── api/                       # API-only tests — run once, no browser required
│   │   └── users.api.spec.js      # User lifecycle API tests (create, delete, update, get)
│   └── browser/                   # Browser-based E2E tests — run per configured browser
│       └── automationDemo.spec.js # End-to-end UI journey tests
├── playwright.config.js           # Browser projects + API project configuration
├── docker-compose.yml             # Local CI simulation via Docker
└── Dockerfile                     # Containerisation for environment parity
```

### Project Configuration

The Playwright config defines separate projects to ensure API tests run **once** while browser tests run across all configured browsers. Execution scope is also demonstrated by use of Playwright @tags:

- **`api` project** — targets `tests/api/` with no browser device, runs once per pipeline execution
- **`chromium`, `firefox`, `webkit` projects** — target `tests/browser/` only, each runs the full UI suite
- **`@smoke` in some tests** run only tests marked with this tag.

## Key Engineering Patterns

- **Modular "Two-Class" POM:** Selectors are encapsulated in a `Locators` class, and business logic in a `Page` class (e.g., `SignupPageLocators` and `SignupPage`). This ensures that UI changes only require a single-line update in the locator mapping.
- **Dynamic Data Injection:** Uses timestamp-based unique identifiers (e.g., `Date.now()`) for user emails, ensuring tests are **thread-safe** and can run in parallel without collisions.
- **Component-Based Composition:** Shared UI elements like the Header are managed via a `NavComponent`, demonstrating **Composition over Inheritance**.

## Technical Challenges Solved

- **Network-Level Ad-Blocking:** Implemented request interception in `baseTest.js` to abort domains like `googlesyndication.com` and `doubleclick.net`. This eliminated external flakiness and improves execution speed.
- **Environment Parity:** Engineered a Dockerized workflow to solve the "it works on my machine" problem, replicating the exact Linux environment used in production CI runners.
- **Asynchronous Stability:** Leveraged Playwright's **auto-waiting** logic to handle dynamic React-based content transitions.

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker Desktop** (for CI simulation)

### Installation

```bash
git clone https://github.com/lopiyo-git/fedemotests.git
cd fedemotests
yarn install
```

### Running Tests (Local)

```bash
# Run all tests (API + all browsers)
npx playwright test

# Run API tests only
npx playwright test --project=api

# Run browser tests only (all browsers)
npx playwright test --project=chromium --project=firefox --project=webkit

# Run smoke tests only
npx playwright test --grep @smoke

# Run smoke tests for a specific browser
npx playwright test --project=chromium --grep @smoke

# Interactive UI mode
npx playwright test --ui
```

## 🐳 CI/CD Simulation (Docker)

This project uses **Infrastructure as Code (IaC)** principles to ensure the test suite is portable across any cloud provider.

### **Execute the Suite**

To build the image and trigger a clean test run:

```bash
docker-compose up --build
```

### **Perform a "Deep Clean"**

If you update dependencies or environment variables, use this to nuke the cache and rebuild from scratch:

```bash
docker compose down --rmi all && docker compose up --build
```

### **View Results**

- **HTML Report:** Open `./test-results/index.html`
- **Traces:** Traces are saved to `./playwright-report` for post-mortem analysis.

## 🚀 Continuous Integration (GitHub Actions)

The framework is configured with a native GitHub Actions workflow (`.github/workflows/playwright.yml`) to ensure high-velocity feedback loops.

### **Workflow Trigger Logic**

- **Manual On-Demand Execution:** Utilises `workflow_dispatch` to allow engineers to manually trigger the suite from the GitHub Actions tab with the following options:
  - **Browser and api selection** — run against a specific browser (Chromium, Firefox, WebKit), api or all tests.
  - **Test scope** — run the full suite or only `@smoke` tagged tests for faster feedback loops.

### **Pipeline Stages**

1. **Environment Setup:** Leverages `npm ci` and Node.js 24 for deterministic dependency locking and execution parity.
2. **On-Demand Provisioning:** Dynamically installs the required Playwright browser binaries (Chromium, Firefox, or WebKit) and OS-level dependencies.
3. **Parametrised Execution:** Supports targeted api and browser regression (api, Chromium, Firefox, WebKit, or All) via `workflow_dispatch`, with an optional `@smoke` tag filter for rapid pre-release validation. Features a mandatory Security Orchestration gatekeeper for vulnerability and secret detection.
4. **Artifact Retention:** Automatically captures and stores HTML reports and failure traces for 14 days to facilitate post-mortem analysis.
5. **Containerised Orchestration:** Executes the functional test suite within a security-hardened Docker container via docker-compose, guaranteeing 1:1 environment parity and eliminating "it works on my machine" flakiness.

---

## 📬 Contact

For inquiries regarding this framework or professional opportunities, please reach out via:

[![Email](https://img.shields.io/badge/Email-lopiyo14%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:lopiyo14@gmail.com)

**Author:** [Lawrence Opiyo](https://github.com/lopiyo-git)
