const { test, expect } = require('@playwright/test');

// Verifies checkbox count and confirms the first checkbox can be toggled.
const CheckboxesPage = require('../../pages/CheckboxesPage');

test.describe('Scenario 3: Checkboxes Interaction', () => {

  test('TC05 - Modify Checkbox State', async ({ page }) => {

    const checkboxesPage = new CheckboxesPage(page);

    await test.step('Step 1: Navigate to Checkboxes page', async () => {
      await checkboxesPage.navigate();
    });

    await test.step('Step 2: Verify page heading', async () => {
      await expect(checkboxesPage.checkboxesHeading).toBeVisible();
    });

    await test.step('Step 3: Verify there are two checkboxes', async () => {
      await expect(checkboxesPage.checkboxes).toHaveCount(2);
    });

    await test.step('Step 4: Verify initial checkbox state', async () => {
      await expect(checkboxesPage.checkboxes.first()).not.toBeChecked();
    });

    await test.step('Step 5: Check the first checkbox', async () => {
      await checkboxesPage.checkFirstCheckbox();
    });

    await test.step('Step 6: Verify checkbox is checked', async () => {
      await expect(checkboxesPage.checkboxes.first()).toBeChecked();
    });

    await test.step('Step 7: Uncheck the first checkbox', async () => {
      await checkboxesPage.uncheckFirstCheckbox();
    });

    await test.step('Step 8: Verify checkbox is unchecked', async () => {
      await expect(checkboxesPage.checkboxes.first()).not.toBeChecked();
    });

  });

});