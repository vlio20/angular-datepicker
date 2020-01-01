import {DemoPage} from './app.po';

describe('dpDayPicker dayPicker', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
  });

  it('should check if min date validation is working', async () => {
    await page.minDateValidationPickerInput.clear();
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
    await page.setInputValue(page.minDateValidationPickerInput, '10-04-2017 10:08:07');
    await page.setInputValue(page.daytimePickerInput, '09-04-2017 10:08:07');
    await page.clickOnBody();
    expect(await page.minDateValidationMsg.getText()).toEqual('minDate invalid');
    await page.setInputValue(page.minDateValidationPickerInput, '08-04-2017 09:08:07');
    await page.clickOnBody();
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max date validation is working', async () => {
    await page.maxDateValidationPickerInput.clear();
    expect(await page.maxDateValidationMsg.isPresent()).toBe(false);
    await page.maxDateValidationPickerInput.sendKeys('12-04-2017 08:08:07');
    await page.daytimePickerInput.sendKeys('12-04-2017 09:08:07');
    expect(await page.maxDateValidationMsg.getText()).toEqual('maxDate invalid');
    await page.maxDateValidationPickerInput.clear();
    await page.maxDateValidationPickerInput.sendKeys('12-04-2017 09:08:07');
    expect(await page.maxDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check that the min selectable option is working', async () => {
    await page.setInputValue(page.minSelectableInput, '11-04-2017 09:08:07');
    await page.setInputValue(page.daytimePickerInput, '17-04-2017 09:08:07');
    await page.daytimePickerInput.click();
    expect(await page.calendarDisabledDays.count()).toBe(16);
    await page.setInputValue(page.daytimePickerInput, '11-04-2017 09:18:07');
    expect(await page.hourDownBtn.getAttribute('disabled')).toEqual('true');
    expect(await page.minuteDownBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemUpBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemDownBtn.getAttribute('disabled')).toBe(null);
  });

  it('should check that the max selectable option is working', async () => {
    await page.setInputValue(page.maxSelectableInput, '11-04-2017 09:08:07');
    await page.setInputValue(page.daytimePickerInput, '12-04-2017 09:08:07');
    await page.daytimePickerInput.click();
    expect(await page.calendarDisabledDays.count()).toBe(25);
    await page.daytimePickerInput.clear();
    await page.daytimePickerInput.sendKeys('11-04-2017 09:06:07');
    expect(await page.hourUpBtn.getAttribute('disabled')).toEqual('true');
    expect(await page.minuteUpBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemUpBtn.getAttribute('disabled')).toBe('true');
    expect(await page.meridiemDownBtn.getAttribute('disabled')).toBe('true');
  });
});
