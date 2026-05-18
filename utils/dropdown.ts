import { Page, expect } from '@playwright/test';

export class Dropdown {
    constructor(private page: Page) {}

    async selectDropdown(visibleText: string) {
        const option = this.page.locator(`//li[normalize-space()='${visibleText}']`);

        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.scrollIntoViewIfNeeded();
        await option.click({ force: true });

        // Optional: wait briefly for the dropdown to close and the next action to be stable
        await this.page.waitForTimeout(200);
    }
}