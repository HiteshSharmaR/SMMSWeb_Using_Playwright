import { Page } from '@playwright/test';

export async function waitForLoaderToDisappear(page: Page) {
   {
    const loader = page.locator('#ejWaitingPopup_WaitingPopup');

    // wait until loader disappears completely
    await loader.waitFor({ state: 'hidden', timeout: 300000 });
  
    // ensure it's REALLY gone (double check)
    await page.waitForFunction(() => {
      const el = document.querySelector('#ejWaitingPopup_WaitingPopup');
      return !el || window.getComputedStyle(el).display === 'none';
    }, { timeout: 300000 });
  }
}

export async function waitForAppToBeReady(page: Page) {

  await page.waitForLoadState('domcontentloaded');

  await page.locator('#ejWaitingPopup_WaitingPopup')
    .waitFor({ state: 'hidden', timeout: 300000 });

  await page.waitForTimeout(200); // small stabilization
}