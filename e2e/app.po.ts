import {browser, element, by, $} from 'protractor';

export class DemoPage {
  body = $('body');
  datePicker = $('#datePicker input');
  datePickerPopup = $('body > div .dp-popup');
  themeOnRadio = $('#themeOn');
  themeOffRadio = $('#themeOff');

  openBtn = $('#openBtn');

  onOpenDelayInput = $('#onOpenDelay');

  navigateTo() {
    return browser.get('/');
  }

  clickOnBody() {
    this.body.click();
  }
}
