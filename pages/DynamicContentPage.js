
const BasePage = require('./basePage');

// Locators and actions for checking content that changes after a refresh.
class DynamicContentPage extends BasePage {
  constructor(page) {
    super(page);

    this.dynamicContentHeading = page.getByRole('heading', {
      name: 'Dynamic Content'
    });

    this.contentRows = page.locator('#content .row');

    this.images = page.getByRole('img');
  }

  async navigate() {
    await super.navigate('/dynamic_content');
  }

  async getContent() {
    await this.contentRows.first().waitFor({
      state: 'visible'
    });

    return await this.contentRows.allTextContents();
  }

  async refreshAndGetContent() {
    await this.refreshPage();

    return await this.getContent();
  }
}

module.exports = DynamicContentPage;
