import {DemoPage} from '../app.po';
import {expect, Page, test} from '@playwright/test';

test.describe('format changed validation', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
  });

  test('should hide validation on date time picker', async () => {
    await po.daytimePickerMenu().click();
    await po.setText(po.dateFormatInput(), 'DD-MM-YYYY');
    await po.setText(po.daytimePickerInput(), '10-04-2017 09:08:07');
    await po.clickOnBody();
    expect(po.formatValidationMsg()).toBeVisible();
    await po.setText(po.dateFormatInput(), 'DD-MM-YYYY HH:mm:ss');
    await po.setText(po.daytimePickerInput(), '10-04-2017 09:08:07');
    await po.clickOnBody();
    expect(po.formatValidationMsg()).toBeHidden();
  });

  test('should hide validation on day picker', async () => {
    await po.dayPickerMenu().click();
    await po.setText(po.dateFormatInput(), 'DD-MM');
    await po.setText(po.dayPickerInput(), '10-04-2017');
    await po.clickOnBody();
    expect(po.formatValidationMsg()).toBeVisible();
    await po.setText(po.dateFormatInput(), 'DD-MM-YYYY');
    await po.setText(po.dayPickerInput(), '10-04-2017');
    await po.clickOnBody();
    expect(po.formatValidationMsg()).toBeHidden();
  });

  test('should work on time picker picker', async () => {
    await po.timePickerMenu().click();
    await po.setText(po.dateFormatInput(), 'HH');
    await po.setText(po.timePickerInput(), '10:04');
    await po.clickOnBody();
    expect(po.formatValidationMsg()).toBeVisible();
    await po.setText(po.dateFormatInput(), 'HH:mm');
    await po.timePickerInput().click();
    await po.clickOnBody();
    expect(po.formatValidationMsg()).toBeHidden();
  });

  test('should hide validation on month picker', async () => {
    await po.monthDirectiveMenu().click();
    await po.setText(po.dateFormatInput(), 'MM');
    await po.setText(po.monthDirectiveInput(), 'Jan');
    await po.clickOnBody();
    expect(po.formatValidationMsg()).toBeVisible();
    await po.setText(po.dateFormatInput(), 'MMM');
    await po.setText(po.monthDirectiveInput(), 'Jan');
    await po.clickOnBody();
    expect(po.formatValidationMsg()).toBeHidden();
  });
});
