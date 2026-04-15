import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

setDefaultTimeout(300 * 1000);

let browser: Browser;
let context: BrowserContext;
export let page: Page;

export const world = {
  page: undefined as unknown as Page
};

BeforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
    slowMo: 100,
    args: ['--start-maximized']
  });
});

Before(async () => {
  context = await browser.newContext({
  
    baseURL: 'https://smmswebofficetest.vertexinfosoft.com',
    viewport: null
  });
  world.page = await context.newPage();
});

After(async function (scenario) {

  const status = scenario.result?.status;

  console.log(`Scenario Status: ${status}`);

  // Pause for BOTH passed & failed
  if (status === 'PASSED' || status === 'FAILED') {
    console.log("⏸ Pausing after scenario...");
    await world.page.pause();
  }

  await context.close();
});

AfterAll(async () => {
  await browser.close();
});