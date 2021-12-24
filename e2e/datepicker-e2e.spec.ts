import {DemoPage} from './app.po';
import {browser, protractor} from 'protractor';
import * as dayjs from 'dayjs';

describe('dpDayPicker dayPicker', () => {

  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
    await page.dayPickerMenu.click();
  });

  it('should check that the popup appended to body', async () => {
    await page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    await page.clickOnBody();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);

    await page.showOnOutsideClick.click();
    await page.dayPickerInput.click();
    await page.clickOnBody();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should check that the theme is added and removed', async () => {
    await page.themeOnRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).toContain('dp-material');
    await page.themeOffRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).not.toContain('dp-material');
    await page.themeOnRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).toContain('dp-material');
  });

  it('should check that the onOpenDelay is working', async () => {
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);

    await page.scrollIntoView(page.onOpenDelayInput, true);
    await page.setInputValue(page.onOpenDelayInput, '1000');
    await page.openBtn.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    await page.clickOnBody();
    browser.sleep(200);
    await browser.waitForAngularEnabled(false);
    await page.scrollIntoView(page.dayPickerInput, true);
    await page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    await browser.waitForAngularEnabled(true);
    browser.sleep(1000);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should check that the showNearMonthDays is working as expected', async () => {
    await page.setInputValue(page.dayPickerInput, '27-03-2017');
    await page.dayPickerInput.click();
    expect(await page.monthWeeks.count()).toBe(6);
    await page.hideNearMonthDaysRadio.click();
    await page.dayPickerInput.click();
    expect(await page.monthWeeks.count()).toBe(5);

    await page.showNearMonthDaysRadio.click();
    await page.dayPickerInput.click();
    expect(await page.monthWeeks.count()).toBe(6);

    await page.setInputValue(page.dayPickerInput, '27-04-2017');
    await page.hideNearMonthDaysRadio.click();
    await page.dayPickerInput.click();
    expect(await page.monthWeeks.count()).toBe(6);
  });

  it('should show/hide week number according to configuration', async () => {
    await page.setInputValue(page.dayPickerInput, '28-03-2017');
    await page.dayPickerInput.click();
    expect(await page.weekNumbers.count()).toBe(0);
    await page.showWeekNumbersRadio.click();
    await page.dayPickerInput.click();
    expect(await page.weekNumbers.count()).toBe(6);
    expect(await page.weekNumbers.getText()).toEqual(['8', '9', '10', '11', '12', '13']);
  });

  it('should hide calendar on tab (blur)', async () => {
    await page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    await page.dayPickerInput.sendKeys(protractor.Key.TAB);
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
  });

  it('should disable/enable month selection', async () => {
    await page.setInputValue(page.dayPickerInput, '08-04-2018');
    await page.dayPickerInput.click();
    expect(await page.dayCalendarNavHeaderBtn.isPresent()).toBe(true);
    expect(await page.dayCalendarContainer.isDisplayed()).toBe(true);
    expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual('Apr, 2018');

    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarContainer.isPresent()).toBe(false);
    expect(await page.monthCalendar.isPresent()).toBe(true);
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2018');

    await page.monthCalendarLeftNavBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2017');
    expect(await page.currentMonthCalendarBtn.isPresent()).toBe(false);
    await page.monthCalendarRightNavBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2018');

    await page.clickOnBody();
    await page.dayPickerInput.click();
    expect(await page.dayCalendarContainer.isDisplayed()).toBe(true);
    expect(await page.monthCalendar.isPresent()).toBe(false);
    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarContainer.isPresent()).toBe(false);
    expect(await page.monthCalendar.isPresent()).toBe(true);

    await page.dayCalendarNavMonthHeaderBtn.click();
    expect(await page.dayCalendarContainer.isDisplayed()).toBe(true);
    expect(await page.monthCalendar.isPresent()).toBe(false);

    await page.disableMonthSelector.click();
    expect(await page.deyCalendarMonthNavHeader.isPresent()).toBe(false);
  });

  it('should change year format', async () => {
    await page.setInputValue(page.dayPickerInput, '08-04-2017');
    await page.dayPickerInput.click();
    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2017');

    await page.clickOnBody();

    await page.yearFormat.clear();
    await page.yearFormat.sendKeys('YY');

    await page.dayPickerInput.click();
    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('17');
  });

  it('should check if enable/disable is working', async () => {
    expect(await page.dayPickerInput.getAttribute('disabled')).toBe(null);
    await page.pickerDisabledRadio.click();
    expect(await page.dayPickerInput.getAttribute('disabled')).toEqual('true');
    await page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    await page.pickerEnabledRadio.click();
    expect(await page.dayPickerInput.getAttribute('disabled')).toBe(null);
  });

  it('should check if enable/disable required validation is working', async () => {
    await page.clearInput(page.dayPickerInput)
    await page.clickOnBody();
    expect(await page.requiredValidationMsg.isPresent()).toBe(false);
    await page.enableRequiredValidationRadio.click();
    expect(await page.requiredValidationMsg.getText()).toEqual('required');
    await page.disableRequiredValidationRadio.click();
    expect(await page.requiredValidationMsg.isPresent()).toBe(false);
  });

  it('should check if min date validation is working', async () => {
    await page.minDateValidationPickerInput.clear();
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
    await page.setInputValue(page.minDateValidationPickerInput, '11-04-2017');
    await page.setInputValue(page.dayPickerInput, '10-04-2017');
    expect(await page.minDateValidationMsg.getText()).toEqual('minDate invalid');
    await page.minDateValidationPickerInput.clear();
    await page.minDateValidationPickerInput.sendKeys('10-04-2017');
    await page.setInputValue(page.minDateValidationPickerInput, '10-04-2017');
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max date validation is working', async () => {
    await page.maxDateValidationPickerInput.clear();
    expect(await page.maxDateValidationMsg.isPresent()).toBe(false);
    await page.maxDateValidationPickerInput.sendKeys('11-04-2017');
    await page.dayPickerInput.sendKeys('12-04-2017');
    expect(await page.maxDateValidationMsg.getText()).toEqual('maxDate invalid');
    await page.maxDateValidationPickerInput.clear();
    await page.maxDateValidationPickerInput.sendKeys('12-04-2017');
    expect(await page.maxDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check that placeholder attribute is working', async () => {
    await page.placeholderInput.clear();
    await page.placeholderInput.sendKeys('bla');
    expect(await page.dayPickerInput.getAttribute('placeholder')).toEqual('bla');
  });

  it('should check the first day of the week', async () => {
    await page.dayPickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['SunMonTueWedThuFriSat']);
    await page.clickOnBody();
    await page.firstDayOfWeekMonday.click();
    await page.dayPickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['MonTueWedThuFriSatSun']);
  });

  it('should check month format', async () => {
    await page.dayPickerInput.click();
    expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(dayjs().format('MMM, YYYY'));
    await page.clickOnBody();
    await page.monthFormatInput.clear();
    await page.monthFormatInput.sendKeys('MM-YYYY');
    await page.dayPickerInput.click();
    expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(dayjs().format('MM-YYYY'));
  });

  it('should check that the min selectable option is working', async () => {
    await page.setInputValue(page.minSelectableInput, '11-04-2017');
    await page.setInputValue(page.dayPickerInput, '17-04-2017');
    await page.dayPickerInput.click();
    expect(await page.calendarDisabledDays.count()).toBe(16);
  });

  it('should check that the max selectable option is working', async () => {
    await page.setInputValue(page.maxSelectableInput, '11-04-2017');
    await page.setInputValue(page.dayPickerInput, '12-04-2017');
    await page.dayPickerInput.click();
    expect(await page.calendarDisabledDays.count()).toBe(25);
  });

  it('should check that the date picker popup closes/opened after selection ', async () => {
    await page.dayPickerInput.click();
    await page.clickOnDayButton('15');
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    await page.scrollIntoView(page.noCloseOnSelect, true);
    await page.noCloseOnSelect.click();
    await page.dayPickerInput.click();
    await page.clickOnDayButton('16');
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should check that the close delay is working', async () => {
    await page.scrollIntoView(page.closeDelayInput, true);
    await page.setInputValue(page.closeDelayInput, '1000');
    await page.dayPickerInput.click();
    await page.clickOnDayButton('15');
    await browser.waitForAngularEnabled(false);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    await browser.sleep(200);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    await browser.sleep(1000);
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
  });

  it('should check weekday names', async () => {
    await page.scrollIntoView(page.weekDaysFormatInput, true);
    await page.setInputValue(await page.weekDaysFormatInput, 'd');

    await page.dayPickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['0123456']);
  });

  it('should check dateFormat is working', async () => {
    await page.setInputValue(page.dateFormatInput, 'DD');
    await page.dayPickerInput.click();
    await page.clickOnDayButton('15');
    expect(await page.getInputVal(page.dayPickerInput)).toEqual('15');
  });

  it('should check allow multiselect is working', async () => {
    await page.enableMultiselect.click();
    await page.dayPickerInput.click();
    await page.setInputValue(page.dayPickerInput, dayjs().date(18).format('DD-MM-YYYY'));

    await page.clickOnDayButton('15');
    await page.clickOnDayButton('16');
    expect(await page.selectedDays.count()).toBe(3);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    expect(await page.getInputVal(page.dayPickerInput)).toEqual(
      `${dayjs().date(18).format('DD-MM-YYYY')} | ${dayjs().date(15).format('DD-MM-YYYY')} | ${dayjs().date(16)
        .format('DD-MM-YYYY')}`
    );

    await page.clickOnDayButton('18');
    expect(await page.selectedDays.count()).toBe(2);
    expect(await page.getInputVal(page.dayPickerInput)).toEqual(
      `${dayjs().date(15).format('DD-MM-YYYY')} | ${dayjs().date(16).format('DD-MM-YYYY')}`
    );
  });

  it('should check dayBtnFormat is working', async () => {
    await page.dayBtnFormatInput.clear();
    await page.dayBtnFormatInput.sendKeys('D');
    await page.dayPickerInput.click();
    expect(await page.calendarFirstDayOfMonth.getText()).toEqual('1');
  });

  it('should check monthBtnFormat is working', async () => {
    await page.monthBtnFormatInput.clear();
    await page.monthBtnFormatInput.sendKeys('M');
    await page.dayPickerInput.click();
    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.calendarFirstMonthOfYear.getText()).toEqual('1');
  });

  it('should check showMultipleYearsNavigation is working', async () => {
    await page.dayPickerMenu.click();
    await page.dayPickerInput.click();
    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);

    await page.showMultipleYearsNavigation.click();
    await page.multipleYearsNavigateBy.clear();
    await page.multipleYearsNavigateBy.sendKeys('20');
    await page.dayPickerInput.click();
    await page.dayCalendarNavHeaderBtn.click();
    await page.dayCalendarLeftSecondaryNavBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(dayjs().subtract(20, 'year').format('YYYY'));

    await page.dayCalendarRightSecondaryNavBtn.click();
    await page.dayCalendarRightSecondaryNavBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(dayjs().add(20, 'year').format('YYYY'));
  });
});
