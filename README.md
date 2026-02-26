eBay End-to-End Automation Framework (Playwright + JavaScript)

📌 Project Overview

This project is an end-to-end (E2E) automation framework built using Playwright with JavaScript, designed to automate and validate critical user flows on the eBay website.

The framework follows:
1. Page Object Model (POM) architecture 
2. Multi-tab handling
3. Stable navigation strategies
4. Dynamic content validation
5. Conditional element handling


🏗️ Architecture Overview

The framework is structured using the Page Object Model (POM) pattern to ensure:

1. Maintainability
2. Scalability
3. Clean separation of concerns
4. Reusability


📂 Project Structure

eBay-Product/
│
├── pages/
│   ├── LoginPage.js
│   ├── SearchPage.js
│   └── ProductPage.js
│
├── tests/
│   └── search.spec.js
│
├── playwright.config.js
├── .env
├── package-lock.json
├── package.json
└── README.md


🧠 Design Principles Used

1. Page Object Model (POM)

Each page has:
i. A constructor
ii. Centralized locators
iii. No test logic inside page files

This ensures:
i. Cleaner test files
ii. Reduced duplication
iii. Easier maintenance
iv. Better readability


2. Stable Waiting Strategy

Instead of relying on:
i. waitForTimeout()
ii. networkidle traps
iii. Unstable lifecycle events

The framework uses:
i. waitForSelector()
ii. URL assertions
iii. Conditional waits
iv. Scoped locators

This prevents flaky tests on dynamic pages.


3. Multi-Tab Handling

Product pages will open in a new tab

The framework safely handles all scenarios using:
i. context.waitForEvent('page')
ii. Promise.race() fallback


⚙️ Installation Guide

1. Install Dependencies
`npm install`

2. Install Playwright browsers:
`npx playwright install`

3. Environment Configuration
Create a .env file:
`BASE_URL=https://www.ebay.com/k`
`USERNAME=email`
`PASSWORD=password`


▶️ Running Tests

1. Run Normally
`npx playwright test`

2. Run in Playwright UI Mode (Recommended)
`npx playwright test --ui`
