import { Page, expect } from '@playwright/test';
import { text } from 'node:stream/consumers';
import { userFormLocators } from './userForm.locator';

export class UserForm {
  constructor(private page: Page) {  }

  async fillForm(data: any) {
    await this.page.fill(userFormLocators.USER_ID, data.UserID);
    await this.page.fill(userFormLocators.FULL_NAME, data.FullName);
    await this.page.locator(userFormLocators.RANK_PICKLIST).press('Enter');
    await this.page.fill(userFormLocators.RANK_SELECTION_SEARCH_BOX, data.Rank);
    await this.page.locator(userFormLocators.RANK_SELECTION_SEARCH_BOX).press('Enter');
    await this.page.locator(userFormLocators.FIRST_RESULT_SELECT,{hasText:data.Rank}).click();
    await this.page.click(userFormLocators.USER_RANK_SELECTION_OK_BUTTON);
    await this.page.fill(userFormLocators.NEW_PASSWORD, data.NewPassword);
    await this.page.fill(userFormLocators.CONFIRM_PASSWORD, data.NewPassword);
  }

  async checkApplyRankApprovalLimitChecbox(){
    await this.page.getByRole('row', { name: 'Apply rank approval limit' }).getByLabel('', { exact: true }).check();
  }

  async checkApplyRankPermissionColumn(){
    await this.page.getByRole('row', { name: 'Apply rank permission column' }).getByLabel('', { exact: true }).check();
  }

  async checkLoginDisabledCheckbox(){
    await this.page.getByRole('row', { name: 'Login disabled column header' }).getByLabel('', { exact: true }).check();
  }

  async clickOnUserSaveButton(){
    await this.page.click(userFormLocators.USER_SAVE_BUTTON);
  }
  async verifySuccess() {
  }

  async deleteExistingUser(data: any){
    await this.page.fill(userFormLocators.SEARCH_INPUT,data.UserID);
    await this.page.locator(userFormLocators.SEARCH_INPUT).press('Enter');
    await this.page.locator(userFormLocators.FIRST_RESULT_SELECT,{hasText:data.UserID}).click({ button: 'right' })
    await this.page.locator(userFormLocators.USER_EXPLORER_CONTEXT_MENU_OPTION,{hasText:'Delete'}).click();
    await this.page.click(userFormLocators.USER_EXPLORER_DELETE_MODAL_PROCEED_BUTTON);
  }
}