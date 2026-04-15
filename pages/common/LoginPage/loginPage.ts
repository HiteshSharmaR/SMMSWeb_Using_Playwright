import { Page, expect } from '@playwright/test';
import { LoginLocators } from './loginPage.locator';
import { CookiesOkButton } from './loginPage.locator';
import {waitForAppToBeReady } from '../../../utils/waitHelpers';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate(){
    await this.page.goto('/SMMSWeb422R6_Common', {
      waitUntil: 'domcontentloaded',
      timeout: 300000
    });
  }

  async clickOnCokkiesOkButtonIfPresent() {
    try {
      const element = this.page.locator(CookiesOkButton);
  
      if (await element.isVisible({ timeout: 300000 })) {
        await element.click();
      } else {
        console.log(`Element not visible: ${CookiesOkButton}`);
      }
  }
  catch{   
  }
  
}
  async login(username: string, password: string) {
    await this.page.fill(LoginLocators.userID, username);
    await this.page.fill(LoginLocators.password, password);
    await this.page.click(LoginLocators.loginBtn);
  }
}