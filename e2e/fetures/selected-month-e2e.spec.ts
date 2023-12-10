import {DemoPage} from '../app.po';
import {expect, Page, test} from '@playwright/test';

test.describe('selected-month', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();

    await po.setText(po.dateFormatInput(), 'DD-MM-YYYY');
  });

  test('should work on date time picker', async () => {
    await po.daytimePickerMenu().click();
    await po.setText(po.dateFormatInput(), 'DD-MM-YYYY HH:mm:ss');
    await po.setText(po.daytimePickerInput(), '10-04-2017 09:08:07');

    await po.dayCalendarNavHeaderBtn().click();
    expect(await po.selectedMonth().textContent()).toEqual('Apr');
  });

  test('should work on day picker', async () => {
    await po.dayPickerMenu().click();
    await po.dayPickerInput().click();
    await po.dayPickerInput().clear();
    await po.setText(po.dayPickerInput(), '10-04-2017');

    await po.dayCalendarNavHeaderBtn().click();
    expect(await po.selectedMonth().textContent()).toEqual('Apr');
  });
});
