
const { test, expect } = require('@playwright/test');

// Confirms dynamic page content changes after refreshing the page.
const DynamicContentPage = require('../../pages/DynamicContentPage');


test.describe('Scenario 2: Dynamic Content', () => {

  test('TC04 - Verify Content Changes After Refresh', async ({ page }) => {

    const dynamicPage = new DynamicContentPage(page);

    // Navigate to Dynamic Content
    await dynamicPage.navigate();

    // Verify page heading
    await expect(dynamicPage.dynamicContentHeading).toBeVisible();

    // Capture initial content
    const initialContent = await dynamicPage.getContent();

    // Verify content is displayed
    expect(initialContent.length).toBeGreaterThan(0);

    // Refresh page and capture updated content
    const refreshedContent = await dynamicPage.refreshAndGetContent();

    // Verify content changes after refresh
    expect(refreshedContent).not.toEqual(initialContent);

  });

});
