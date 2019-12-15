import {DemoPage} from './app.po';
import {browser} from 'protractor';

describe('dpDayPicker reactive directive', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();

    await page.dateFormatInput.clear();
    await page.dateFormatInput.sendKeys('DD-MM-YYYY');
    await page.dayDirectiveReactiveMenu.click();
  });

  xit('should check that the popup appended to body', async () => {
    await page.dayDirectiveReactiveInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    await page.clickOnBody();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
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
    await page.onOpenDelayInput.clear();
    await page.onOpenDelayInput.sendKeys(1000);
    await page.scrollIntoView(page.openBtn);
    await page.openBtn.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    await page.clickOnBody();
    await browser.sleep(200);
    await browser.waitForAngularEnabled(false);
    await page.dayDirectiveReactiveInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    await browser.waitForAngularEnabled(true);
    await browser.sleep(1000);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should check if enable/disable required validation is working', async () => {
    await page.dayDirectiveReactiveInput.click();
    await page.dayDirectiveReactiveInput.clear();
    expect(await page.reactiveRequiredValidationMsg.isPresent()).toBe(false);
    await page.enableRequiredValidationRadio.click();
    expect(await page.reactiveRequiredValidationMsg.getText()).toEqual('required');
    await page.disableRequiredValidationRadio.click();
    expect(await page.reactiveRequiredValidationMsg.isPresent()).toBe(false);
  });

  it('should check if min date validation is working', async () => {
    await page.minDateValidationPickerInput.clear();
    expect(await page.reactiveMinDateValidationMsg.isPresent()).toBe(false);
    await page.minDateValidationPickerInput.sendKeys('11-04-2017');
    await page.dayDirectiveReactiveInput.sendKeys('10-04-2017');
    await page.clickOnBody();
    expect(await page.reactiveMinDateValidationMsg.getText()).toEqual('minDate invalid');
    await page.minDateValidationPickerInput.clear();
    await page.minDateValidationPickerInput.sendKeys('10-04-2017');
    expect(await page.reactiveMinDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max date validation is working', async () => {
    await page.maxDateValidationPickerInput.clear();
    expect(await page.reactiveMaxDateValidationMsg.isPresent()).toBe(false);
    await page.maxDateValidationPickerInput.sendKeys('11-04-2017');
    await page.dayDirectiveReactiveInput.sendKeys('12-04-2017');
    await page.clickOnBody();
    expect(await page.reactiveMaxDateValidationMsg.getText()).toEqual('maxDate invalid');
    await page.maxDateValidationPickerInput.clear();
    await page.maxDateValidationPickerInput.sendKeys('13-04-2017');
    await page.clickOnBody();
    expect(await page.reactiveMaxDateValidationMsg.isPresent()).toBe(false);
  });
});
