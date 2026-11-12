

const BasePage = require('./basePage');

// Locators and actions for the Checkboxes page.
class CheckboxesPage extends BasePage {
  constructor(page) {
    super(page);

    this.checkboxes = page.getByRole('checkbox');

    this.checkboxesHeading = page.getByRole('heading', {
      name: 'Checkboxes'
    });
  }

  async navigate() {
    await super.navigate('/checkboxes');
  }

  async checkFirstCheckbox() {
    await this.checkboxes.first().check();
  }

  async uncheckFirstCheckbox() {
    await this.checkboxes.first().uncheck();
  }
}

module.exports = CheckboxesPage;
