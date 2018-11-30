import {DemoPage} from './app.po';

describe('dpDayPicker daytimePicker', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();

    page.dateFormatInput.clear();
    page.dateFormatInput.sendKeys('DD-MM-YYYY HH:mm:ss');
    page.daytimePickerMenu.click();
  });

  it('should check if min date validation is working', async () => {
    page.minDateValidationPickerInput.clear();
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
    page.minDateValidationPickerInput.sendKeys('10-04-2017 10:08:07');
    page.daytimePickerInput.sendKeys('10-04-2017 09:08:07');
    expect(await page.minDateValidationMsg.getText()).toEqual('minDate invalid');
    page.minDateValidationPickerInput.clear();
    page.minDateValidationPickerInput.sendKeys('10-04-2017 09:08:07');
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max date validation is working', async () => {
    page.maxDateValidationPickerInput.clear();
    expect(await page.maxDateValidationMsg.isPresent()).toBe(false);
    page.maxDateValidationPickerInput.sendKeys('12-04-2017 08:08:07');
    page.daytimePickerInput.sendKeys('12-04-2017 09:08:07');
    expect(await page.maxDateValidationMsg.getText()).toEqual('maxDate invalid');
    page.maxDateValidationPickerInput.clear();
    page.maxDateValidationPickerInput.sendKeys('12-04-2017 09:08:07');
    expect(await page.maxDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check that the min selectable option is working', async () => {
    page.minSelectableInput.clear();
    page.minSelectableInput.sendKeys('11-04-2017 09:08:07');
    page.daytimePickerInput.sendKeys('17-04-2017 09:08:07');
    page.daytimePickerInput.click();
    expect(await page.calendarDisabledDays.count()).toBe(16);
    page.daytimePickerInput.clear();
    page.daytimePickerInput.sendKeys('11-04-2017 09:18:07');
    expect(await page.hourDownBtn.getAttribute('disabled')).toEqual('true');
    expect(await page.minuteDownBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemUpBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemDownBtn.getAttribute('disabled')).toBe(null);
  });

  it('should check that the max selectable option is working', async () => {
    page.maxSelectableInput.clear();
    page.maxSelectableInput.sendKeys('11-04-2017 09:08:07');
    page.daytimePickerInput.sendKeys('12-04-2017 09:08:07');
    page.daytimePickerInput.click();
    expect(await page.calendarDisabledDays.count()).toBe(25);
    page.daytimePickerInput.clear();
    page.daytimePickerInput.sendKeys('11-04-2017 09:06:07');
    expect(await page.hourUpBtn.getAttribute('disabled')).toEqual('true');
    expect(await page.minuteUpBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemUpBtn.getAttribute('disabled')).toBe('true');
    expect(await page.meridiemDownBtn.getAttribute('disabled')).toBe('true');
  });
});
