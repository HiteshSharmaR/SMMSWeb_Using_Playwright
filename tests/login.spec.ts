import { test, expect } from '../fixtures/loginTest';
import loginData from '../test-data/loginTestData.json';

test.describe('Login Module', () => {

  test('Valid Login @smoke', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.clickOnCokkiesOkButtonIfPresent();
    await loginPage.login(loginData.username, loginData.password);
  });
});