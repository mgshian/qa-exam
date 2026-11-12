
const { test, expect } = require('@playwright/test');

// Covers successful login, invalid credentials, and empty credentials.
const LoginPage = require('../../pages/LoginPage');
const loginData = require('../../test-data/login-data.json');

test.describe('Scenario 1: Login Functionality', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();

    await expect(loginPage.loginHeading).toBeVisible();
  });

  // TC01: Successful Login
  test('TC01 - Successful Login', async ({ page }) => {

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    await expect(page).toHaveURL(/\/secure$/);

    await expect(loginPage.secureAreaHeading).toBeVisible();

    await expect(loginPage.welcomeMessage).toBeVisible();

    await expect(loginPage.flashMessage)
      .toContainText('You logged into a secure area!');

    await expect(loginPage.logoutButton).toBeVisible();
  });

  // TC02: Invalid Username and Password
  test('TC02 - Invalid Username and Password', async ({ page }) => {

    await loginPage.login(
      loginData.invalidUser.username,
      loginData.invalidUser.password
    );

    await expect(page).toHaveURL(/\/login$/);

    await expect(loginPage.flashMessage)
      .toContainText('Your username is invalid!');
  });

  // TC03: Empty Credentials
  test('TC03 - Empty Credentials', async ({ page }) => {

    await loginPage.login(
      loginData.emptyUser.username,
      loginData.emptyUser.password
    );

    await expect(page).toHaveURL(/\/login$/);

    await expect(loginPage.flashMessage)
      .toContainText('Your username is invalid!');
  });

});
