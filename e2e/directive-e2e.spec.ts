import {DemoPage} from './app.po';
import {browser} from 'protractor';
import * as moment from 'moment';
import {Key} from 'selenium-webdriver';

describe('dpDayPicker directive', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();

    page.dayDirectiveMenu.click();
  });

  xit('should check that the popup appended to body', async () => {
    page.dayDirectiveInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    page.clickOnBody();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
  });

  it('should make sure that day directive keeps the prev state of the calendar', async () => {
    page.dayDirectiveInput.click();
    page.dayCalendarLeftNavBtn.click();
    page.clickOnBody();

    page.dayDirectiveInput.click();
    expect(await page.dayCalendarNavHeaderBtn.getText())
      .toEqual(moment().subtract(1, 'month').format('MMM, YYYY'));
  });

  it('should check that the theme is added and removed', async () => {
    page.themeOnRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).toContain('dp-material');
    page.themeOffRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).not.toContain('dp-material');
    page.themeOnRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).toContain('dp-material');
  });

  it('should check that the onOpenDelay is working', async () => {
    page.onOpenDelayInput.clear();
    page.onOpenDelayInput.sendKeys(1000);
    page.scrollIntoView(page.openBtn);
    page.openBtn.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    page.clickOnBody();
    browser.sleep(200);
    browser.waitForAngularEnabled(false);
    page.dayDirectiveInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    browser.waitForAngularEnabled(true);
    browser.sleep(1000);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should allow input to be modified from beginning', async () => {
    page.dayDirectiveInput.sendKeys('10-04-2017');
    for (let i = 0; i < 11; i++) {
      page.dayDirectiveInput.sendKeys(Key.LEFT);
    }
    page.dayDirectiveInput.sendKeys(Key.DELETE);
    page.dayDirectiveInput.sendKeys('2');
    expect(await page.dayDirectiveInput.getAttribute('value')).toBe('20-04-2017');
    expect(await page.selectedDays.count()).toBe(1);
    expect(await page.selectedDays.first().getText()).toBe('20');
    expect(await page.dayCalendarNavHeaderBtn.getText()).toBe('Apr, 2017');
  });
});
