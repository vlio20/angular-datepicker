import {DemoPage} from './app.po';
import {protractor, browser} from 'protractor';

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

  fit('should check that the showNearMonthDays is working as expected', () => {
    page.datePickerInput.clear();
    page.datePickerInput.sendKeys('27-03-2017');
    page.datePickerInput.sendKeys(protractor.Key.ENTER);
    //browser.pause();
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
});
