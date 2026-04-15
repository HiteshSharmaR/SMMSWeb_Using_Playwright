import * as hooks from '../../../hooks/hooks';
import { shipSelectionPicklist } from './dashboard.locator';
import { megaMenu } from './dashboard.locator';
import { waitForLoaderToDisappear } from '../../../utils/waitHelpers';
import { spinLoader } from './dashboard.locator';
import { Page } from '@playwright/test';
import { world } from '../../../hooks/hooks';

export class DashboardPage {
    constructor(private page: Page) {}


    async waitForAlertOrLoader() {

        const loader = this.page.locator('#ejWaitingPopup_WaitingPopup');
        const alert = this.page.locator(shipSelectionPicklist.DASHBOARD_ALERT_OK_BUTTON);

        await Promise.race([loader.waitFor({ state: 'hidden', timeout: 300000 }), alert.waitFor({ state: 'visible', timeout: 300000 })]);
    }

    async clickOnNetworkOkButtonIfExists() {
        try {
            this.page.setDefaultTimeout(300000);
            const alert = this.page.locator(shipSelectionPicklist.DASHBOARD_ALERT_OK_BUTTON);
            const loader = this.page.locator(spinLoader);

            // ✅ Step 1: Wait for DOM ready (ONLY for navigation cases)
            await this.page.waitForLoadState('domcontentloaded').catch(() => { });

            // ✅ Step 2: Wait for loader to disappear
            await loader.waitFor({ state: 'hidden', timeout: 300000 }).catch(() => { });

            // ✅ Step 3: Immediately check alert (NO WAIT here)
            if (await alert.isVisible()) {
                await alert.click();

                // ✅ Step 4: Wait again after click (stability)
                await loader.waitFor({ state: 'hidden', timeout: 300000 }).catch(() => { });
            } else {
                console.log("Alert not present, skipping...");
            }

        } catch {
            console.log("Handled safely, continuing...");
        }
    }

    async clickOnTheMegaMenu() {
        await this.page.click(megaMenu.MEGA_MENU);
    }

    async clickTopMenu( menuName: string) {

        const menu = this.page.locator(megaMenu.MODULE_NAME, { hasText: menuName }).first();

        await menu.waitFor({ state: 'visible' });
        await menu.click();
    }

    async clickSubMenu( subMenuName: string) {

        const subMenu = this.page.locator(megaMenu.SUB_MENU_NAME, { hasText: subMenuName }).first();

        await subMenu.waitFor({ state: 'visible' });
        await subMenu.click();
    }

    async selectShipFromShipSelectionPicklist(shipName: string) {

        const loader = this.page.locator('#ejWaitingPopup_WaitingPopup');
        const picklist = this.page.locator('div.ship-office a#ShipPicklist');
        const searchInput = this.page.locator('div.vinspl-picklist-search input');

        console.log("Step 1: Waiting initial loader...");
        await loader.waitFor({ state: 'hidden', timeout: 300000 }).catch(() => { });

        console.log("Step 2: Clicking picklist...");
        await picklist.click();

        console.log("Step 3: Waiting for search input...");
        await searchInput.waitFor({ state: 'visible', timeout: 60000 });

        console.log("Step 4: Filling ship name...");
        await searchInput.fill(shipName);
        await searchInput.press('Enter');

        console.log("Step 5: Selecting ship...");
        await this.page.locator(
            shipSelectionPicklist.SHIP_SELECTION_FIRST_RESULT,
            { hasText: shipName }
        ).click();

        console.log("Step 6: Clicking OK...");

        const context = this.page.context();
        const initialPages = context.pages().length;

        await this.page.click(shipSelectionPicklist.SHIP_SELECTION_OK_BUTTON);

        console.log("Step 7: Waiting for new tab...");

        let newPage = null;

        for (let i = 0; i < 20; i++) {
            const pages = context.pages();

            console.log(`Attempt ${i + 1} → Tabs: ${pages.length}`);

            if (pages.length > initialPages) {
                newPage = pages[pages.length - 1];
                break;
            }

            await this.page.waitForTimeout(1000);
        }

        if (!newPage) {
            throw new Error("❌ New tab did NOT open");
        }

        console.log("Step 8: Switching to new tab...");

        await newPage.bringToFront();
        await newPage.waitForLoadState('domcontentloaded');

        // 🔥 CRITICAL FIX
        this.page = newPage;
        world.page = newPage;

        console.log("✅ Switched to new tab:", this.page.url());
    }
    async switchToSecondWindowAfterClick() {

        const popupPromise = this.page.waitForEvent('popup');

        await this.page.getByRole('button', { name: 'OK' }).click();

        const newPage = await popupPromise;

        await newPage.waitForLoadState('domcontentloaded');
        await newPage.bringToFront();

        return newPage;
    }
}