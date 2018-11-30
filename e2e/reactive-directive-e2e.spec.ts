import {DemoPage} from './app.po';
import {browser} from 'protractor';
import {not} from 'rxjs/internal-compatibility';

describe('dpDayPicker reactive directive', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();

    page.dateFormatInput.clear();
    page.dateFormatInput.sendKeys('DD-MM-YYYY');
    page.dayDirectiveReactiveMenu.click();
  });

  xit('should check that the popup appended to body', async () => {
    page.dayDirectiveReactiveInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
    page.clickOnBody();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
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
    page.dayDirectiveReactiveInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
    browser.waitForAngularEnabled(true);
    browser.sleep(1000);
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });

  it('should check if enable/disable required validation is working', async () => {
    page.dayDirectiveReactiveInput.click();
    page.dayDirectiveReactiveInput.clear();
    expect(await page.reactiveRequiredValidationMsg.isPresent()).toBe(false);
    page.enableRequiredValidationRadio.click();
    expect(await page.reactiveRequiredValidationMsg.getText()).toEqual('required');
    page.disableRequiredValidationRadio.click();
    expect(await page.reactiveRequiredValidationMsg.isPresent()).toBe(false);
  });

  it('should check if min date validation is working', async () => {
    page.minDateValidationPickerInput.clear();
    expect(await page.reactiveMinDateValidationMsg.isPresent()).toBe(false);
    page.minDateValidationPickerInput.sendKeys('11-04-2017');
    page.dayDirectiveReactiveInput.sendKeys('10-04-2017');
    page.clickOnBody();
    expect(await page.reactiveMinDateValidationMsg.getText()).toEqual('minDate invalid');
    page.minDateValidationPickerInput.clear();
    page.minDateValidationPickerInput.sendKeys('10-04-2017');
    expect(await page.reactiveMinDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max date validation is working', async () => {
    page.maxDateValidationPickerInput.clear();
    expect(await page.reactiveMaxDateValidationMsg.isPresent()).toBe(false);
    page.maxDateValidationPickerInput.sendKeys('11-04-2017');
    page.dayDirectiveReactiveInput.sendKeys('12-04-2017');
    page.clickOnBody();
    expect(await page.reactiveMaxDateValidationMsg.getText()).toEqual('maxDate invalid');
    page.maxDateValidationPickerInput.clear();
    page.maxDateValidationPickerInput.sendKeys('12-04-2017');
    expect(await page.reactiveMaxDateValidationMsg.isPresent()).toBe(false);
  });
});
