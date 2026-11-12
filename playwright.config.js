
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({

  // Test directory
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // CI configuration
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Test timeout
  timeout: 30000,

  // Assertion timeout
  expect: {
    timeout: 10000,
  },

  // Test reporting
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
  ],

  // Shared test settings
  use: {

    // UI website base URL
    baseURL: process.env.UI_BASE_URL,

    // Browser settings
    headless: true,

    // Capture evidence when tests fail
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

});
