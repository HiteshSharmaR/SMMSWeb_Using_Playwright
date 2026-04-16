import { Given, When, Then } from '@cucumber/cucumber';
import { DashboardPage } from '../pages/common/dashboard/dashboard';
import { LoginPage } from '../pages/common/LoginPage/loginPage';
import { UserForm } from '../pages/common/userForm/userForm';
import {getData} from '../utils/dataHelper'
import { world } from '../hooks/hooks';

let loginPage: LoginPage;
let dashboard: DashboardPage;
let userForm: UserForm;

Given('user logs in with {string} and {string}',
  async (userId: string, password: string) => {
    loginPage = new LoginPage(world.page);
    await loginPage.navigate();
    await loginPage.clickOnCokkiesOkButtonIfPresent();
    await loginPage.login(userId, password);
  }
);

Given('user select {string} from ship selection picklist', async(shipName:string)=>{
  dashboard = new DashboardPage(world.page);
    await dashboard.clickOnNetworkOkButtonIfExists();
    await dashboard.selectShipFromShipSelectionPicklist(shipName)
  })

  Given('user select {string} from mega menu and select {string}', async(module:string, submodule:string)=>{
    dashboard = new DashboardPage(world.page);
    await dashboard.clickOnNetworkOkButtonIfExists();
    await dashboard.clickOnTheMegaMenu();
    await dashboard.clickTopMenu(module);
    await dashboard.clickSubMenu(submodule);
    })  

When('user fills form using {string}', async (dataKey: string) => {
    dashboard = new DashboardPage(world.page);
    userForm = new UserForm(world.page);
    const data = getData("user", dataKey);
    await userForm.fillForm(data);
    await userForm.checkApplyRankApprovalLimitChecbox();
    await userForm.checkApplyRankPermissionColumn();
    await userForm.checkLoginDisabledCheckbox();
    await userForm.clickOnUserSaveButton();
});

Then('record should be created successfully', async () => {
});

When('user search and delete record {string}', async function (dataKey: string) {

  const userForm = new UserForm(world.page);
  const data = await getData("user", dataKey);
  await userForm.deleteExistingUser(data);
});