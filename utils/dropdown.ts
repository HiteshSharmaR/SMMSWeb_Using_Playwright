import { Page, expect } from '@playwright/test';

export class Dropdown{
    constructor(private page: Page) {}

async selectDropdown( visibleText: string) {
   
    // 2️⃣ Select option (floating dropdown)
    const option = this.page.locator(`//li[normalize-space()='${visibleText}']`);

    await option.waitFor({ state: 'visible' });
    await option.click();

    // 3️⃣ Wait for dropdown to close (EJ2 case)
  //  await this.page.locator('.e-popup.e-popup-open').waitFor({ state: 'hidden' });
}
}