# QA Exam Automation

This project automates the UI and API scenarios using JavaScript and Playwright Test.

## Framework and design

- **Framework:** Playwright Test, which provides browser and API request fixtures, assertions, test grouping, and reporting.
- **Design pattern:** Page Object Model (POM). Reusable page locators and actions live in `pages/`; UI tests use those page objects instead of duplicating selectors.
- **Test data:** Login credentials are stored in `test-data/login-data.json`. API request inputs are in `test-data/users-data.js`, and the expected users response is in `test-data/users.expected.json`.
- **Reporting:** Playwright's list reporter displays results in the terminal. The HTML report is saved to `playwright-report/`. On failures, screenshots and videos are retained; traces are recorded on the first retry.

## Project structure

```text
pages/                 Page objects and shared page helpers
tests/
  ui/                  Login, dynamic content, and checkbox tests
  api/                 Users API tests
test-data/             Login data, API inputs, and expected users
playwright.config.js   Playwright settings, browser project, and reporters
```

## Covered scenarios

- **Login:** successful login, invalid credentials, and empty credentials.
- **Dynamic content:** checks that page content differs after a refresh.
- **Checkboxes:** verifies the checkbox count and checks/unchecks the first checkbox.
- **Users API:** retrieves and validates the users list, checks a single user against the expected fixture, and verifies a created user and its new ID.

## Evaluation criteria

- **Readability and maintainability:** shared browser actions and page-specific behavior are separated into page objects; test data is kept outside the test steps.
- **Automation design pattern:** UI tests use the Page Object Model.
- **Assertions:** tests verify page state and content, API status codes and content types, response data, and checkbox states.
- **Robustness:** Playwright locator assertions wait for expected UI state; UI tests use a configured base URL, while API tests target their own endpoint.
- **Scenario coverage:** run `npm test` to execute all UI and API scenarios.

## Setup

Install dependencies and the Chromium browser:

```bash
npm install
npx playwright install chromium
```

The UI tests use `UI_BASE_URL` as their base URL. Create a `.env` file in the project root with:

```dotenv
UI_BASE_URL=http://the-internet.herokuapp.com
```

The users API tests call `https://jsonplaceholder.typicode.com/users` directly and do not use the UI base URL.

## Running tests

```bash
npm test             # Run all tests
npm run test:ui      # Run UI tests
npm run test:api     # Run API tests
npm run test:login   # Run login tests
npm run test:headed  # Run tests with a visible browser
npm run test:debug   # Run tests in Playwright debug mode
npm run test:report  # Open the latest HTML report
```

## Test Execution Results

The following screenshot shows the Playwright test execution report after running the automation suite.

### Playwright HTML Report
<img width="1024" height="792" alt="image" src="https://github.com/user-attachments/assets/f6e71388-9baa-458b-adb5-5ff21e94854d" />

