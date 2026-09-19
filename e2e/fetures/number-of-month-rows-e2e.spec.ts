import {DemoPage} from '../app.po';
import {expect, Page, test} from '@playwright/test';

test.describe('number of month rows', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
  });

  test('should make sure number of rows are changing on date-picker', async () => {
    await po.daytimePickerMenu().click();
    await po.dayPickerInput().click();
    await po.dayCalendarNavHeaderBtn().click();
    await expect(po.monthRows()).toHaveCount(3);

    await po.numOfMonthRowsToggle().click();
    await po.dayPickerInput().click();
    await po.dayCalendarNavHeaderBtn().click();
    await expect(po.monthRows()).toHaveCount(2);
  });

  test('should make sure number of rows are changing on month-picker', async () => {
    await po.monthPickerMenu().click();
    await po.monthPickerInput().click();
    await expect(po.monthRows()).toHaveCount(3);

    await po.numOfMonthRowsToggle().click();
    await po.dayPickerInput().click();
    await expect(po.monthRows()).toHaveCount(2);
  });

  test('should make sure number of rows are changing on month inline', async () => {
    await po.monthInlineMenu().click();
    await expect(po.monthRows()).toHaveCount(3);

    await po.numOfMonthRowsToggle().click();
    await expect(po.monthRows()).toHaveCount(2);
  });
});
