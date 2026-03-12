# Specs
# FEDEMOTESTS: Modern Quality Orchestration Architecture

## Executive Summary

This showcase highlights a **modern quality orchestration architecture** designed to accelerate **speed-to-value** for complex, high-traffic web applications. It demonstrates a commitment to **"Shift-Left" methodologies**, **continuous testing pipelines**, and **modern QE patterns** that prioritize delivery efficiency and framework resilience.

## Core Technical Features

Aligned with enterprise-grade standards, this framework implements:

* **Page Object Model (POM):** A modular architecture that separates locators (`HomePageLocators`) from action logic (`HomePage`), ensuring high maintainability and reduced technical debt.
* **Playwright Fixtures:** Utilizes custom fixtures (e.g., `baseTest`) to provide isolated, clean state for every test, significantly reducing flakiness and setup overhead.
* **Intelligent Test Design:** Implements high-quality automated scripts focused on critical user journeys, such as property searches and interactive listing views.
* **CI/CD & DevOps Readiness:** Configured for **containerized execution** via Docker and optimized for future development of **GitHub Actions** with parallel execution enabled to maximize pipeline efficiency.
* **Distributed Systems Observability:** Integrated **Playwright Trace Viewer** and HTML reporting to enable deep root-cause analysis in complex cloud environments.

## Framework Architecture

The project structure is designed for scalability across multiple squads:

```text
├── .github/workflows/    # Continuous Testing Pipelines (GitHub Actions)
├── pages/                # Page Object Model (POM) implementation
├── specs/                # Test design and automated scripts
├── fixtures/             # Custom Playwright fixtures for dependency injection
├── playwright.config.js  # Enterprise-grade CI/CD & browser configuration
└── Dockerfile            # Containerization for isolated execution environments

```

## Key Engineering Patterns

* **Modern Locators:** Leverages `getByRole` and `getByTestId` to ensure tests are resilient to UI changes and adhere to accessibility best practices.
* **Parallelization:** Configured for `fullyParallel: true` to optimize delivery speed in continuous delivery contexts.
* 
**Risk-Based Execution:** Designed to support targeted regression suites and smoke tests based on feature criticality.



## Getting Started

### Prerequisites

* Node.js (v16 or higher)
* Yarn or NPM

### Installation

```bash
git clone https://github.com/lopiyo-git/fedemotests.git
cd fedemotests
yarn install

```

### Running Tests

```bash
# Run all tests in headless mode
npx playwright test

# Run tests with the Playwright UI runner
npx playwright test --ui

# Run tests on a specific browser
npx playwright test --project=chromium

```
**Infrastructure as Code (IaC)**.
## 🐳 CI/CD Simulation & Dockerization

This project is fully containerized to ensure **environment parity**. By using Docker, the entire test suite executes in an isolated Linux environment that perfectly replicates a GitHub Actions or Jenkins CI/CD runner. 

This solves the "it works on my machine" problem and ensures 100% reproducibility across different development environments.

### **Key DevOps Features**
* **Isolation:** Tests run in a clean container, unaffected by local system configurations or bloat.
* **Volume Mapping:** Test results, traces, and screenshots are automatically synced from the container to the host machine for local review.
* **Headless Execution:** Pre-configured for headless browser runs, optimized for automated pipelines.

### **How to Run Tests (Local CI Simulation)**

1. **Prerequisites:** - Ensure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed and running.

2. **Execute the Suite:**
   Run the following command to build the image and trigger the test run:
   ```bash
   docker-compose up --build

```

3. **View Results:**
Once the run completes, you can find the detailed reports in the local directory:
* **HTML Report:** Open `./test-results/index.html`
* **Playwright Trace:** Open `./playwright-report`


4. **Environment Cleanup:**
```bash
docker-compose down

```
