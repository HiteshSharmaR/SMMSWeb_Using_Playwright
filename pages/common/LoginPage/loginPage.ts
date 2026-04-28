import { Page, expect } from '@playwright/test';
import { LoginLocators } from './loginPage.locator';
import { CookiesOkButton } from './loginPage.locator';
import { shipSelectionPicklist } from '../dashboard/dashboard.locator';
import { waitForAppToBeReady } from '../../../utils/waitHelpers';

export class LoginPage {
  constructor(private page: Page) { }

  async navigate() {
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
    catch {
    }

  }
  async login(username: string, password: string) {
    await this.page.fill(LoginLocators.userID, username);
    await this.page.fill(LoginLocators.password, password);
    await this.page.click(LoginLocators.loginBtn, { noWaitAfter: true });
    const loader = this.page.locator('#ejWaitingPopup_WaitingPopup');
    console.log("Step 1: Wait for loader to appear (if it does)...");
    // 🔥 Wait for loader to appear (but don't fail if it doesn't)
    await loader.waitFor({ state: 'visible', timeout: 120000 }).catch(() => { console.log("ℹ Loader did not appear (continuing)"); });
    console.log("Step 2: Wait for loader to disappear...");
    // 🔥 Wait for loader to disappear (main wait)
    await loader.waitFor({ state: 'hidden', timeout: 600000 }).catch(() => {
      console.log("⚠ Loader still present but continuing (fallback)");
    });
    console.log("✅ Loader cycle complete");
  }
}