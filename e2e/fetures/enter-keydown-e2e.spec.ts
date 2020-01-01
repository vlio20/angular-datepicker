import {DemoPage} from '../app.po';
import {protractor} from 'protractor';

describe('enter keypress', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
    await page.daytimePickerMenu.click();
  });

  it('should close the picker on enter keypress', async () => {
    await page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    page.dayPickerInput.sendKeys(protractor.Key.ENTER);
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);

    await page.disableCloseOnEnter.click();
    await page.dayPickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    page.dayPickerInput.sendKeys(protractor.Key.ENTER);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });
});
