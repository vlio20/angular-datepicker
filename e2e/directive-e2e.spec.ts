import {DemoPage} from './app.po';
import {browser} from 'protractor';
import {Key} from 'selenium-webdriver';
import * as dayjs from 'dayjs';

describe('dpDayPicker directive', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    page.navigateTo();

    await page.dayDirectiveMenu.click();
  });

  it('should check that the popup appended to body', async () => {
    await page.dayDirectiveInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    await page.clickOnBody();
    expect(await page.datePickerPopup.isPresent()).toBe(false);
  });

  it('should make sure that day directive keeps the prev state of the calendar', async () => {
    await page.dayDirectiveInput.click();
    await page.dayCalendarLeftNavBtn.click();
    await page.clickOnBody();

    await page.dayDirectiveInput.click();
    expect(await page.dayCalendarNavHeaderBtn.getText())
      .toEqual(dayjs().subtract(1, 'month').format('MMM, YYYY'));
  });

  it('should check that the theme is added and removed', async () => {
    await page.themeOnRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).toContain('dp-material');
    await page.themeOffRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).not.toContain('dp-material');
    await page.themeOnRadio.click();
    expect(await page.datePickerPopup.getAttribute('class')).toContain('dp-material');
  });

  it('should check that the onOpenDelay is working', async () => {
    await page.scrollIntoView(page.openBtn, true);
    await page.setInputValue(page.onOpenDelayInput, '1000');
    await page.openBtn.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    await page.clickOnBody();
    await browser.sleep(200);
    await browser.waitForAngularEnabled(false);
    await page.dayDirectiveInput.click();
    expect(await page.datePickerPopup.isPresent()).toBe(false);
    await browser.waitForAngularEnabled(true);
    await browser.sleep(1000);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should allow input to be modified from beginning', async () => {
    await page.setInputValue(page.dayDirectiveInput, '10-04-2017')
    const proms = [];

    for (let i = 0; i < 11; i++) {
      proms.push(page.dayDirectiveInput.sendKeys(Key.LEFT));
    }

    await Promise.all(proms);

    await page.dayDirectiveInput.sendKeys(Key.DELETE);
    await page.dayDirectiveInput.sendKeys('2');
    expect(await page.getInputVal(page.dayDirectiveInput)).toBe('20-04-2017');
    expect(await page.selectedDays.count()).toBe(1);
    expect(await page.selectedDays.first().getText()).toBe('20');
    expect(await page.dayCalendarNavHeaderBtn.getText()).toBe('Apr, 2017');
  });
});
