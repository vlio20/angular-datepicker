import {DemoPage} from '../app.po';
import {expect, Page, test} from '@playwright/test';

test.describe('debounce open delay', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
  });

  test('should open a picker when there is an openDelay', async () => {
    await po.setText(po.onOpenDelayInput(), '1000');
    await po.dayPickerInput().click();
    
    await po.sleep(500);
    expect(po.datePickerPopup()).toBeHidden();
    await po.sleep(600);
    expect(po.datePickerPopup()).toBeVisible();
  });

  test('should cancel open of a picker when there is an openDelay and focus out', async () => {
    await po.setText(po.onOpenDelayInput(), '1000');
    await po.dayPickerInput().click();
    await po.sleep(500);
    expect(po.datePickerPopup()).toBeHidden();
    await po.clickOnBody();
    await po.sleep(600);
    expect(po.datePickerPopup()).toBeHidden();
  });
});
