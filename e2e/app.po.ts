import {browser, $, $$, element, by} from 'protractor';

export class DemoPage {
  private popupSelector = 'body > div .dp-popup';
  body = $('body');
  datePickerInput = $('#datePicker input');
  datePickerPopup = $(this.popupSelector);
  dayCalendar = $(`${this.popupSelector} dp-day-calendar`);
  monthCalendar = $(`${this.popupSelector} dp-month-calendar`);
  monthWeeks = $$(`${this.popupSelector} .dp-calendar-week`);
  calendarDays = $$(`${this.popupSelector} .dp-calendar-day`);
  navLeftBtn = $(`${this.popupSelector} .dp-calendar-nav-left`);
  navRightBtn = $(`${this.popupSelector} .dp-calendar-nav-right`);
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
  navHeader = $(`${this.popupSelector} .dp-nav-header`);
  navHeaderBtn = $(`${this.popupSelector} .dp-nav-header-btn`);
  currentMonthCalendarBtn = $(`${this.popupSelector} .dp-current-month`);
  disableMonthSelector = $('#disableMonthSelector');
  yearFormat = $('#yearFormat');
  hideGoToCurrentRadio = $('#hideGoToCurrent');
  pickerEnabledRadio = $('#inputEnabledRadio');
  pickerDisabledRadio = $('#inputDisabledRadio');
  enableRequiredValidationRadio = $('#enableRequiredRadio');
  disableRequiredValidationRadio = $('#disableRequiredRadio');
  requiredValidationMsg = $('#requiredValidation');
  minDateValidationPickerInput = $('#minDatePicker input');
  minDateValidationMsg = $('#minDateValidation');
  maxDateValidationPickerInput = $('#maxDatePicker input');
  maxDateValidationMsg = $('#maxDateValidation');
  placeholderInput = $('#placeholderInput');
  firstDayOfWeekMonday = element(by.cssContainingText('#firstDayOfWeekSelect option', 'mo'));
  amountOfCalendarsInput = $('#amountOfCalendarsInput');
  monthFormatInput = $('#monthFormatInput');

  openBtn = $('#openBtn');

  navigateTo() {
    return browser.get('/');
  }

  clickOnBody() {
    this.body.click();
  }
}
