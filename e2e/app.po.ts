import {$, $$, browser, by, element} from 'protractor';

export class DemoPage {
  private popupSelector = 'body > div .dp-popup';
  body = $('body');
  datePickerInput = $('#datePicker input');
  timePickerInput = $('#timePicker input');
  daytimePickerInput = $('#daytimePicker input');
  dayDirectivePickerInput = $('#datePickerDirDay input');
  dayReactiveDirectivePickerInput = $('#datePickerDirDayReactive input');
  monthDirectiveInput = $('#datePickerDirMonth input');
  datePickerPopup = $(this.popupSelector);
  dayCalendar = $(`${this.popupSelector} dp-day-calendar`);
  dayCalendarContainer = $(`${this.popupSelector} dp-day-calendar .dp-day-calendar-container`);
  monthCalendar = $(`${this.popupSelector} dp-month-calendar`);
  monthWeeks = $$(`${this.popupSelector} .dp-calendar-week`);
  calendarDays = $$(`${this.popupSelector} .dp-calendar-day`);
  selectedDays = $$(`${this.popupSelector} .dp-calendar-day.dp-selected`);
  dayCalendarLeftNavBtn = $(`${this.popupSelector} .dp-calendar-nav-left`);
  dayCalendarRightNavBtn = $(`${this.popupSelector} .dp-calendar-nav-right`);
  monthCalendarLeftNavBtn = $(`${this.popupSelector} dp-month-calendar .dp-calendar-nav-left`);
  monthCalendarRightNavBtn = $(`${this.popupSelector} dp-month-calendar .dp-calendar-nav-right`);
  weekDayNames = $$(`${this.popupSelector} .dp-weekdays`);
  calendarContainer = $$(`${this.popupSelector} .dp-calendar-container `);
  currentLocationBtn = $(`#datePicker .dp-current-location-btn`);
  themeOnRadio = $('#themeOn');
  themeOffRadio = $('#themeOff');
  onOpenDelayInput = $('#onOpenDelay');
  showNearMonthDaysRadio = $('#showNearMonthDaysRadio');
  hideNearMonthDaysRadio = $('#hideNearMonthDaysRadio');
  showWeekNumbersRadio = $('#showWeekNumbersRadio');
  hideWeekNumbersRadio = $('#hideWeekNumbersRadio');
  weekNumbers = $$(`${this.popupSelector} .dp-week-number`);
  deyCalendarNavHeader = $(`${this.popupSelector} .dp-nav-header`);
  dayCalendarNavHeaderBtn = $(`${this.popupSelector} .dp-nav-header-btn`);
  deyCalendarMonthNavHeader = $(`${this.popupSelector} dp-month-calendar .dp-nav-header`);
  dayCalendarNavMonthHeaderBtn = $(`${this.popupSelector} dp-month-calendar .dp-nav-header-btn`);
  calendarDisabledDays = $$(`${this.popupSelector} .dp-calendar-day[disabled]`);
  calendarFirstDayOfMonth = $$(`${this.popupSelector} .dp-current-month`).get(0);
  calendarFirstMonthOfYear = $$(`${this.popupSelector} dp-month-calendar .dp-calendar-month`).get(0);

  currentMonthCalendarBtn = $(`${this.popupSelector} dp-month-calendar .dp-current-month`);
  disableMonthSelector = $('#disableMonthSelector');
  yearFormat = $('#yearFormat');
  hideGoToCurrentRadio = $('#hideGoToCurrent');
  pickerEnabledRadio = $('#inputEnabledRadio');
  pickerDisabledRadio = $('#inputDisabledRadio');
  enableRequiredValidationRadio = $('#enableRequiredRadio');
  disableRequiredValidationRadio = $('#disableRequiredRadio');
  requiredValidationMsg = $('#requiredValidation');
  reactiveRequiredValidationMsg = $('#reactiveRequiredValidation');
  reactiveMinDateValidationMsg = $('#reactiveMinDateValidation');
  reactiveMaxDateValidationMsg = $('#reactiveMaxDateValidation');
  timePickerMinTimeValidationMsg = $('#timePickerMinTimeValidation');
  timePickerMaxTimeValidationMsg = $('#timePickerMaxTimeValidation');
  minDateValidationPickerInput = $('#minDatePicker input');
  minDateValidationMsg = $('#minDateValidation');
  maxDateValidationPickerInput = $('#maxDatePicker input');
  maxDateValidationMsg = $('#maxDateValidation');
  minTimeValidationPickerInput = $('#minTimeValidation input');
  minTimeValidationMsg = $('#minTimeValidation');
  maxTimeValidationPickerInput = $('#maxTimeValidation input');
  maxTimeValidationMsg = $('#maxTimeValidation');
  placeholderInput = $('#placeholderInput');
  firstDayOfWeekMonday = element(by.cssContainingText('#firstDayOfWeekSelect option', 'mo'));
  monthFormatInput = $('#monthFormatInput');
  minSelectableInput = $('#minSelectable input');
  maxSelectableInput = $('#maxSelectable input');
  closeOnSelect = $('#closeOnSelect');
  noCloseOnSelect = $('#noCloseOnSelect');
  closeDelayInput = $('#closeDelay');
  weekDayName1Input = $('#weekDayName1');
  weekDayName2Input = $('#weekDayName2');
  weekDayName3Input = $('#weekDayName3');
  weekDayName4Input = $('#weekDayName4');
  weekDayName5Input = $('#weekDayName5');
  weekDayName6Input = $('#weekDayName6');
  weekDayName7Input = $('#weekDayName7');
  dateFormatInput = $('#dateFormat');
  enableMultiselect = $('#enableMultiselect');
  disableMultiselect = $('#disableMultiselect');
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
  hideSeconds = $('#hideSeconds');
  showTwentyFourHours = $('#showTwentyFourHours');
  hideTwentyFourHours = $('#hideTwentyFourHours');
  timeSeparatorInput = $('#timeSeparator');

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
  timeSeparatorDisplay = $(`${this.popupSelector} .dp-time-select-separator:nth-child(2)`);

  pickerModeDayPicker = $('#pickerMode > [value=dayPicker]');
  pickerModeDayInline = $('#pickerMode > [value=dayInline]');
  pickerModeDayDirective = $('#pickerMode > [value=dayDirective]');
  pickerModeDayDirectiveReactive = $('#pickerMode > [value=dayDirectiveReactive]');
  pickerModeMonthPicker = $('#pickerMode > [value=monthPicker]');
  pickerModeMonthInline = $('#pickerMode > [value=monthInline]');
  pickerModeMonthDirective = $('#pickerMode > [value=monthDirective]');
  pickerModeTimePicker = $('#pickerMode > [value=timePicker]');
  pickerModeTimeInline = $('#pickerMode > [value=timeInline]');
  pickerModeTimeDirective = $('#pickerMode > [value=timeDirective]');
  pickerModeDaytimePicker = $('#pickerMode > [value=daytimePicker]');
  pickerModeDaytimeInline = $('#pickerMode > [value=daytimeInline]');
  pickerModeDaytimeDirective = $('#pickerMode > [value=daytimeDirective]');

  openBtn = $('#openBtn');

  navigateTo() {
    return browser.get('/');
  }

  clickOnBody() {
    this.body.click();
  }

  clickOnDayButton(text: string) {
    element(by.cssContainingText(`${this.popupSelector} .dp-calendar-day`, text)).click();
  }
}
