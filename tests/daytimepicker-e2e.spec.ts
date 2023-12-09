import {DemoPage} from './app.po';
import {expect, Page, test} from '@playwright/test';

test.describe('dpDayPicker dayPicker', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();

    await po.setText(po.dateFormatInput(), 'DD-MM-YYYY HH:mm:ss');
    await po.daytimePickerMenu().click();
  });

  test('should check if min date validation is working', async () => {
    await po.minDateValidationPickerInput().clear();
    await expect(po.minDateValidationMsg()).toBeHidden();
    await po.setText(po.minDateValidationPickerInput(), '10-04-2017 10:08:07');
    await po.setText(po.daytimePickerInput(), '10-04-2017 09:08:07');
    await expect(await po.minDateValidationMsg().textContent()).toEqual('minDate invalid');
    await po.setText(po.minDateValidationPickerInput(), '10-04-2017 09:08:07');
    await expect(po.minDateValidationMsg()).toBeHidden();
  });

  test('should check if max date validation is working', async () => {
    await po.maxDateValidationPickerInput().clear();
    await expect(po.maxDateValidationMsg()).toBeHidden();
    await po.setText(po.maxDateValidationPickerInput(), '12-04-2017 08:08:07');
    await po.setText(po.daytimePickerInput(), '12-04-2017 09:08:07');
    await expect(await po.maxDateValidationMsg().textContent()).toEqual('maxDate invalid');
    await po.setText(po.maxDateValidationPickerInput(), '12-04-2017 09:08:07');
    await expect(po.maxDateValidationMsg()).toBeHidden();
  });

  test('should check that the min selectable option is working', async () => {
    await po.setText(po.minSelectableInput(), '11-04-2017 09:08:07');
    await po.setText(po.daytimePickerInput(), '17-04-2017 09:08:07');
    await po.daytimePickerInput().click();
    await expect(await po.calendarDisabledDays().count()).toBe(16);
    await po.setText(po.daytimePickerInput(), '11-04-2017 09:18:07');
    await expect(await po.hourDownBtn()).toBeDisabled();
    await expect(await po.minuteDownBtn()).not.toBeDisabled();
    await expect(await po.meridiemUpBtn()).not.toBeDisabled();
    await expect(await po.meridiemDownBtn()).not.toBeDisabled();
  });

  test('should check that the max selectable option is working', async () => {
    await po.setText(po.maxSelectableInput(), '11-04-2017 09:08:07');
    await po.setText(po.daytimePickerInput(), '12-04-2017 09:08:07');
    await po.daytimePickerInput().click();
    await expect(await po.calendarDisabledDays().count()).toBe(25);
    await po.setText(po.daytimePickerInput(), '11-04-2017 09:06:07');
    await expect(await po.hourUpBtn()).toBeDisabled();
    await expect(await po.minuteUpBtn()).not.toBeDisabled();
    await expect(await po.meridiemUpBtn()).toBeDisabled();
    await expect(await po.meridiemDownBtn()).toBeDisabled();
  });

  test('should check that the selection of days is working', async () => {
    await po.setText(po.daytimePickerInput(), '11-04-2017 09:08:07');
    await expect(await po.selectedDays().count()).toEqual(1);
    await po.setText(po.daytimePickerInput(), ' ');

    await expect(await po.selectedDays().count()).toEqual(0);
  });
});
