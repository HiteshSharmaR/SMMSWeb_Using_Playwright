import { Page, expect } from '@playwright/test';
export class Modal {
    constructor(private page: Page) { }
    async closeToastIfPresent() {

        // Support multiple toast selectors used across the app
        const toastSelector = '#visplToast, .vinspl-toast, .e-toast';
        const backdrop = this.page.locator('#visplToastBackdrop');

        // Wait briefly for any toast to appear. If none, return early.
        try {
            await this.page.locator(toastSelector).first().waitFor({ state: 'visible', timeout: 3000 });
        } catch (e) {
            return; // no toast present
        }

        // Close all visible toasts if possible
        const toasts = this.page.locator(toastSelector);
        const count = await toasts.count();
        for (let i = 0; i < count; i++) {
            const t = toasts.nth(i);
            const closeBtn = t.locator('.e-toast-close-icon, .e-toast-close, .vinspl-toast-close');
            if (await closeBtn.isVisible().catch(() => false)) {
                await closeBtn.click({ force: true }).catch(() => { });
                console.log('✅ Toast closed (button)');
            } else {
                // fallback: try pressing Escape on the toast element or page
                await t.press('Escape').catch(() => { });
                await this.page.keyboard.press('Escape').catch(() => { });
                console.log('ℹ Toast close attempted via Escape');
            }
        }

        // Wait for all toasts/backdrop to disappear
        await this.page.locator(toastSelector).waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {
            console.log('⚠ Some toasts did not disappear in time');
        });
        await backdrop.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {
            console.log('ℹ Backdrop already gone or not present');
        });

    }
}