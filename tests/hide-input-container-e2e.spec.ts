import {DemoPage} from './app.po';
import {expect, Page, test} from '@playwright/test';

test.describe('hideInputContainer', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
  });

  test('should hide/show InputContainer datetimepicker', async () => {
    await expect(po.daytimePickerInput()).toBeVisible();
    await po.hideInputRadio().click();
    await expect(po.daytimePickerInput()).toBeHidden();
  });
});
