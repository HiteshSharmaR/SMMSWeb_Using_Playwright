import { Page, expect } from '@playwright/test';
import { projectLocator } from './project.locator';
import {Modal} from '../../../utils/modalHelper'

let modal: Modal;
export class ProjectPage {
    constructor(private page: Page) { }


    async fillProjectForm(data: any) {
        await this.page.locator(projectLocator.PROJECT_ADD_BUTTON).click();
        await this.page.locator(projectLocator.PROJECT_CODE_INPUT).fill(data.Code);
        await this.page.locator(projectLocator.PROJECT_NAME_INPUT_CELL).dblclick();
        await this.page.locator(projectLocator.PROJECT_NAME_INPUT).fill(data.Name);
        await this.page.locator(projectLocator.PROJECT_NAME_INPUT).press('Tab')
        await this.page.locator(projectLocator.PROJECT_CATEGORY_PICKLIST).press('Enter');
        await this.page.locator(projectLocator.CATEGORY_SEARCH_INPUT).fill(data.Category)
        await this.page.locator(projectLocator.PROJECT_TYPE_FIRST_RESULT,{hasText:data.Category}).click();
        await this.page.locator(projectLocator.PROJECT_TYPE_PICKLIST_OK_BUTTON).click();
        await this.page.locator(projectLocator.PROJECT_CATEGORY_PICKLIST).press('Tab')
        await this.page.locator(projectLocator.PROJECT_TYPE).press('Enter');
        await this.page.locator(projectLocator.PROJECT_TYPE_PICKLIST_INPUT).fill(data.Type);
        await this.page.locator(projectLocator.PROJECT_TYPE_PICKLIST_INPUT).press('Enter');
        await this.page.locator(projectLocator.PROJECT_TYPE_FIRST_RESULT,{hasText:data.Type}).click();
        await this.page.locator(projectLocator.PROJECT_TYPE_INPUT_PICKLIST_OK_BUTTON).click();
        await this.page.locator(projectLocator.PROJECT_SAVE_BUTTON).click();
        const modal = new Modal(this.page);
        await modal.closeToastIfPresent();
    }

    async deleteProjectRecord(data: any){
        await this.page.locator(projectLocator.PROJECT_CODE_SEARCH_FILTER_ICON).click();
        await this.page.locator(projectLocator.PROJECT_CODE_FILTER_SEARCH_INPUT).fill(data.Code);
        await this.page.locator(projectLocator.PROJECT_FILTER_SEARCH_INPUT_FILTER_BUTTON).click();
        await this.page.locator(projectLocator.PROJECT_EXPLORER_GRID_RECORDS,{hasText:data.Code}).click({ button: 'right' });
        await this.page.locator(projectLocator.PROJECT_CONTEXT_MENU_OPTION,{hasText:'Delete'}).click();
        await this.page.locator(projectLocator.CLICK_ON_PROJECT_DELETE_PROCEED_BUTTON).click();
    }
}