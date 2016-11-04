import { browser, element, by } from 'protractor';

export class Ng2DatePickerPage {
  ui = {
    datePicker: 'dp-date-picker'
  };

  getParagraphText() {
    return element(by.css('dp-demo-root h1')).getText();
  }
}
