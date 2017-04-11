import {DemoPage} from './app.po';
import {protractor, browser} from 'protractor';
import moment = require('moment');

describe('ng2-date-picker App', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should check that the popup upended to body', () => {
    page.datePickerInput.click();
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
    page.datePickerInput.click();
    expect(page.datePickerPopup.isDisplayed()).toBe(false);
    browser.waitForAngularEnabled(true);
    browser.sleep(1000);
    expect(page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should check that the showNearMonthDays is working as expected', () => {
    page.datePickerInput.clear();
    page.datePickerInput.sendKeys('27-03-2017');
    page.datePickerInput.sendKeys(protractor.Key.ENTER);
    page.datePickerInput.click();
    expect(page.monthWeeks.count()).toBe(6);

    page.hideNearMonthDaysRadio.click();
    page.datePickerInput.click();
    expect(page.monthWeeks.count()).toBe(5);

    page.showNearMonthDaysRadio.click();
    page.datePickerInput.click();
    expect(page.monthWeeks.count()).toBe(6);

    page.datePickerInput.clear();
    page.datePickerInput.sendKeys('27-04-2017');
    page.datePickerInput.sendKeys(protractor.Key.ENTER);
    page.hideNearMonthDaysRadio.click();
    page.datePickerInput.click();
    expect(page.monthWeeks.count()).toBe(6);
  });

  it('should show/hide week number according to configuration', () => {
    page.datePickerInput.sendKeys('28-03-2017');
    page.datePickerInput.click();
    expect(page.weekNumbers.count()).toBe(0);
    page.showWeekNumbersRadio.click();
    page.datePickerInput.click();
    expect(page.weekNumbers.count()).toBe(6);
    expect(page.weekNumbers.getText()).toEqual(['8', '9', '10', '11', '12', '13']);
  });

  it('should hide calendar on tab (blur)', () => {
    page.datePickerInput.click();
    expect(page.datePickerPopup.isDisplayed()).toBe(true);
    page.datePickerInput.sendKeys(protractor.Key.TAB);
    expect(page.datePickerPopup.isDisplayed()).toBe(false);
  });

  it('should disable/enable month selection', () => {
    page.datePickerInput.sendKeys('08-04-2017');
    page.datePickerInput.click();
    expect(page.navHeaderBtn.isPresent()).toBe(true);
    expect(page.dayCalendar.isPresent()).toBe(true);
    expect(page.navHeaderBtn.getText()).toEqual('Apr, 2017');

    page.navHeaderBtn.click();
    expect(page.dayCalendar.isPresent()).toBe(false);
    expect(page.monthCalendar.isPresent()).toBe(true);
    expect(page.navHeaderBtn.getText()).toEqual('2017');
    expect(page.currentMonthCalendarBtn.getText()).toEqual('Apr');
    page.navLeftBtn.click();
    expect(page.navHeaderBtn.getText()).toEqual('2016');
    expect(page.currentMonthCalendarBtn.isPresent()).toBe(false);
    page.navRightBtn.click();
    expect(page.navHeaderBtn.getText()).toEqual('2017');
    expect(page.currentMonthCalendarBtn.getText()).toEqual('Apr');

    page.clickOnBody();
    page.datePickerInput.click();
    expect(page.dayCalendar.isPresent()).toBe(true);
    expect(page.monthCalendar.isPresent()).toBe(false);
    page.navHeaderBtn.click();
    expect(page.dayCalendar.isPresent()).toBe(false);
    expect(page.monthCalendar.isPresent()).toBe(true);

    page.navHeaderBtn.click();
    expect(page.dayCalendar.isPresent()).toBe(true);
    expect(page.monthCalendar.isPresent()).toBe(false);

    page.disableMonthSelector.click();
    expect(page.navHeaderBtn.isPresent()).toBe(false);
  });

  it('should change year format', () => {
    page.datePickerInput.sendKeys('08-04-2017');
    page.datePickerInput.click();
    page.navHeaderBtn.click();
    expect(page.navHeaderBtn.getText()).toEqual('2017');

    page.clickOnBody();

    page.yearFormat.clear();
    page.yearFormat.sendKeys('YY');

    page.datePickerInput.click();
    page.navHeaderBtn.click();
    expect(page.navHeaderBtn.getText()).toEqual('17');
  });

  it('should check if go to current location btn is working as expected', () => {
    expect(page.currentLocationBtn.isDisplayed()).toBe(false);
    page.datePickerInput.sendKeys('08-04-2017');
    expect(page.navHeaderBtn.getText()).toEqual(moment('08-04-2017', 'DD-MM-YYYY').format('MMM, YYYY'));
    page.datePickerInput.click();
    expect(page.currentLocationBtn.isDisplayed()).toBe(true);
    page.currentLocationBtn.click();
    expect(page.navHeaderBtn.getText()).toEqual(moment().format('MMM, YYYY'));

    page.hideGoToCurrentRadio.click();
    expect(page.currentLocationBtn.isPresent()).toBe(false);
  });

  it('should check if enable/diable is working', () => {
    expect(page.datePickerInput.getAttribute('disabled')).toBe(null);
    page.pickerDisabledRadio.click();
    expect(page.datePickerInput.getAttribute('disabled')).toEqual('true');
    page.pickerEnabledRadio.click();
    expect(page.datePickerInput.getAttribute('disabled')).toBe(null);
  });
});
