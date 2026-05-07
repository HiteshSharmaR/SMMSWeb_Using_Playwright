import { assetType } from './assetType.locator';
import { Page } from '@playwright/test';
import { Modal } from '../../../utils/modalHelper'

export class AssetType {
    constructor(private page: Page) { }

    async fillAssetType(data: any) {
        await this.page.locator(assetType.ASSET_TYPE_ADD_BUTTON).click();
        await this.page.fill(assetType.ASSET_TYPE_NAME, data.Name);
        await this.page.click(assetType.ASSET_TYPE_SAVE_BUTTON);
        const modal = new Modal(this.page);
        await modal.closeToastIfPresent();
    }

    async deleteAssetTypeRecord(data: any) {

        const header = this.page.locator('th').filter({
            has: this.page.locator('.e-headercelldiv', {hasText: 'Name'})
        });
        //  wait for header
        await header.waitFor({ state: 'visible', timeout: 60000 });
        //  scroll into view
        await header.scrollIntoViewIfNeeded();
        //  locate filter icon
        const filterIcon = header.locator('.e-filtermenudiv');
        //  wait for icon
        await filterIcon.waitFor({ state: 'visible', timeout: 60000 });
        // 🔥 IMPORTANT FOR SYNCFUSION
        await this.page.waitForTimeout(500);
        //  normal click
        await filterIcon.click();
        console.log("✅ Filter icon clicked");
        await this.page.fill(assetType.ASSET_FILTER_SEARCH_INPUT,data.Name);
        await this.page.click(assetType.ASSET_FILTER_SEARCH_INPUT_FILTER_BUTTON);
        await this.page.locator(assetType.ASSET_TYPE_DISPLAYED_RECORDS,{hasText:'Test'}).click({ button: 'right'});
        await this.page.locator(assetType.ASSET_TYPE_CONTEXT_MENU_OPTION,{hasText:'Delete'}).click();
        await this.page.locator(assetType.CLICK_ON_ASSET_TYPE_DELETE_PROCEED_BUTTON).click();
        const modal = new Modal(this.page);
        await modal.closeToastIfPresent();
    }
}