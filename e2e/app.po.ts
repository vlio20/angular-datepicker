import {browser, $, $$} from 'protractor';

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

  openBtn = $('#openBtn');

  navigateTo() {
    return browser.get('/');
  }

  clickOnBody() {
    this.body.click();
  }
}
