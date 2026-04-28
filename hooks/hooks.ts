import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

setDefaultTimeout(600 * 1000);
let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
    slowMo: 100,
    args: ['--start-maximized']
  });
});

Before(async function () {
  this.context = await browser.newContext({
    baseURL: 'https://smmswebofficetest.vertexinfosoft.com',
    viewport: null
  });

  this.page = await this.context.newPage();
});

After(async function (scenario) {
  const status = scenario.result?.status;
  console.log(`Scenario Status: ${status}`);

  if (status === 'FAILED') {
    await this.page.pause();
  }

  if (this.page && !this.page.isClosed()) {
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
});

AfterAll(async () => {
  await browser.close();
});