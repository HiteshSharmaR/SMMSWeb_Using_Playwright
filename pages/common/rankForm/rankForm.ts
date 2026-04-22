import { Page, expect } from '@playwright/test';
import { text } from 'node:stream/consumers';
import { rankFormLocators } from './rankForm.locators';
import { Dropdown } from '../../../utils/dropdown'


export class RankForm {
  constructor(private page: Page) { }

  async fillRankForm(data: any) {
    await this.page.fill(rankFormLocators.RANK_NAME_INPUT, data.Name);
    const wrapper = this.page.locator('//label[contains(normalize-space(),"Group Type")]/ancestor::div[contains(@class,"vinspl-fld-grp")]//span[contains(@class,"e-control-wrapper")]');

  // 1️⃣ Open dropdown
    await wrapper.waitFor();
    await wrapper.scrollIntoViewIfNeeded();
    await wrapper.hover(); // 🔥 like Actions.moveToElement
    await this.page.waitForTimeout(200);
    await wrapper.click();
  // 3️⃣ Locate option
    const option = this.page.locator(`//li[normalize-space()='${data.GroupType}']`);
    await option.waitFor();
  // 4️⃣ Hover BEFORE click (MOST IMPORTANT)
    await option.hover();
    await this.page.waitForTimeout(200);
    await option.click({ force: true });
    await this.page.locator(rankFormLocators.SUB_GROUP_TYPE_PICKLIST).press('Enter');
    await this.page.fill(rankFormLocators.SUB_GROUP_TYPE_SELECTION_SEARCH_BOX,data.SubGroupType);
    await this.page.locator(rankFormLocators.SUB_GROUP_TYPE_SELECTION_SEARCH_BOX).press('Enter');
    await this.page.locator(rankFormLocators.ROLE_FIRST_RESULT,{hasText:data.SubGroupType}).click();
    await this.page.click(rankFormLocators.RANK_SUB_GROUP_TYPE_MODAL_OK_BUTTON);
    await this.page.locator(rankFormLocators.ROLE).press('Enter');
    await this.page.fill(rankFormLocators.ROLE_SELECTION_SEARCH_BOX,data.Role);
    await this.page.locator(rankFormLocators.ROLE_SELECTION_SEARCH_BOX).press('Enter');
    await this.page.locator(rankFormLocators.ROLE_FIRST_RESULT,{hasText:data.Role}).click();
    await this.page.click(rankFormLocators.RANK_SUB_GROUP_TYPE_MODAL_OK_BUTTON);
    await this.page.click(rankFormLocators.RANK_SAVE_BUTTON);
  }
  async deleteRank(data: any) {
    await this.page.fill(rankFormLocators.RANK_SEARCH_INPUT, data.Name);
    await this.page.locator(rankFormLocators.RANK_SEARCH_INPUT).press('Enter');
    await this.page.locator(rankFormLocators.ROLE_FIRST_RESULT,{hasText:data.Name}).click({ button: 'right' });
    await this.page.locator(rankFormLocators.RANK_EXPLORER_CONTEXT_MENU_OPTION,{hasText:'Delete'}).click();
    await this.page.click(rankFormLocators.RANK_EXPLORER_DELETE_PROCEED_BUTON);
    await this.page.pause();
  }
}