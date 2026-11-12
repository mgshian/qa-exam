// Shared navigation helpers used by the individual page objects.
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path) {
    await this.page.goto(path);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async refreshPage() {
    await this.page.reload();
  }
}

module.exports = BasePage;
