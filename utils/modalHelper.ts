import { Page, expect } from '@playwright/test';
export class Modal {
    constructor(private page: Page) { }
    async closeToastIfPresent() {

        const toast = this.page.locator('#visplToast');
        const closeBtn = toast.locator('.e-toast-close-icon, .e-toast-close');
        const backdrop = this.page.locator('#visplToastBackdrop');

        // 1️⃣ Close toast if visible
        if (await toast.isVisible().catch(() => false)) {
            if (await closeBtn.isVisible().catch(() => false)) {
                await closeBtn.click({ force: true });
                console.log("✅ Toast closed");
            }
        }

        // 2️⃣ Wait for backdrop to disappear
        await backdrop.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {
            console.log("ℹ Backdrop already gone");
        });

    }
}