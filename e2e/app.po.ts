import {$, $$, browser, by, element, ElementFinder, ExpectedConditions, protractor} from 'protractor';

export class DemoPage {
  private popupSelector = '.dp-popup.dp-main';
  emptyElem = $('.dp-place-holder');
  dayPickerInput = $('#picker input');
  timePickerInput = $('#picker input');
  daytimePickerInput = $('#picker input');
  daytimeDirectiveInput = $('input#picker');
  dayDirectiveInput = $('input#picker');
  monthDirectiveInput = $('input#picker');
  timeSelectDirectiveInput = $('input#picker');
  datePickerPopup = $(this.popupSelector);
  dayCalendarContainer = $(`${this.popupSelector} dp-day-calendar .dp-day-calendar-container`);
  monthPickerInput = $('#picker input');
  monthCalendar = $(`${this.popupSelector} dp-month-calendar`);
  monthWeeks = $$(`${this.popupSelector} .dp-calendar-week`);
  selectedDays = $$(`${this.popupSelector} .dp-calendar-day.dp-selected`);
  selectedDay = $(`.dp-calendar-day.dp-selected`);
  selectedMonth = $(`.dp-calendar-month.dp-selected`);
  dayCalendarLeftNavBtn = $(`${this.popupSelector} .dp-calendar-nav-left`);
  dayCalendarLeftSecondaryNavBtn = $(`${this.popupSelector} .dp-calendar-secondary-nav-left`);
  dayCalendarRightSecondaryNavBtn = $(`${this.popupSelector} .dp-calendar-secondary-nav-right`);
  monthCalendarLeftNavBtn = $(`${this.popupSelector} dp-month-calendar .dp-calendar-nav-left`);
  monthCalendarRightNavBtn = $(`${this.popupSelector} dp-month-calendar .dp-calendar-nav-right`);
  weekDayNames = $$(`${this.popupSelector} .dp-weekdays`);
  weekDayInline = $$(`.dp-inline .dp-weekdays`);
  currentLocationBtn = $(`${this.popupSelector} .dp-current-location-btn`);
  themeOnRadio = $('#themeOn');
  themeOffRadio = $('#themeOff');
  openOnFocusRadioOff = $('#noOpenOnFocus');
  openOnClickRadioOn = $('#yesOpenOnClick');
  openOnClickRadioOff = $('#noOpenOnClick');
  onOpenDelayInput = $('#onOpenDelay');
  showNearMonthDaysRadio = $('#showNearMonthDaysRadio');
  hideNearMonthDaysRadio = $('#hideNearMonthDaysRadio');
  showWeekNumbersRadio = $('#showWeekNumbersRadio');
  weekNumbers = $$(`${this.popupSelector} .dp-week-number`);
  dayCalendarNavHeaderBtn = $(`${this.popupSelector} .dp-nav-header-btn`);
  deyCalendarMonthNavHeader = $(`${this.popupSelector} dp-month-calendar .dp-nav-header`);
  dayTimeCalendarNavHeaderBtnInline = $(`dp-day-time-calendar .dp-nav-header-btn`);
  dayCalendarNavHeaderBtnInline = $(`dp-day-calendar .dp-nav-header-btn`);
  monthCalendarNavHeaderInline = $(`dp-month-calendar .dp-nav-header`);
  navHeader = $(`${this.popupSelector} .dp-nav-header`);
  dayCalendarNavMonthHeaderBtn = $(`${this.popupSelector} dp-month-calendar .dp-nav-header-btn`);
  calendarDisabledDays = $$(`${this.popupSelector} .dp-calendar-day[disabled]`);
  calendarFirstDayOfMonth = $$(`${this.popupSelector} .dp-current-month`).get(0);
  calendarFirstMonthOfYear = $$(`${this.popupSelector} dp-month-calendar .dp-calendar-month`).get(0);
  calendarFirstMonthOfYearInline = $$(`.dp-inline dp-month-calendar .dp-calendar-month`).get(0);

  currentMonthCalendarBtn = $(`${this.popupSelector} dp-month-calendar .dp-current-month`);
  disableMonthSelector = $('#disableMonthSelector');
  yearFormat = $('#yearFormat');
  hideGoToCurrentRadio = $('#hideGoToCurrent');
  showGoToCurrentRadio = $('#showGoToCurrent');
  enableUnselectSelected = $('#enableUnSelect');
  disableUnselectSelected = $('#disableUnSelect');
  pickerEnabledRadio = $('#inputEnabledRadio');
  pickerDisabledRadio = $('#inputDisabledRadio');
  enableRequiredValidationRadio = $('#enableRequiredRadio');
  disableRequiredValidationRadio = $('#disableRequiredRadio');
  requiredValidationMsg = $('#requiredValidation');
  formatValidationMsg = $('#formatValidation');
  minDateValidationPickerInput = $('#minDatePicker input');
  minDateValidationMsg = $('#minDateValidation');
  maxDateValidationPickerInput = $('#maxDatePicker input');
  maxDateValidationMsg = $('#maxDateValidation');
  minTimeValidationPickerInput = $('#minTimeValidation input');
  maxTimeValidationPickerInput = $('#maxTimeValidation input');
  placeholderInput = $('#placeholderInput');
  firstDayOfWeekMonday = element(by.cssContainingText('#firstDayOfWeekSelect option', 'mo'));
  hebrewLocale = element(by.cssContainingText('#locale option', 'he'));
  monthFormatInput = $('#monthFormatInput');
  minSelectableInput = $('#minSelectable input');
  maxSelectableInput = $('#maxSelectable input');
  noCloseOnSelect = $('#noCloseOnSelect');
  closeDelayInput = $('#closeDelay');
  weekDaysFormatInput = $('#weekDaysFormat');
  dateFormatInput = $('#dateFormat');
  enableMultiselect = $('#enableMultiselect');
  dayBtnFormatInput = $('#dayBtnFormat');
  monthBtnFormatInput = $('#monthBtnFormat');

  hours12FormatInput = $('#hours12Format');
  hours24FormatInput = $('#hours24Format');
  maxTimeInput = $('#maxTimeSelectable input');
  meridiemFormatInput = $('#meridiemFormat');
  minTimeInput = $('#minTimeSelectable input');
  minutesFormatInput = $('#minutesFormat');
  minutesIntervalInput = $('#minutesInterval');
  secondsFormatInput = $('#secondsFormat');
  secondsIntervalInput = $('#secondsInterval');
  showSeconds = $('#showSeconds');
  showTwentyFourHours = $('#showTwentyFourHours');
  timeSeparatorInput = $('#timeSeparator');
  showMultipleYearsNavigation = $('#showMultipleYearsNavigation');
  multipleYearsNavigateBy = $('#multipleYearsNavigateBy');
  hideInputRadio = $('#hideInputRadio');

  showOnOutsideClick = $('#showOnOutsideClick');
  enableCloseOnEnter = $('#enableCloseOnEnter');
  disableCloseOnEnter = $('#disableCloseOnEnter');

  hourUpBtn = $(`${this.popupSelector} .dp-time-select-control-hours > .dp-time-select-control-up`);
  hourDownBtn = $(`${this.popupSelector} .dp-time-select-control-hours > .dp-time-select-control-down`);
  hourDisplay = $(`${this.popupSelector} .dp-time-select-display-hours`);
  minuteUpBtn = $(`${this.popupSelector} .dp-time-select-control-minutes > .dp-time-select-control-up`);
  minuteDownBtn = $(`${this.popupSelector} .dp-time-select-control-minutes > .dp-time-select-control-down`);
  minuteDisplay = $(`${this.popupSelector} .dp-time-select-display-minutes`);
  secondUpBtn = $(`${this.popupSelector} .dp-time-select-control-seconds > .dp-time-select-control-up`);
  secondDownBtn = $(`${this.popupSelector} .dp-time-select-control-seconds > .dp-time-select-control-down`);
  secondDisplay = $(`${this.popupSelector} .dp-time-select-display-seconds`);
  meridiemUpBtn = $(`${this.popupSelector} .dp-time-select-control-meridiem > .dp-time-select-control-up`);
  meridiemDownBtn = $(`${this.popupSelector} .dp-time-select-control-meridiem > .dp-time-select-control-down`);
  meridiemDisplay = $(`${this.popupSelector} .dp-time-select-display-meridiem`);
  meridiemDisplayInline = $(`.dp-inline .dp-time-select-display-meridiem`);
  timeSeparatorDisplay = $(`${this.popupSelector} .dp-time-select-separator:nth-child(2)`);
  monthRows = $$('.dp-months-row');
  numOfMonthRowsToggle2 = $('#numOfMonthRows2');

  daytimePickerMenu = $('#daytimePickerMenu');
  daytimeInlineMenu = $('#daytimeInlineMenu');
  daytimeDirectiveMenu = $('#daytimeDirectiveMenu');
  dayPickerMenu = $('#dayPickerMenu');
  dayInlineMenu = $('#dayInlineMenu');
  dayDirectiveMenu = $('#dayDirectiveMenu');
  monthPickerMenu = $('#monthPickerMenu');
  monthInlineMenu = $('#monthInlineMenu');
  monthDirectiveMenu = $('#monthDirectiveMenu');
  timePickerMenu = $('#timePickerMenu');
  timeInlineMenu = $('#timeInlineMenu');
  timeDirectiveMenu = $('#timeDirectiveMenu');

  openBtn = $('#openBtn');
  moveCalendarTo = $('#moveCalendarTo');

  navigateTo() {
    return browser.get('/');
  }

  clickOnBody() {
    return this.emptyElem.click();
  }

  scrollIntoView(el, top = false) {
    return browser.executeScript(`arguments[0].scrollIntoView(${top})`, el.getWebElement());
  }

  clickOnDayButton(text: string) {
    return element(by.cssContainingText(`${this.popupSelector} .dp-calendar-day`, text)).click();
  }

  clickOnDayButtonInline(text: string) {
    return element(by.cssContainingText(`.dp-calendar-day`, text)).click();
  }

  clickOnMonthButton(text: string) {
    return element(by.cssContainingText(`${this.popupSelector} .dp-calendar-month`, text)).click();
  }

  clickOnMonthButtonInline(text: string) {
    return element(by.cssContainingText(`.dp-calendar-month`, text)).click();
  }

  waitUntilPresent(elem: ElementFinder) {
    return browser.wait(ExpectedConditions.presenceOf(elem), 5000, 'Element taking too long to appear in the DOM');
  }

  async clearInput(elem: ElementFinder): Promise<void> {
    await elem.click();
    const keys = (await elem.getAttribute('value')).length;
    const tmpArr = [...Array(keys)].map(() => 0);
    await elem.click();

    for (const _ of tmpArr) {
      await elem.sendKeys(protractor.Key.ARROW_RIGHT);
    }

    for (const _ of tmpArr) {
      await elem.sendKeys(protractor.Key.BACK_SPACE);
    }
  }

  async setInputValue(input: ElementFinder, val: string): Promise<void> {
    await this.clearInput(input);
    await input.sendKeys(val);
  }
}
