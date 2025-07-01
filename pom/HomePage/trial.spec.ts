import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { HomePageLocators } from '../homePage/homePageLocators';

export class HomePage extends BasePage {

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator(HomePageLocators.emailInput);
    this.passwordInput = page.locator(HomePageLocators.passwordInput);
    this.signInButton = page.locator(HomePageLocators.signInButton);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}






