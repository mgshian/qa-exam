
const BasePage = require('./basePage');

// Locators and actions for logging in and verifying the secure area.
class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.loginHeading = page.getByRole('heading', {
      name: 'Login Page'
    });

    this.usernameInput = page.getByRole('textbox', {
      name: 'Username'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Password'
    });

    this.loginButton = page.getByRole('button', {
      name: /Login/
    });

    this.flashMessage = page.locator('#flash');

    this.secureAreaHeading = page.getByRole('heading', {
      name: 'Secure Area',
      exact: true
    });

    this.welcomeMessage = page.getByRole('heading', {
      name: 'Welcome to the Secure Area.'
    });

    this.logoutButton = page.getByRole('link', {
      name: 'Logout'
    });
  }

  async navigate() {
    await super.navigate('/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
