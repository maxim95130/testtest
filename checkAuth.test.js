// pages/auth.page.js
class AuthPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/mainpage');
  }

  async login(login, password) {
    await this.page.fill('input[name="login"]', login);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async checkUserName(login) {
    await this.page.waitForSelector(`text=${login}`);
  }

  async clearCart() {
    await this.page.goto('/mainpage/clearshopcart');
    await this.page.waitForSelector('.l-top-normal', { state: 'visible' });
  }
}

// pages/card.page.js
class CardPage {
  constructor(page) {
    this.page = page;
  }

  async open(serviceId) {
    await this.page.goto(`/profile/card/${serviceId}`);
    await this.page.waitForSelector('.account-error', { state: 'hidden' });
  }

  async checkIspmanagerPanel(url) {
    await this.page.waitForSelector('text=Панель управления');
    
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.click('.panel-authorization_button')
    ]);
    
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(url);
    await newPage.close();
  }
}

// test.spec.js
const { test, expect } = require('@playwright/test');
const hooks = require('../../../module/hooks');
const AuthPage = require('./pages/auth.page');
const CardPage = require('./pages/card.page');

const id = "1234567890";
let user;

test.describe('HOSTING E2E', () => {
  test.beforeEach(async () => {
    user = await hooks.testUser('testuser');
  });

  test('Проверка входа в панель управления хостинга', async ({ page }) => {
    const authPage = new AuthPage(page);
    const cardPage = new CardPage(page);

    await authPage.goto();
    await authPage.login(user.login, user.password);
    await authPage.checkUserName(user.login);
    await authPage.clearCart();

    await cardPage.open(id);
    await cardPage.checkIspmanagerPanel('server12345.hosting.ru/ispmgr');
  });

  test.afterEach(async () => {
    await hooks.returnUser(user, 'testUser');
  });
});