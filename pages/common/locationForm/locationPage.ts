import {locationPageLocators} from './locationPage.locator';
import { Page, expect } from '@playwright/test';
import {GridHelper} from '../../../utils/gridHelper'

export class LocationPage{
    constructor(private page: Page) { 
    }

    async fillLocation(data: any) {
        const gridHelper = new GridHelper(this.page);
        await this.page.click(locationPageLocators.LOCATION_ADD_BUTTON);
        await this.page.fill(locationPageLocators.LOCATION_CODE_INPUT,'temp data');
        await this.page.locator(locationPageLocators.LOCATION_NAME_INPUT_CELL).dblclick();
        await this.page.fill(locationPageLocators.LOCATION_NAME_INPUT,'Temp Name');
        await this.page.locator(locationPageLocators.LOCATION_REMARKS_INPUT_CELL).dblclick();
        await this.page.fill(locationPageLocators.LOCATION_REMARKS_INPUT,'Temp Remark');
        await this.page.locator(locationPageLocators.LOCATION_REMARKS_INPUT).press('Tab');
        // await this.page.locator(locationPageLocators.LOCATION_BUNKER_CHECKBOX).click();
        // await this.page.locator(locationPageLocators.LOCATION_BUNKER_CAPACITY_INPUT_CELL).dblclick();
        // await this.page.fill(locationPageLocators.LOCATION_REMARKS_INPUT_CELL,'5000');
        await this.page.locator(locationPageLocators.LOCATION_FUNCTION_CHECKBOX).dblclick();
        await this.page.pause();
    }
}