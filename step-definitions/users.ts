import { Given, When, Then } from '@cucumber/cucumber';
import { DashboardPage } from '../pages/common/dashboard/dashboard';
import { LoginPage } from '../pages/common/LoginPage/loginPage';
import { UserForm } from '../pages/common/userForm/userForm';
import {getData} from '../utils/dataHelper'

let loginPage: LoginPage;
let dashboard: DashboardPage;
let userForm: UserForm;

Given('user logs in with {string} and {string}',async function (userId: string, password: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.clickOnCokkiesOkButtonIfPresent();
    await loginPage.login(userId, password);
  }
);

Given('user select {string} from ship selection picklist', async function (shipName: string) {
  const dashboard = new DashboardPage(this.page);
  await dashboard.clickOnNetworkOkButtonIfExists();
  this.page = await dashboard.selectShipFromShipSelectionPicklist(shipName);
});

Given('user select {string} from mega menu and select {string}', async function (module: string, submodule: string) {
  const dashboard = new DashboardPage(this.page);
  await dashboard.clickOnNetworkOkButtonIfExists();
  await dashboard.clickOnTheMegaMenu();
  await dashboard.clickTopMenu(module);
  await dashboard.clickSubMenu(submodule);
});

When('user fills form using {string}', async function (dataKey: string) {
  const userForm = new UserForm(this.page);
  const data = await getData("user", dataKey);
  await userForm.fillForm(data);
  await userForm.checkApplyRankApprovalLimitChecbox();
  await userForm.checkApplyRankPermissionColumn();
  await userForm.checkLoginDisabledCheckbox();
  await userForm.clickOnUserSaveButton();
});

When('user search and delete record {string}', async function (dataKey: string) {
  const userForm = new UserForm(this.page);
  const data = await getData("user", dataKey);
  await userForm.deleteExistingUser(data);
});