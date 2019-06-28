import {DemoPage} from './app.po';
import {browser, protractor} from 'protractor';
import * as moment from 'moment';

describe('dpDayPicker dayPicker', () => {

  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();

    page.dateFormatInput.clear();
    page.dateFormatInput.sendKeys('DD-MM-YYYY');
    page.dayPickerMenu.click();
  });

  xit('should check that the popup appended to body', async () => {
    page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    page.clickOnBody();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);

    page.showOnOutsideClick.click();
    page.dayPickerInput.click();
    page.clickOnBody();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should check that the theme is added and removed', async () => {
    page.themeOnRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).toContain('dp-material');
    page.themeOffRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).not.toContain('dp-material');
    page.themeOnRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).toContain('dp-material');
  });

  it('should check that the onOpenDelay is working', async () => {
    page.onOpenDelayInput.clear();
    page.onOpenDelayInput.sendKeys(1000);
    page.scrollIntoView(page.openBtn);
    page.openBtn.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    page.clickOnBody();
    browser.sleep(200);
    browser.waitForAngularEnabled(false);
    page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    browser.waitForAngularEnabled(true);
    browser.sleep(1000);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should check that the showNearMonthDays is working as expected', async () => {
    page.dayPickerInput.clear();
    page.dayPickerInput.sendKeys('27-03-2017');
    page.dayPickerInput.click();
    expect(await page.monthWeeks.count()).toBe(6);
    page.hideNearMonthDaysRadio.click();
    page.dayPickerInput.click();
    expect(await page.monthWeeks.count()).toBe(5);

    page.showNearMonthDaysRadio.click();
    page.dayPickerInput.click();
    expect(await page.monthWeeks.count()).toBe(6);

    page.dayPickerInput.clear();
    page.dayPickerInput.sendKeys('27-04-2017');
    page.hideNearMonthDaysRadio.click();
    page.dayPickerInput.click();
    expect(await page.monthWeeks.count()).toBe(6);
  });

  it('should show/hide week number according to configuration', async () => {
    page.dayPickerInput.sendKeys('28-03-2017');
    page.dayPickerInput.click();
    expect(await page.weekNumbers.count()).toBe(0);
    page.showWeekNumbersRadio.click();
    page.dayPickerInput.click();
    expect(await page.weekNumbers.count()).toBe(6);
    expect(await page.weekNumbers.getText()).toEqual(['8', '9', '10', '11', '12', '13']);
  });

  it('should hide calendar on tab (blur)', async () => {
    page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    page.dayPickerInput.sendKeys(protractor.Key.TAB);
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
  });

  it('should disable/enable month selection', async () => {
    page.dayPickerInput.sendKeys('08-04-2018');
    page.dayPickerInput.click();
    expect(await page.dayCalendarNavHeaderBtn.isPresent()).toBe(true);
    expect(await page.dayCalendarContainer.isDisplayed()).toBe(true);
    expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual('Apr, 2018');

    page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarContainer.isPresent()).toBe(false);
    expect(await page.monthCalendar.isPresent()).toBe(true);
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2018');

    page.monthCalendarLeftNavBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2017');
    expect(await page.currentMonthCalendarBtn.isPresent()).toBe(false);
    page.monthCalendarRightNavBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2018');

    page.clickOnBody();
    page.dayPickerInput.click();
    expect(await page.dayCalendarContainer.isDisplayed()).toBe(true);
    expect(await page.monthCalendar.isPresent()).toBe(false);
    page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarContainer.isPresent()).toBe(false);
    expect(await page.monthCalendar.isPresent()).toBe(true);

    page.dayCalendarNavMonthHeaderBtn.click();
    expect(await page.dayCalendarContainer.isDisplayed()).toBe(true);
    expect(await page.monthCalendar.isPresent()).toBe(false);

    page.disableMonthSelector.click();
    expect(await page.deyCalendarMonthNavHeader.isPresent()).toBe(false);
  });

  it('should change year format', async () => {
    page.dayPickerInput.sendKeys('08-04-2017');
    page.dayPickerInput.click();
    page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2017');

    page.clickOnBody();

    page.yearFormat.clear();
    page.yearFormat.sendKeys('YY');

    page.dayPickerInput.click();
    page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('17');
  });

  it('should check if enable/disable is working', async () => {
    expect(await page.dayPickerInput.getAttribute('disabled')).toBe(null);
    page.pickerDisabledRadio.click();
    expect(await page.dayPickerInput.getAttribute('disabled')).toEqual('true');
    page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    page.pickerEnabledRadio.click();
    expect(await page.dayPickerInput.getAttribute('disabled')).toBe(null);
  });

  it('should check if enable/disable required validation is working', async () => {
    page.dayPickerInput.clear();
    expect(await page.requiredValidationMsg.isPresent()).toBe(false);
    page.enableRequiredValidationRadio.click();
    expect(await page.requiredValidationMsg.getText()).toEqual('required');
    page.disableRequiredValidationRadio.click();
    expect(await page.requiredValidationMsg.isPresent()).toBe(false);
  });

  it('should check if min date validation is working', async () => {
    page.minDateValidationPickerInput.clear();
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
    page.minDateValidationPickerInput.sendKeys('11-04-2017');
    page.dayPickerInput.sendKeys('10-04-2017');
    expect(await page.minDateValidationMsg.getText()).toEqual('minDate invalid');
    page.minDateValidationPickerInput.clear();
    page.minDateValidationPickerInput.sendKeys('10-04-2017');
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max date validation is working', async () => {
    page.maxDateValidationPickerInput.clear();
    expect(await page.maxDateValidationMsg.isPresent()).toBe(false);
    page.maxDateValidationPickerInput.sendKeys('11-04-2017');
    page.dayPickerInput.sendKeys('12-04-2017');
    expect(await page.maxDateValidationMsg.getText()).toEqual('maxDate invalid');
    page.maxDateValidationPickerInput.clear();
    page.maxDateValidationPickerInput.sendKeys('12-04-2017');
    expect(await page.maxDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check that placeholder attribute is working', async () => {
    page.placeholderInput.clear();
    page.placeholderInput.sendKeys('bla');
    expect(await page.dayPickerInput.getAttribute('placeholder')).toEqual('bla');
  });

  it('should check the first day of the week', async () => {
    page.dayPickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['SunMonTueWedThuFriSat']);
    page.clickOnBody();
    page.firstDayOfWeekMonday.click();
    page.dayPickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['MonTueWedThuFriSatSun']);
  });

  it('should check month format', async () => {
    page.dayPickerInput.click();
    expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(moment().format('MMM, YYYY'));
    page.clickOnBody();
    page.monthFormatInput.clear();
    page.monthFormatInput.sendKeys('MM-YYYY');
    page.dayPickerInput.click();
    expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(moment().format('MM-YYYY'));
  });

  it('should check that the min selectable option is working', async () => {
    page.minSelectableInput.clear();
    page.minSelectableInput.sendKeys('11-04-2017');
    page.dayPickerInput.sendKeys('17-04-2017');
    page.dayPickerInput.click();
    expect(await page.calendarDisabledDays.count()).toBe(16);
  });

  it('should check that the max selectable option is working', async () => {
    page.maxSelectableInput.clear();
    page.maxSelectableInput.sendKeys('11-04-2017');
    page.dayPickerInput.sendKeys('12-04-2017');
    page.dayPickerInput.click();
    expect(await page.calendarDisabledDays.count()).toBe(25);
  });

  it('should check that the date picker popup closes/opened after selection ', async () => {
    page.dayPickerInput.click();
    page.clickOnDayButton('15');
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    page.noCloseOnSelect.click();
    page.dayPickerInput.click();
    page.clickOnDayButton('16');
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should check that the close delay is working', async () => {
    page.closeDelayInput.clear();
    page.closeDelayInput.sendKeys(1000);
    page.dayPickerInput.click();
    page.clickOnDayButton('15');
    browser.waitForAngularEnabled(false);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    browser.sleep(200);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    browser.sleep(600);
    browser.waitForAngularEnabled(true);
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
  });

  it('should check weekday names', async () => {
    page.weekDaysFormatInput.clear();
    page.weekDaysFormatInput.sendKeys('d');

    page.dayPickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['0123456']);
  });

  it('should check dateFormat is working', async () => {
    page.dateFormatInput.clear();
    page.dateFormatInput.sendKeys('DD');
    page.dayPickerInput.click();
    page.clickOnDayButton('15');
    expect(await page.dayPickerInput.getAttribute('value')).toEqual('15');
  });

  it('should check allow multiselect is working', async () => {
    page.enableMultiselect.click();
    page.dayPickerInput.click();
    page.dayPickerInput.sendKeys(moment().date(18).format('DD-MM-YYYY'));

    page.clickOnDayButton('15');
    page.clickOnDayButton('16');
    expect(await page.selectedDays.count()).toBe(3);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    expect(await page.dayPickerInput.getAttribute('value')).toEqual(
      `${moment().date(18).format('DD-MM-YYYY')} | ${moment().date(15).format('DD-MM-YYYY')} | ${moment().date(16)
        .format('DD-MM-YYYY')}`
    );

    page.clickOnDayButton('18');
    expect(await page.selectedDays.count()).toBe(2);
    expect(await page.dayPickerInput.getAttribute('value')).toEqual(
      `${moment().date(15).format('DD-MM-YYYY')} | ${moment().date(16).format('DD-MM-YYYY')}`
    );
  });

  it('should check dayBtnFormat is working', async () => {
    page.dayBtnFormatInput.clear();
    page.dayBtnFormatInput.sendKeys('D');
    page.dayPickerInput.click();
    expect(await page.calendarFirstDayOfMonth.getText()).toEqual('1');
  });

  it('should check monthBtnFormat is working', async () => {
    page.monthBtnFormatInput.clear();
    page.monthBtnFormatInput.sendKeys('M');
    page.dayPickerInput.click();
    page.dayCalendarNavHeaderBtn.click();
    expect(await page.calendarFirstMonthOfYear.getText()).toEqual('1');
  });

  it('should check showMultipleYearsNavigation is working', async () => {
    page.dayPickerMenu.click();
    page.dayPickerInput.click();
    page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);

    page.showMultipleYearsNavigation.click();
    page.multipleYearsNavigateBy.clear();
    page.multipleYearsNavigateBy.sendKeys('20');
    page.dayPickerInput.click();
    page.dayCalendarNavHeaderBtn.click();
    page.dayCalendarLeftSecondaryNavBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(moment().subtract(20, 'year').format('YYYY'));

    page.dayCalendarRightSecondaryNavBtn.click();
    page.dayCalendarRightSecondaryNavBtn.click();
    expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(moment().add(20, 'year').format('YYYY'));
  });
});
