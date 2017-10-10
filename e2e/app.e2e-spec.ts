import {DemoPage} from './app.po';
import {browser, protractor} from 'protractor';
import * as moment from 'moment';

describe('ng2-date-picker App', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  describe('dpDayPicker configuration', () => {
    beforeEach(() => {
      page.daytimePickerMenu.click();
    });

    it('openOnClick = false, should not open picker when clicked', () => {
      page.openOnClickRadioOff.click();
      page.openOnFocusRadioOff.click();
      page.daytimePickerInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
    });

    it('openOnClick = true, should open picker when clicked', () => {
      page.openOnClickRadioOn.click();
      page.openOnFocusRadioOff.click();
      page.daytimePickerInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
    });
  });

  describe('dpDayPicker directive', () => {
    beforeEach(() => {
      page.dayDirectiveMenu.click();
    });

    it('should check that the popup appended to body', () => {
      page.dayDirectiveInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      page.clickOnBody();
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
    });

    it('should make sure that day directive keeps the prev state of the calendar', () => {
      page.dayDirectiveInput.click();
      page.dayCalendarLeftNavBtn.click();
      page.clickOnBody();

      page.dayDirectiveInput.click();
      expect(page.dayCalendarNavHeaderBtn.getText())
        .toEqual(moment().subtract(1, 'month').format('MMM, YYYY'));
    });

    it('should check that the theme is added and removed', () => {
      page.themeOnRadio.click();
      expect(page.datePickerPopup.getAttribute('class')).toContain('dp-material');
      page.themeOffRadio.click();
      expect(page.datePickerPopup.getAttribute('class')).not.toContain('dp-material');
      page.themeOnRadio.click();
      expect(page.datePickerPopup.getAttribute('class')).toContain('dp-material');
    });

    it('should check that the onOpenDelay is working', () => {
      page.onOpenDelayInput.clear();
      page.onOpenDelayInput.sendKeys(1000);
      page.scrollIntoView(page.openBtn);
      page.openBtn.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      page.clickOnBody();
      browser.sleep(200);
      browser.waitForAngularEnabled(false);
      page.dayDirectiveInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
      browser.waitForAngularEnabled(true);
      browser.sleep(1000);
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
    });
  });

  describe('dpDayPicker reactive directive', () => {
    beforeEach(() => {
      page.dateFormatInput.clear();
      page.dateFormatInput.sendKeys('DD-MM-YYYY');
      page.dayDirectiveReactiveMenu.click();
    });

    it('should check that the popup appended to body', () => {
      page.dayReactiveDirectivePickerInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      page.clickOnBody();
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
    });

    it('should check that the theme is added and removed', () => {
      page.themeOnRadio.click();
      expect(page.datePickerPopup.getAttribute('class')).toContain('dp-material');
      page.themeOffRadio.click();
      expect(page.datePickerPopup.getAttribute('class')).not.toContain('dp-material');
      page.themeOnRadio.click();
      expect(page.datePickerPopup.getAttribute('class')).toContain('dp-material');
    });

    it('should check that the onOpenDelay is working', () => {
      page.onOpenDelayInput.clear();
      page.onOpenDelayInput.sendKeys(1000);
      page.scrollIntoView(page.openBtn);
      page.openBtn.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      page.clickOnBody();
      browser.sleep(200);
      browser.waitForAngularEnabled(false);
      page.dayReactiveDirectivePickerInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
      browser.waitForAngularEnabled(true);
      browser.sleep(1000);
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
    });

    it('should check if enable/disable required validation is working', () => {
      page.dayReactiveDirectivePickerInput.clear();
      expect(page.reactiveRequiredValidationMsg.isPresent()).toBe(false);
      page.enableRequiredValidationRadio.click();
      expect(page.reactiveRequiredValidationMsg.getText()).toEqual('required');
      page.disableRequiredValidationRadio.click();
      expect(page.reactiveRequiredValidationMsg.isPresent()).toBe(false);
    });

    it('should check if min date validation is working', () => {
      page.minDateValidationPickerInput.clear();
      expect(page.reactiveMinDateValidationMsg.isPresent()).toBe(false);
      page.minDateValidationPickerInput.sendKeys('11-04-2017');
      page.dayReactiveDirectivePickerInput.sendKeys('10-04-2017');
      page.clickOnBody();
      expect(page.reactiveMinDateValidationMsg.getText()).toEqual('minDate invalid');
      page.minDateValidationPickerInput.clear();
      page.minDateValidationPickerInput.sendKeys('10-04-2017');
      expect(page.reactiveMinDateValidationMsg.isPresent()).toBe(false);
    });

    it('should check if max date validation is working', () => {
      page.maxDateValidationPickerInput.clear();
      expect(page.reactiveMaxDateValidationMsg.isPresent()).toBe(false);
      page.maxDateValidationPickerInput.sendKeys('11-04-2017');
      page.dayReactiveDirectivePickerInput.sendKeys('12-04-2017');
      page.clickOnBody();
      expect(page.reactiveMaxDateValidationMsg.getText()).toEqual('maxDate invalid');
      page.maxDateValidationPickerInput.clear();
      page.maxDateValidationPickerInput.sendKeys('12-04-2017');
      expect(page.reactiveMaxDateValidationMsg.isPresent()).toBe(false);
    });
  });

  describe('dpDayPicker timePicker', () => {
    beforeEach(() => {
      page.timePickerMenu.click();
      page.dateFormatInput.clear();
      page.dateFormatInput.sendKeys('HH:mm:ss');
    });

    it('should check if min time validation is working', () => {
      page.minTimeValidationPickerInput.clear();
      expect(page.timePickerMinTimeValidationMsg.isPresent()).toBe(false);
      page.minTimeValidationPickerInput.clear();
      page.minTimeValidationPickerInput.sendKeys('10:11:12');
      page.timePickerInput.click();
      page.timePickerInput.clear();
      page.timePickerInput.sendKeys('09:00:00');
      page.clickOnBody();
      expect(page.timePickerMinTimeValidationMsg.getText()).toEqual('minTime invalid');
      page.minTimeValidationPickerInput.clear();
      page.minTimeValidationPickerInput.sendKeys('08:07:06');
      page.clickOnBody();
      expect(page.timePickerMinTimeValidationMsg.isPresent()).toBe(false);
    });

    it('should check if max time validation is working', () => {
      page.maxTimeValidationPickerInput.clear();
      expect(page.timePickerMaxTimeValidationMsg.isPresent()).toBe(false);
      page.maxTimeValidationPickerInput.clear();
      page.maxTimeValidationPickerInput.sendKeys('08:07:06');
      page.timePickerInput.click();
      page.timePickerInput.clear();
      page.timePickerInput.sendKeys('09:00:00');
      page.clickOnBody();
      expect(page.timePickerMaxTimeValidationMsg.getText()).toEqual('maxTime invalid');
      page.maxTimeValidationPickerInput.clear();
      page.maxTimeValidationPickerInput.sendKeys('10:11:12');
      expect(page.timePickerMaxTimeValidationMsg.isPresent()).toBe(false);
    });

    it('should check that the min selectable time option is working', () => {
      page.minTimeInput.click();
      page.minTimeInput.clear();
      page.minTimeInput.sendKeys('08:07:06');
      page.timePickerInput.click();
      page.timePickerInput.clear();
      page.timePickerInput.sendKeys('09:00:00');
      expect(page.hourDownBtn.getAttribute('disabled')).toEqual('true');
      expect(page.minuteDownBtn.getAttribute('disabled')).toBe(null);
      expect(page.meridiemUpBtn.getAttribute('disabled')).toBe(null);
      expect(page.meridiemDownBtn.getAttribute('disabled')).toBe(null);
    });

    it('should check that the max selectable time option is working', () => {
      page.maxTimeInput.click();
      page.maxTimeInput.clear();
      page.maxTimeInput.sendKeys('09:07:06');
      page.timePickerInput.click();
      page.timePickerInput.clear();
      page.timePickerInput.sendKeys('09:00:00');
      expect(page.hourUpBtn.getAttribute('disabled')).toEqual('true');
      expect(page.minuteUpBtn.getAttribute('disabled')).toBe(null);
      expect(page.meridiemUpBtn.getAttribute('disabled')).toEqual('true');
      expect(page.meridiemDownBtn.getAttribute('disabled')).toEqual('true');
    });

    it('should check that the 12 hour time format options work', () => {
      page.showSeconds.click();
      page.hours12FormatInput.clear();
      page.hours12FormatInput.sendKeys('h');
      page.minutesFormatInput.clear();
      page.minutesFormatInput.sendKeys('m');
      page.secondsFormatInput.clear();
      page.secondsFormatInput.sendKeys('s');
      page.meridiemFormatInput.clear();
      page.meridiemFormatInput.sendKeys('a');
      page.timeSeparatorInput.clear();
      page.timeSeparatorInput.sendKeys('-');
      page.timePickerInput.click();
      page.timePickerInput.clear();
      page.timePickerInput.sendKeys('09:08:07');
      expect(page.hourDisplay.getText()).toEqual('9');
      expect(page.minuteDisplay.getText()).toEqual('8');
      expect(page.secondDisplay.getText()).toEqual('7');
      expect(page.meridiemDisplay.getText()).toEqual('am');
      expect(page.timeSeparatorDisplay.getText()).toEqual('-');
    });

    it('should check that the 24 hour time format options work', () => {
      page.showTwentyFourHours.click();
      page.showSeconds.click();
      page.hours24FormatInput.clear();
      page.hours24FormatInput.sendKeys('H');
      page.minutesFormatInput.clear();
      page.minutesFormatInput.sendKeys('m');
      page.secondsFormatInput.clear();
      page.secondsFormatInput.sendKeys('s');
      page.timeSeparatorInput.clear();
      page.timeSeparatorInput.sendKeys('-');
      page.timePickerInput.click();
      page.timePickerInput.clear();
      page.timePickerInput.sendKeys('09:08:07');
      expect(page.hourDisplay.getText()).toEqual('9');
      expect(page.minuteDisplay.getText()).toEqual('8');
      expect(page.secondDisplay.getText()).toEqual('7');
      expect(page.timeSeparatorDisplay.getText()).toEqual('-');
    });

    it('should check that the interval options work', () => {
      page.showSeconds.click();
      page.minutesIntervalInput.clear();
      page.minutesIntervalInput.sendKeys('6');
      page.secondsIntervalInput.clear();
      page.secondsIntervalInput.sendKeys('7');
      page.timePickerInput.click();
      page.timePickerInput.clear();
      page.timePickerInput.sendKeys('09:08:07');
      page.minuteUpBtn.click();
      expect(page.minuteDisplay.getText()).toEqual('14');
      expect(page.timePickerInput.getAttribute('value')).toEqual('09:14:07');
      page.minuteDownBtn.click();
      expect(page.minuteDisplay.getText()).toEqual('08');
      expect(page.timePickerInput.getAttribute('value')).toEqual('09:08:07');
      page.secondUpBtn.click();
      expect(page.secondDisplay.getText()).toEqual('14');
      expect(page.timePickerInput.getAttribute('value')).toEqual('09:08:14');
      page.secondDownBtn.click();
      expect(page.secondDisplay.getText()).toEqual('07');
      expect(page.timePickerInput.getAttribute('value')).toEqual('09:08:07');
    });
  });

  describe('dpDayPicker daytimePicker', () => {
    beforeEach(() => {
      page.dateFormatInput.clear();
      page.dateFormatInput.sendKeys('DD-MM-YYYY HH:mm:ss');
      page.daytimePickerMenu.click();
    });

    it('should check if min date validation is working', () => {
      page.minDateValidationPickerInput.clear();
      expect(page.minDateValidationMsg.isPresent()).toBe(false);
      page.minDateValidationPickerInput.sendKeys('10-04-2017 10:08:07');
      page.daytimePickerInput.sendKeys('10-04-2017 09:08:07');
      expect(page.minDateValidationMsg.getText()).toEqual('minDate invalid');
      page.minDateValidationPickerInput.clear();
      page.minDateValidationPickerInput.sendKeys('10-04-2017 09:08:07');
      expect(page.minDateValidationMsg.isPresent()).toBe(false);
    });

    it('should check if max date validation is working', () => {
      page.maxDateValidationPickerInput.clear();
      expect(page.maxDateValidationMsg.isPresent()).toBe(false);
      page.maxDateValidationPickerInput.sendKeys('12-04-2017 08:08:07');
      page.daytimePickerInput.sendKeys('12-04-2017 09:08:07');
      expect(page.maxDateValidationMsg.getText()).toEqual('maxDate invalid');
      page.maxDateValidationPickerInput.clear();
      page.maxDateValidationPickerInput.sendKeys('12-04-2017 09:08:07');
      expect(page.maxDateValidationMsg.isPresent()).toBe(false);
    });

    it('should check that the min selectable option is working', () => {
      page.minSelectableInput.clear();
      page.minSelectableInput.sendKeys('11-04-2017 09:08:07');
      page.daytimePickerInput.sendKeys('17-04-2017 09:08:07');
      page.daytimePickerInput.click();
      expect(page.calendarDisabledDays.count()).toBe(16);
      page.daytimePickerInput.clear();
      page.daytimePickerInput.sendKeys('11-04-2017 09:18:07');
      expect(page.hourDownBtn.getAttribute('disabled')).toEqual('true');
      expect(page.minuteDownBtn.getAttribute('disabled')).toBe(null);
      expect(page.meridiemUpBtn.getAttribute('disabled')).toBe(null);
      expect(page.meridiemDownBtn.getAttribute('disabled')).toBe(null);
    });

    it('should check that the max selectable option is working', () => {
      page.maxSelectableInput.clear();
      page.maxSelectableInput.sendKeys('11-04-2017 09:08:07');
      page.daytimePickerInput.sendKeys('12-04-2017 09:08:07');
      page.daytimePickerInput.click();
      expect(page.calendarDisabledDays.count()).toBe(25);
      page.daytimePickerInput.clear();
      page.daytimePickerInput.sendKeys('11-04-2017 09:06:07');
      expect(page.hourUpBtn.getAttribute('disabled')).toEqual('true');
      expect(page.minuteUpBtn.getAttribute('disabled')).toBe(null);
      expect(page.meridiemUpBtn.getAttribute('disabled')).toBe('true');
      expect(page.meridiemDownBtn.getAttribute('disabled')).toBe('true');
    });
  });

  describe('dpDayPicker dayPicker', () => {
    beforeEach(() => {
      page.dateFormatInput.clear();
      page.dateFormatInput.sendKeys('DD-MM-YYYY');
      page.dayPickerMenu.click();
    });

    it('should check that the popup appended to body', () => {
      page.dayPickerInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      page.clickOnBody();
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
    });

    it('should check that the theme is added and removed', () => {
      page.themeOnRadio.click();
      expect(page.datePickerPopup.getAttribute('class')).toContain('dp-material');
      page.themeOffRadio.click();
      expect(page.datePickerPopup.getAttribute('class')).not.toContain('dp-material');
      page.themeOnRadio.click();
      expect(page.datePickerPopup.getAttribute('class')).toContain('dp-material');
    });

    it('should check that the onOpenDelay is working', () => {
      page.onOpenDelayInput.clear();
      page.onOpenDelayInput.sendKeys(1000);
      page.openBtn.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      page.clickOnBody();
      browser.sleep(200);
      browser.waitForAngularEnabled(false);
      page.dayPickerInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
      browser.waitForAngularEnabled(true);
      browser.sleep(1000);
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
    });

    it('should check that the showNearMonthDays is working as expected', () => {
      page.dayPickerInput.clear();
      page.dayPickerInput.sendKeys('27-03-2017');
      page.dayPickerInput.click();
      expect(page.monthWeeks.count()).toBe(6);
      page.hideNearMonthDaysRadio.click();
      page.dayPickerInput.click();
      expect(page.monthWeeks.count()).toBe(5);

      page.showNearMonthDaysRadio.click();
      page.dayPickerInput.click();
      expect(page.monthWeeks.count()).toBe(6);

      page.dayPickerInput.clear();
      page.dayPickerInput.sendKeys('27-04-2017');
      page.hideNearMonthDaysRadio.click();
      page.dayPickerInput.click();
      expect(page.monthWeeks.count()).toBe(6);
    });

    it('should show/hide week number according to configuration', () => {
      page.dayPickerInput.sendKeys('28-03-2017');
      page.dayPickerInput.click();
      expect(page.weekNumbers.count()).toBe(0);
      page.showWeekNumbersRadio.click();
      page.dayPickerInput.click();
      expect(page.weekNumbers.count()).toBe(6);
      expect(page.weekNumbers.getText()).toEqual(['8', '9', '10', '11', '12', '13']);
    });

    it('should hide calendar on tab (blur)', () => {
      page.dayPickerInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      page.dayPickerInput.sendKeys(protractor.Key.TAB);
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
    });

    it('should disable/enable month selection', () => {
      page.dayPickerInput.sendKeys('08-04-2017');
      page.dayPickerInput.click();
      expect(page.dayCalendarNavHeaderBtn.isPresent()).toBe(true);
      expect(page.dayCalendarContainer.isDisplayed()).toBe(true);
      expect(page.dayCalendarNavHeaderBtn.getText()).toEqual('Apr, 2017');

      page.dayCalendarNavHeaderBtn.click();
      expect(page.dayCalendarContainer.isDisplayed()).toBe(false);
      expect(page.monthCalendar.isPresent()).toBe(true);
      expect(page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2017');
      expect(page.currentMonthCalendarBtn.getText()).toEqual(moment().format('MMM'));
      page.monthCalendarLeftNavBtn.click();
      expect(page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2016');
      expect(page.currentMonthCalendarBtn.isPresent()).toBe(false);
      page.monthCalendarRightNavBtn.click();
      expect(page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2017');
      expect(page.currentMonthCalendarBtn.getText()).toEqual(moment().format('MMM'));

      page.clickOnBody();
      page.dayPickerInput.click();
      expect(page.dayCalendarContainer.isDisplayed()).toBe(true);
      expect(page.monthCalendar.isPresent()).toBe(false);
      page.dayCalendarNavHeaderBtn.click();
      expect(page.dayCalendarContainer.isDisplayed()).toBe(false);
      expect(page.monthCalendar.isPresent()).toBe(true);

      page.dayCalendarNavMonthHeaderBtn.click();
      expect(page.dayCalendarContainer.isDisplayed()).toBe(true);
      expect(page.monthCalendar.isPresent()).toBe(false);

      page.disableMonthSelector.click();
      expect(page.deyCalendarMonthNavHeader.isPresent()).toBe(false);
    });

    it('should change year format', () => {
      page.dayPickerInput.sendKeys('08-04-2017');
      page.dayPickerInput.click();
      page.dayCalendarNavHeaderBtn.click();
      expect(page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('2017');

      page.clickOnBody();

      page.yearFormat.clear();
      page.yearFormat.sendKeys('YY');

      page.dayPickerInput.click();
      page.dayCalendarNavHeaderBtn.click();
      expect(page.dayCalendarNavMonthHeaderBtn.getText()).toEqual('17');
    });

    it('should check if go to current location btn is working as expected', () => {
      expect(page.currentLocationBtn.isDisplayed()).toBe(false);
      page.dayPickerInput.sendKeys('08-04-2017');
      expect(page.dayCalendarNavHeaderBtn.getText()).toEqual(moment('08-04-2017', 'DD-MM-YYYY').format('MMM, YYYY'));
      page.dayPickerInput.click();
      expect(page.currentLocationBtn.isDisplayed()).toBe(true);
      page.currentLocationBtn.click();
      expect(page.dayCalendarNavHeaderBtn.getText()).toEqual(moment().format('MMM, YYYY'));

      page.hideGoToCurrentRadio.click();
      expect(page.currentLocationBtn.isPresent()).toBe(false);
    });

    it('should check if enable/disable is working', () => {
      expect(page.dayPickerInput.getAttribute('disabled')).toBe(null);
      page.pickerDisabledRadio.click();
      expect(page.dayPickerInput.getAttribute('disabled')).toEqual('true');
      page.dayPickerInput.click();
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
      page.pickerEnabledRadio.click();
      expect(page.dayPickerInput.getAttribute('disabled')).toBe(null);
    });

    it('should check if enable/disable required validation is working', () => {
      page.dayPickerInput.clear();
      expect(page.requiredValidationMsg.isPresent()).toBe(false);
      page.enableRequiredValidationRadio.click();
      expect(page.requiredValidationMsg.getText()).toEqual('required');
      page.disableRequiredValidationRadio.click();
      expect(page.requiredValidationMsg.isPresent()).toBe(false);
    });

    it('should check if min date validation is working', () => {
      page.minDateValidationPickerInput.clear();
      expect(page.minDateValidationMsg.isPresent()).toBe(false);
      page.minDateValidationPickerInput.sendKeys('11-04-2017');
      page.dayPickerInput.sendKeys('10-04-2017');
      expect(page.minDateValidationMsg.getText()).toEqual('minDate invalid');
      page.minDateValidationPickerInput.clear();
      page.minDateValidationPickerInput.sendKeys('10-04-2017');
      expect(page.minDateValidationMsg.isPresent()).toBe(false);
    });

    it('should check if max date validation is working', () => {
      page.maxDateValidationPickerInput.clear();
      expect(page.maxDateValidationMsg.isPresent()).toBe(false);
      page.maxDateValidationPickerInput.sendKeys('11-04-2017');
      page.dayPickerInput.sendKeys('12-04-2017');
      expect(page.maxDateValidationMsg.getText()).toEqual('maxDate invalid');
      page.maxDateValidationPickerInput.clear();
      page.maxDateValidationPickerInput.sendKeys('12-04-2017');
      expect(page.maxDateValidationMsg.isPresent()).toBe(false);
    });

    it('should check that placeholder attribute is working', () => {
      page.placeholderInput.clear();
      page.placeholderInput.sendKeys('bla');
      expect(page.dayPickerInput.getAttribute('placeholder')).toEqual('bla');
    });

    it('should check the first day of the week', () => {
      page.dayPickerInput.click();
      expect(page.weekDayNames.getText()).toEqual(['Sun Mon Tue Wed Thu Fri Sat']);
      page.clickOnBody();
      page.firstDayOfWeekMonday.click();
      page.dayPickerInput.click();
      expect(page.weekDayNames.getText()).toEqual(['Mon Tue Wed Thu Fri Sat Sun']);
    });

    it('should check month format', () => {
      page.dayPickerInput.click();
      expect(page.dayCalendarNavHeaderBtn.getText()).toEqual(moment().format('MMM, YYYY'));
      page.clickOnBody();
      page.monthFormatInput.clear();
      page.monthFormatInput.sendKeys('MM-YYYY');
      page.dayPickerInput.click();
      expect(page.dayCalendarNavHeaderBtn.getText()).toEqual(moment().format('MM-YYYY'));
    });

    it('should check that the min selectable option is working', () => {
      page.minSelectableInput.clear();
      page.minSelectableInput.sendKeys('11-04-2017');
      page.dayPickerInput.sendKeys('17-04-2017');
      page.dayPickerInput.click();
      expect(page.calendarDisabledDays.count()).toBe(16);
    });

    it('should check that the max selectable option is working', () => {
      page.maxSelectableInput.clear();
      page.maxSelectableInput.sendKeys('11-04-2017');
      page.dayPickerInput.sendKeys('12-04-2017');
      page.dayPickerInput.click();
      expect(page.calendarDisabledDays.count()).toBe(25);
    });

    it('should check that the date picker popup closes/opened after selection ', () => {
      page.dayPickerInput.click();
      page.clickOnDayButton('15');
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
      page.noCloseOnSelect.click();
      page.dayPickerInput.click();
      page.clickOnDayButton('16');
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
    });

    it('should check that the close delay is working', () => {
      page.closeDelayInput.clear();
      page.closeDelayInput.sendKeys(1000);
      page.dayPickerInput.click();
      page.clickOnDayButton('15');
      browser.waitForAngularEnabled(false);
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      browser.sleep(200);
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      browser.sleep(600);
      browser.waitForAngularEnabled(true);
      expect(page.datePickerPopup.isDisplayed()).toBe(false);
    });

    it('should check weekday names', () => {
      page.weekDaysFormatInput.clear();
      page.weekDaysFormatInput.sendKeys('d');

      page.dayPickerInput.click();
      expect(page.weekDayNames.getText()).toEqual(['0 1 2 3 4 5 6']);
    });

    it('should check dateFormat is working', () => {
      page.dateFormatInput.clear();
      page.dateFormatInput.sendKeys('DD');
      page.dayPickerInput.click();
      page.clickOnDayButton('15');
      expect(page.dayPickerInput.getAttribute('value')).toEqual('15');
    });

    it('should check allow multiselect is working', () => {
      page.enableMultiselect.click();
      page.dayPickerInput.click();
      page.dayPickerInput.sendKeys(moment().date(18).format('DD-MM-YYYY'));

      page.clickOnDayButton('15');
      page.clickOnDayButton('16');
      expect(page.selectedDays.count()).toBe(3);
      expect(page.datePickerPopup.isDisplayed()).toBe(true);
      expect(page.dayPickerInput.getAttribute('value')).toEqual(
        `${moment().date(18).format('DD-MM-YYYY')}, ${moment().date(15).format('DD-MM-YYYY')}, ${moment().date(16)
          .format('DD-MM-YYYY')}`
      );

      page.clickOnDayButton('18');
      expect(page.selectedDays.count()).toBe(2);
      expect(page.dayPickerInput.getAttribute('value')).toEqual(
        `${moment().date(15).format('DD-MM-YYYY')}, ${moment().date(16).format('DD-MM-YYYY')}`
      );
    });

    it('should check dayBtnFormat is working', () => {
      page.dayBtnFormatInput.clear();
      page.dayBtnFormatInput.sendKeys('D');
      page.dayPickerInput.click();
      expect(page.calendarFirstDayOfMonth.getText()).toEqual('1');
    });

    it('should check monthBtnFormat is working', () => {
      page.monthBtnFormatInput.clear();
      page.monthBtnFormatInput.sendKeys('M');
      page.dayPickerInput.click();
      page.dayCalendarNavHeaderBtn.click();
      expect(page.calendarFirstMonthOfYear.getText()).toEqual('1');
    });

    it('should check showMultipleYearsNavigation is working', () => {
      page.dayPickerMenu.click();
      page.dayPickerInput.click();
      page.dayCalendarNavHeaderBtn.click();
      expect(page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
      expect(page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);

      page.showMultipleYearsNavigation.click();
      page.multipleYearsNavigateBy.clear();
      page.multipleYearsNavigateBy.sendKeys('20');
      page.dayPickerInput.click();
      page.dayCalendarNavHeaderBtn.click();
      page.dayCalendarLeftSecondaryNavBtn.click();
      expect(page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(moment().subtract(20, 'year').format('YYYY'));

      page.dayCalendarRightSecondaryNavBtn.click();
      page.dayCalendarRightSecondaryNavBtn.click();
      expect(page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(moment().add(20, 'year').format('YYYY'));
    });
  });

  describe('Locales', () => {
    fit('should check day time picker locale', () => {
      page.hebrewLocale.click();

      page.daytimePickerMenu.click();
      page.daytimePickerInput.click();
      expect(page.weekDayNames.getText()).toEqual(['א׳ ב׳ ג׳ ד׳ ה׳ ו׳ ש׳']);

      page.daytimeInlineMenu.click();
      expect(page.weekDayInline.getText()).toEqual(['א׳ ב׳ ג׳ ד׳ ה׳ ו׳ ש׳']);

      page.daytimeDirectiveMenu.click();
      page.daytimeDirectiveInput.click();
      expect(page.weekDayNames.getText()).toEqual(['א׳ ב׳ ג׳ ד׳ ה׳ ו׳ ש׳']);

      page.dayPickerMenu.click();
      page.dayPickerInput.click();
      expect(page.weekDayNames.getText()).toEqual(['א׳ ב׳ ג׳ ד׳ ה׳ ו׳ ש׳']);

      page.dayInlineMenu.click();
      expect(page.weekDayInline.getText()).toEqual(['א׳ ב׳ ג׳ ד׳ ה׳ ו׳ ש׳']);

      page.dayDirectiveMenu.click();
      page.dayDirectiveInput.click();
      expect(page.weekDayNames.getText()).toEqual(['א׳ ב׳ ג׳ ד׳ ה׳ ו׳ ש׳']);

      page.monthPickerMenu.click();
      page.monthPickerInput.click();
      expect(page.calendarFirstMonthOfYear.getText()).toEqual('ינו׳');

      page.monthInlineMenu.click();
      expect(page.calendarFirstMonthOfYearInline.getText()).toEqual('ינו׳');

      page.monthDirectiveMenu.click();
      page.monthDirectiveInput.click();
      expect(page.calendarFirstMonthOfYear.getText()).toEqual('ינו׳');

      page.timePickerMenu.click();
      page.timePickerInput.click();
      expect(page.meridiemDisplay.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים)/);

      page.timeDirectiveMenu.click();
      page.timeSelectDirectiveInput.click();
      expect(page.meridiemDisplay.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים)/);

      page.timeInlineMenu.click();
      expect(page.meridiemDisplayInline.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים)/);
    });
  });

  describe('hideInputContainer', () => {
    it('should hide/show InputContainer datetimepicker', () => {
      expect(page.daytimePickerInput.isDisplayed()).toBe(true);
      page.hideInputRadio.click();
      expect(page.daytimePickerInput.isDisplayed()).toBe(false);
    });
  });

  describe('', () => {
    it('should check that the format validation is working', () => {
      const common = (menu, input) => {
        menu.click();
        input.sendKeys('lmaldlad');
        page.clickOnBody();
        expect(page.formatValidationMsg.getText()).toBe('invalid format');
        input.clear();
      };

      common(page.daytimePickerMenu, page.daytimePickerInput);
      common(page.daytimeDirectiveMenu, page.daytimeDirectiveInput);
      common(page.dayPickerMenu, page.dayPickerInput);
      common(page.dayDirectiveMenu, page.dayDirectiveInput);
      common(page.dayDirectiveReactiveMenu, page.dayReactiveDirectivePickerInput);
      common(page.monthPickerMenu, page.monthPickerInput);
      common(page.monthDirectiveMenu, page.monthDirectiveInput);
      common(page.timePickerMenu, page.timePickerInput);
      common(page.timeDirectiveMenu, page.timeSelectDirectiveInput);
    });
  });
});
