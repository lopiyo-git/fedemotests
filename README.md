# FEDEMOTESTS: Modern Quality Orchestration Architecture

### AI Usage

This repository integrates **AI-Augmented Engineering** to enhance delivery velocity and ensure code consistency across the framework.

- **Tooling:** **GitHub Copilot** and **Gemini 3 Flash** were utilized for architecture scaffolding, boilerplate generation, and complex configuration optimization.

## Executive Summary

This project is a high-performance **quality orchestration showcase** targeting `automationexercise.com`. It demonstrates a commitment to **speed-to-value** through a resilient, containerized Playwright framework designed for complex, high-traffic web applications. The architecture prioritizes **continuous testing pipelines** and patterns that minimize technical debt while maximizing delivery efficiency.

## Core Technical Features

Aligned with enterprise-grade standards, this framework implements:

- **Two-Class Page Object Model (POM):** A refined architecture that strictly separates **Locators** from **Action logic** within the same file, ensuring high maintainability.
- **Playwright Fixtures:** Utilizes custom fixtures (`baseTest.js`) for dependency injection, providing an isolated, clean state for every test and reducing setup overhead.
- **Idempotent Test Design:** Implemented end-to-end (E2E) user lifecycles (Registration → Navigation → Deletion) that handle their own data cleanup.
- **CI/CD & DevOps Readiness:** Fully containerized via **Docker Compose** with environment-specific configurations (`CI=true`) for pipeline parity.

## Framework Architecture

The structure follows a modular "Squad-ready" design:

```text
├── config/               # Centralized URL patterns and constants
├── testData/             # Dynamic JS objects for user profiles and environment data
├── pages/                # POM implementation (Actions + Locators separation)
├── specs/                # Automated scripts (e.g., automationDemo.spec.js)
├── fixtures/             # baseTest.js for advanced dependency injection
├── playwright.config.js  # Enterprise browser and CI/CD configuration
└── Dockerfile            # Containerization for environment parity

```

## Key Engineering Patterns

- **Modular "Two-Class" POM:** Selectors are encapsulated in a `Locators` class, and business logic in a `Page` class (e.g., `SignupPageLocators` and `SignupPage`). This ensures that UI changes only require a single-line update in the locator mapping.
- **Dynamic Data Injection:** Uses timestamp-based unique identifiers (e.g., `Date.now()`) for user emails, ensuring tests are **thread-safe** and can run in parallel without collisions.
- **Component-Based Composition:** Shared UI elements like the Header are managed via a `NavComponent`, demonstrating **Composition over Inheritance**.

## Technical Challenges Solved

- **Network-Level Ad-Blocking:** Implemented request interception in `baseTest.js` to abort domains like `googlesyndication.com` and `doubleclick.net`. This eliminated external flakiness and improved execution speed by **~20%**.
- **Environment Parity:** engineered a Dockerized workflow to solve the "it works on my machine" problem, replicating the exact Linux environment used in production CI runners.
- **Asynchronous Stability:** Leveraged Playwright’s **auto-waiting** logic to handle dynamic React-based content transitions.

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
# Standard headless run
npx playwright test

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

---

## 📬 Contact

For inquiries regarding this framework or professional opportunities, please reach out via:

[![Email](https://img.shields.io/badge/Email-lopiyo14%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:lopiyo14@gmail.com)

**Author:** [lopiyo-git](https://github.com/lopiyo-git)
