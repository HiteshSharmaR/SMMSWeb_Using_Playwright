import { Page, expect } from '@playwright/test';

export class GridHelper {
    constructor(private page: Page) { }
    async selectMasterFormCheckbox(cellLocator: string, checkboxLocator: string) {
        const cell = this.page.locator(cellLocator);
        const checkbox = this.page.locator(checkboxLocator);
        // 1️⃣ Wait for cell
        await cell.waitFor({ state: 'visible' });
        // 2️⃣ Scroll into view
        await cell.scrollIntoViewIfNeeded();
        // 3️⃣ Move + small delay (IMPORTANT like Selenium Actions)
        await cell.hover();
        await this.page.waitForTimeout(200);
        // 4️⃣ Double click to activate edit mode
        await cell.dblclick();
        // 🔥 VERY IMPORTANT: small wait after dblclick
        await this.page.waitForTimeout(300);
        // 5️⃣ Wait until checkbox enabled (class-based like Selenium)
        await this.page.waitForFunction((selector) => {
            const el = document.querySelector(selector);
            if (!el) return false;

            return !el.className.includes('e-checkbox-disabled');
        }, checkboxLocator, { timeout: 30000 });
        // 6️⃣ Click checkbox (force helps EJ2 sometimes)
        await checkbox.click({ force: true });
        // 7️⃣ Commit change
        await this.page.keyboard.press('Tab');
    }
    async editGridCell(cellLocator: string, inputLocator: string, value: string) {

      const cell = this.page.locator(cellLocator);
    
      await cell.waitFor({ state: 'visible' });
      await cell.scrollIntoViewIfNeeded();
    
      console.log("Step 1: Activate cell");
    
      await cell.click({ force: true });
      await this.page.keyboard.press('Enter');
    
      await this.page.waitForTimeout(500);
    
      console.log("Step 2: Wait for ANY input (not active-row based)");
    
      const input = this.page.locator(inputLocator);
    
      await input.first().waitFor({ state: 'attached', timeout: 60000 });
    
      console.log("Step 3: Enter value");
    
      await input.first().evaluate((el, val) => {
        const inputEl = el as HTMLInputElement;
    
        inputEl.value = val;
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
      }, value);
      await input.first().press('Tab');
      console.log("✅ Value entered:", value);
    }
}