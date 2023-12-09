import {DemoPage} from './app.po';
import dayjs from 'dayjs';
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
    await po.dayPickerMenu().click();
  });

  test('should check that the popup appended to body', async () => {
    await po.dayPickerInput().click();
    await expect(po.datePickerPopup()).toBeVisible();
    await po.clickOnBody();
    await expect(po.datePickerPopup()).toBeHidden();

    await po.showOnOutsideClick().click();
    await po.dayPickerInput().click();
    await po.clickOnBody();
    await expect(po.datePickerPopup()).toBeVisible();
  });

  test('should check that the theme is added and removed', async () => {
    await po.themeOnRadio().click();
    await po.dayPickerInput().click();
    await expect(po.datePickerPopup()).toHaveClass(/dp-material/);
    await po.themeOffRadio().click();
    await po.dayPickerInput().click();
    await expect(po.datePickerPopup()).not.toHaveClass(/dp-material/);
    await po.themeOnRadio().click();
    await po.dayPickerInput().click();
    await expect(po.datePickerPopup()).toHaveClass(/dp-material/);
  });

  test('should check that the onOpenDelay is working', async () => {
    await expect(po.datePickerPopup()).toBeHidden();

    await po.setText(po.onOpenDelayInput(), '1000');
    await po.openBtn().click();
    await expect(po.datePickerPopup()).toBeVisible();
    await po.clickOnBody();
    await po.sleep(200);
    await po.dayPickerInput().click();
    await expect(po.datePickerPopup()).toBeHidden();
    await po.sleep(1000);
    await expect(po.datePickerPopup()).toBeVisible();
  });

  test('should check that the showNearMonthDays is working as expected', async () => {
    await po.setText(po.dayPickerInput(), '27-03-2017');
    await po.dayPickerInput().click();
    await expect(await po.monthWeeks().count()).toBe(6);
    await po.hideNearMonthDaysRadio().click();
    await po.dayPickerInput().click();
    await expect(await po.monthWeeks().count()).toBe(5);

    await po.showNearMonthDaysRadio().click();
    await po.dayPickerInput().click();
    await expect(await po.monthWeeks().count()).toBe(6);

    await po.setText(po.dayPickerInput(), '27-04-2017');
    await po.hideNearMonthDaysRadio().click();
    await po.dayPickerInput().click();
    await expect(await po.monthWeeks().count()).toBe(6);
  });

  test('should show/hide week number according to configuration', async () => {
    await po.setText(po.dayPickerInput(), '28-03-2017');
    await po.dayPickerInput().click();
    await expect(await po.weekNumbers().count()).toBe(0);
    await po.showWeekNumbersRadio().click();
    await po.dayPickerInput().click();
    await expect(await po.weekNumbers().count()).toBe(6);
    await expect(await po.weekNumbers().allInnerTexts()).toEqual(['8', '9', '10', '11', '12', '13']);
  });

  test('should remember last position', async () => {
    await po.setText(po.dayPickerInput(), '28-03-2017');
    await po.dayPickerInput().click();
    await expect(await po.dayCalendarNavHeaderBtn().textContent()).toEqual('Mar, 2017');
    await po.currentLocationBtn().click();
    await expect(await po.dayCalendarNavHeaderBtn().textContent()).toEqual(dayjs().format('MMM, YYYY'));
  });

  test('should hide calendar on tab (blur)', async () => {
    await po.dayPickerInput().click();
    await expect(po.datePickerPopup()).toBeVisible();
    await po.dayPickerInput().focus();
    await page.keyboard.press('Tab');
    await expect(po.datePickerPopup()).toBeHidden();
  });

  test('should disable/enable month selection', async () => {
    await po.setText(po.dayPickerInput(), '08-04-2018');
    await po.dayPickerInput().click();
    await expect(po.dayCalendarNavHeaderBtn()).toBeVisible();
    await expect(po.dayCalendarContainer()).toBeVisible();
    await expect(await po.dayCalendarNavHeaderBtn().textContent()).toEqual('Apr, 2018');

    await po.dayCalendarNavHeaderBtn().click();
    await expect(po.dayCalendarContainer()).toBeHidden();
    await expect(po.monthCalendar()).toBeVisible();
    await expect(await po.dayCalendarNavMonthHeaderBtn().textContent()).toEqual('2018');

    await po.monthCalendarLeftNavBtn().click();
    await expect(await po.dayCalendarNavMonthHeaderBtn().textContent()).toEqual('2017');
    await expect(po.currentMonthCalendarBtn()).toBeHidden();
    await po.monthCalendarRightNavBtn().click();
    await expect(await po.dayCalendarNavMonthHeaderBtn().textContent()).toEqual('2018');

    await po.clickOnBody();
    await po.dayPickerInput().click();
    await expect(po.dayCalendarContainer()).toBeVisible();
    await expect(po.monthCalendar()).toBeHidden();
    await po.dayCalendarNavHeaderBtn().click();
    await expect(po.dayCalendarContainer()).toBeHidden();
    await expect(po.monthCalendar()).toBeVisible();

    await po.dayCalendarNavMonthHeaderBtn().click();
    await expect(po.dayCalendarContainer()).toBeVisible();
    await expect(po.monthCalendar()).toBeHidden();

    await po.disableMonthSelector().click();
    await expect(po.deyCalendarMonthNavHeader()).toBeHidden();
  });

  test('should change year format', async () => {
    await po.setText(po.dayPickerInput(), '08-04-2017');
    await po.dayPickerInput().click();
    await po.dayCalendarNavHeaderBtn().click();
    await expect(await po.dayCalendarNavMonthHeaderBtn().textContent()).toEqual('2017');

    await po.clickOnBody();

    await po.yearFormat().clear();
    await po.setText(po.yearFormat(), 'YY');

    await po.dayPickerInput().click();
    await po.dayCalendarNavHeaderBtn().click();
    await expect(await po.dayCalendarNavMonthHeaderBtn().textContent()).toEqual('17');
  });

  test('should check if enable/disable is working', async () => {
    await expect(po.dayPickerInput()).not.toBeDisabled();
    await po.pickerDisabledRadio().click();
    await expect(po.dayPickerInput()).toBeDisabled();
    await po.dayPickerInput().focus();
    await expect(await po.datePickerPopup()).toBeHidden();
    await po.pickerEnabledRadio().click();
    await expect(po.dayPickerInput()).not.toBeDisabled();
  });

  test('should check if enable/disable required validation is working', async () => {
    await po.clearInput(po.dayPickerInput());
    await po.clickOnBody();
    await expect(po.requiredValidationMsg()).toBeHidden();
    await po.enableRequiredValidationRadio().click();
    await expect(await po.requiredValidationMsg().textContent()).toEqual('required');
    await po.disableRequiredValidationRadio().click();
    await expect(po.requiredValidationMsg()).toBeHidden();
  });

  test('should check if min date validation is working', async () => {
    await po.minDateValidationPickerInput().clear();
    await expect(po.minDateValidationMsg()).toBeHidden();
    await po.setText(po.minDateValidationPickerInput(), '11-04-2017');
    await po.setText(po.dayPickerInput(), '10-04-2017');
    await expect(await po.minDateValidationMsg().textContent()).toEqual('minDate invalid');
    await po.setText(po.minDateValidationPickerInput(), '10-04-2017');
    await po.setText(po.minDateValidationPickerInput(), '10-04-2017');
    await expect(po.minDateValidationMsg()).toBeHidden();
  });

  test('should check if max date validation is working', async () => {
    await po.maxDateValidationPickerInput().clear();
    await expect(po.maxDateValidationMsg()).toBeHidden();
    await po.setText(po.maxDateValidationPickerInput(), '11-04-2017');
    await po.setText(po.dayPickerInput(), '12-04-2017');
    await expect(await po.maxDateValidationMsg().textContent()).toEqual('maxDate invalid');
    await po.clearInput(po.maxDateValidationPickerInput());
    await po.setText(po.maxDateValidationPickerInput(), '12-04-2017');
    await expect(po.maxDateValidationMsg()).toBeHidden();
  });

  test('should check that placeholder attribute is working', async () => {
    await po.setText(po.placeholderInput(), 'bla');
    await expect(await po.dayPickerInput().getAttribute('placeholder')).toEqual('bla');
  });

  test('should check the first day of the week', async () => {
    await po.dayPickerInput().click();
    await expect(await po.weekDayNames().textContent()).toEqual('SunMonTueWedThuFriSat');
    await po.clickOnBody();
    await po.firstDayOfWeekSelect().selectOption('mo');
    await po.dayPickerInput().click();
    await expect(await po.weekDayNames().textContent()).toEqual('MonTueWedThuFriSatSun');
  });

  test('should check month format', async () => {
    await po.dayPickerInput().click();
    await expect(await po.dayCalendarNavHeaderBtn().textContent()).toEqual(dayjs().format('MMM, YYYY'));
    await po.clickOnBody();
    await po.setText(po.monthFormatInput(), 'MM-YYYY');
    await po.dayPickerInput().click();
    await expect(await po.dayCalendarNavHeaderBtn().textContent()).toEqual(dayjs().format('MM-YYYY'));
  });

  test('should check that the min selectable option is working', async () => {
    await po.setText(po.minSelectableInput(), '11-04-2017');
    await po.setText(po.dayPickerInput(), '17-04-2017');
    await po.dayPickerInput().click();
    await expect(await po.calendarDisabledDays().count()).toBe(16);
  });

  test('should check that the max selectable option is working', async () => {
    await po.setText(po.maxSelectableInput(), '11-04-2017');
    await po.setText(po.dayPickerInput(), '12-04-2017');
    await po.dayPickerInput().click();
    await expect(await po.calendarDisabledDays().count()).toBe(25);
  });

  test('should check that the date picker popup closes/opened after selection ', async () => {
    await po.dayPickerInput().click();
    await po.clickOnDayButton('15');
    await expect(po.datePickerPopup()).toBeHidden();
    await po.noCloseOnSelect().click();
    await po.dayPickerInput().click();
    await po.clickOnDayButton('16');
    await expect(po.datePickerPopup()).toBeVisible();
  });

  test('should check that the close delay is working', async () => {
    await po.setText(po.closeDelayInput(), '1000');
    await po.dayPickerInput().click();
    await po.clickOnDayButton('15');
    await expect(po.datePickerPopup()).toBeVisible();
    await po.sleep(200);
    await expect(po.datePickerPopup()).toBeVisible();
    await po.sleep(1100);
    await expect(po.datePickerPopup()).toBeHidden();
  });

  test('should check weekday names', async () => {
    await po.setText(po.weekDaysFormatInput(), 'd');

    await po.dayPickerInput().click();
    await expect(await po.weekDayNames().textContent()).toEqual('0123456');
  });

  test('should check dateFormat is working', async () => {
    await po.setText(po.dateFormatInput(), 'DD');
    await po.dayPickerInput().click();
    await po.clickOnDayButton('15');
    await expect(await po.dayPickerInput()).toHaveValue('15');
  });

  test('should check allow multiselect is working', async () => {
    await po.enableMultiselect().click();
    await po.dayPickerInput().click();
    await po.setText(po.dayPickerInput(), dayjs().date(18).format('DD-MM-YYYY'));

    await po.clickOnDayButton('15');
    await po.clickOnDayButton('16');
    await expect(await po.selectedDays().count()).toBe(3);
    await expect(po.datePickerPopup()).toBeVisible();
    await expect(po.dayPickerInput()).toHaveValue(
      `${dayjs().date(18).format('DD-MM-YYYY')} | ${dayjs().date(15).format('DD-MM-YYYY')} | ${dayjs().date(16)
        .format('DD-MM-YYYY')}`,
    );

    await po.clickOnDayButton('18');
    await expect(await po.selectedDays().count()).toBe(2);
    await expect(po.dayPickerInput()).toHaveValue(
      `${dayjs().date(15).format('DD-MM-YYYY')} | ${dayjs().date(16).format('DD-MM-YYYY')}`,
    );
  });

  test('should check dayBtnFormat is working', async () => {
    await po.dayBtnFormatInput().clear();
    await po.setText(po.dayBtnFormatInput(), 'D');
    await po.dayPickerInput().click();
    await expect(await po.calendarFirstDayOfMonth().first().textContent()).toEqual('1');
  });

  test('should check monthBtnFormat is working', async () => {
    await po.monthBtnFormatInput().clear();
    await po.setText(po.monthBtnFormatInput(), 'M');
    await po.dayPickerInput().click();
    await po.dayCalendarNavHeaderBtn().click();
    await expect(await po.calendarFirstMonthOfYear().first().textContent()).toEqual('1');
  });

  test('should check showMultipleYearsNavigation is working', async () => {
    await po.dayPickerMenu().click();
    await po.dayPickerInput().click();
    await po.dayCalendarNavHeaderBtn().click();
    await expect(po.dayCalendarLeftSecondaryNavBtn()).toBeHidden();
    await expect(po.dayCalendarRightSecondaryNavBtn()).toBeHidden();

    await po.showMultipleYearsNavigation().click();
    await po.multipleYearsNavigateBy().clear();
    await po.setText(po.multipleYearsNavigateBy(), '20');
    await po.dayPickerInput().click();
    await po.dayCalendarNavHeaderBtn().click();
    await po.dayCalendarLeftSecondaryNavBtn().click();
    await expect(await po.dayCalendarNavMonthHeaderBtn().textContent()).toEqual(dayjs().subtract(20, 'year').format('YYYY'));

    await po.dayCalendarRightSecondaryNavBtn().click();
    await po.dayCalendarRightSecondaryNavBtn().click();
    await expect(await po.dayCalendarNavMonthHeaderBtn().textContent()).toEqual(dayjs().add(20, 'year').format('YYYY'));
  });
});
