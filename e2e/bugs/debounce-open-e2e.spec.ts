import {DemoPage} from '../app.po';
import {browser} from 'protractor';

describe('debounce open delay', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
  });

  it('should open a picker when there is an openDelay', async () => {
    await page.setInputValue(page.onOpenDelayInput, '1000');
    await page.dayPickerInput.click();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(500);
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    await browser.sleep(600);
    await browser.waitForAngularEnabled(true);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should cancel open of a picker when there is an openDelay and focus out', async () => {
    await page.setInputValue(page.onOpenDelayInput, '1000');
    await page.dayPickerInput.click();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(500);
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    await page.clickOnBody();
    await browser.sleep(600);
    await browser.waitForAngularEnabled(true);
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
  });
});
