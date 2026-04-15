import { Page, expect } from '@playwright/test';
import { userFormLocators } from './userForm.locator';

export class UserForm {
  constructor(private page: Page) {  }

  async fillForm(data: any) {
    await this.page.fill(userFormLocators.USER_ID, data.UserID);
    await this.page.fill(userFormLocators.FULL_NAME, data.FullName);
    await this.page.locator(userFormLocators.RANK_PICKLIST).press('Enter');
    await this.page.fill(userFormLocators.RANK_SELECTION_SEARCH_BOX, data.Rank);
    await this.page.fill(userFormLocators.NEW_PASSWORD, data.NewPassword);
    await this.page.fill(userFormLocators.CONFIRM_PASSWORD, data.NewPassword);
  }

  async verifySuccess() {
    
  }
}