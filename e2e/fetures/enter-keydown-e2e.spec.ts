import {DemoPage} from '../app.po';
import {expect, Page, test} from '@playwright/test';

test.describe('enter keypress', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
    await po.daytimePickerMenu().click();
  });

  test('should close the picker on enter keypress', async () => {
    await po.dayPickerInput().click();
    await expect(po.datePickerPopup()).toBeVisible();
    await po.dayPickerInput().focus();
    await page.keyboard.press('Enter');
    await expect(po.datePickerPopup()).toBeHidden();

    await po.disableCloseOnEnter().click();
    await po.dayPickerInput().click();
    await expect(po.datePickerPopup()).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(po.datePickerPopup()).toBeVisible();
  });
});
