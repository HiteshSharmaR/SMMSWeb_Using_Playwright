import { Page } from '@playwright/test';

export async function waitForLoaderToDisappear(page: Page) {
  await page.waitForFunction(() => {
    const loader = document.querySelector('#ejWaitingPopup_WaitingPopup');
    if (!loader) return true;
    const style = window.getComputedStyle(loader);
    return (
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      style.opacity === '0' ||
      style.pointerEvents === 'none'
    );
  }, { timeout: 300000 });

}

export async function waitForAppToBeReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#ejWaitingPopup_WaitingPopup').waitFor({ state: 'hidden', timeout: 300000 });
  await page.waitForTimeout(200); // small stabilization
}