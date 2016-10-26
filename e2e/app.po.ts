import { browser, element, by } from 'protractor';

export class Ng2DatePickerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ob-demo-root h1')).getText();
  }
}
