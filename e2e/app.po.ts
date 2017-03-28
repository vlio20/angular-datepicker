import {browser, $, $$} from 'protractor';

export class DemoPage {
  private popupSelector = 'body > div .dp-popup';
  body = $('body');
  datePickerInput = $('#datePicker input');
  datePickerPopup = $(this.popupSelector);
  monthWeeks = $$(`${this.popupSelector} .dp-calendar-week`);
  themeOnRadio = $('#themeOn');
  themeOffRadio = $('#themeOff');
  onOpenDelayInput = $('#onOpenDelay');
  showNearMonthDaysRadio = $('#showNearMonthDaysRadio');
  hideNearMonthDaysRadio = $('#hideNearMonthDaysRadio');
  showWeekNumbersRadio = $('#showWeekNumbersRadio');
  hideWeekNumbersRadio = $('#hideWeekNumbersRadio');
  weekNumbers = $$(`${this.popupSelector} .dp-week-number`);

  openBtn = $('#openBtn');

  navigateTo() {
    return browser.get('/');
  }

  clickOnBody() {
    this.body.click();
  }
}
