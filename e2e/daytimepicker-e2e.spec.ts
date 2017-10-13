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

  it('should check if min date validation is working', () => {
    page.minDateValidationPickerInput.clear();
    expect(page.minDateValidationMsg.isPresent()).toBe(false);
    page.minDateValidationPickerInput.sendKeys('10-04-2017 10:08:07');
    page.daytimePickerInput.sendKeys('10-04-2017 09:08:07');
    expect(page.minDateValidationMsg.getText()).toEqual('minDate invalid');
    page.minDateValidationPickerInput.clear();
    page.minDateValidationPickerInput.sendKeys('10-04-2017 09:08:07');
    expect(page.minDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max date validation is working', () => {
    page.maxDateValidationPickerInput.clear();
    expect(page.maxDateValidationMsg.isPresent()).toBe(false);
    page.maxDateValidationPickerInput.sendKeys('12-04-2017 08:08:07');
    page.daytimePickerInput.sendKeys('12-04-2017 09:08:07');
    expect(page.maxDateValidationMsg.getText()).toEqual('maxDate invalid');
    page.maxDateValidationPickerInput.clear();
    page.maxDateValidationPickerInput.sendKeys('12-04-2017 09:08:07');
    expect(page.maxDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check that the min selectable option is working', () => {
    page.minSelectableInput.clear();
    page.minSelectableInput.sendKeys('11-04-2017 09:08:07');
    page.daytimePickerInput.sendKeys('17-04-2017 09:08:07');
    page.daytimePickerInput.click();
    expect(page.calendarDisabledDays.count()).toBe(16);
    page.daytimePickerInput.clear();
    page.daytimePickerInput.sendKeys('11-04-2017 09:18:07');
    expect(page.hourDownBtn.getAttribute('disabled')).toEqual('true');
    expect(page.minuteDownBtn.getAttribute('disabled')).toBe(null);
    expect(page.meridiemUpBtn.getAttribute('disabled')).toBe(null);
    expect(page.meridiemDownBtn.getAttribute('disabled')).toBe(null);
  });

  it('should check that the max selectable option is working', () => {
    page.maxSelectableInput.clear();
    page.maxSelectableInput.sendKeys('11-04-2017 09:08:07');
    page.daytimePickerInput.sendKeys('12-04-2017 09:08:07');
    page.daytimePickerInput.click();
    expect(page.calendarDisabledDays.count()).toBe(25);
    page.daytimePickerInput.clear();
    page.daytimePickerInput.sendKeys('11-04-2017 09:06:07');
    expect(page.hourUpBtn.getAttribute('disabled')).toEqual('true');
    expect(page.minuteUpBtn.getAttribute('disabled')).toBe(null);
    expect(page.meridiemUpBtn.getAttribute('disabled')).toBe('true');
    expect(page.meridiemDownBtn.getAttribute('disabled')).toBe('true');
  });
});
