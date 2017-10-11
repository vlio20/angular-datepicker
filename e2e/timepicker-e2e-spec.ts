import {DemoPage} from './app.po';

describe('dpDayPicker timePicker', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();

    page.timePickerMenu.click();
    page.dateFormatInput.clear();
    page.dateFormatInput.sendKeys('HH:mm:ss');
  });

  it('should check if min time validation is working', () => {
    page.minTimeValidationPickerInput.clear();
    expect(page.timePickerMinTimeValidationMsg.isPresent()).toBe(false);
    page.minTimeValidationPickerInput.clear();
    page.minTimeValidationPickerInput.sendKeys('10:11:12');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:00:00');
    page.clickOnBody();
    expect(page.timePickerMinTimeValidationMsg.getText()).toEqual('minTime invalid');
    page.minTimeValidationPickerInput.clear();
    page.minTimeValidationPickerInput.sendKeys('08:07:06');
    page.clickOnBody();
    expect(page.timePickerMinTimeValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max time validation is working', () => {
    page.maxTimeValidationPickerInput.clear();
    expect(page.timePickerMaxTimeValidationMsg.isPresent()).toBe(false);
    page.maxTimeValidationPickerInput.clear();
    page.maxTimeValidationPickerInput.sendKeys('08:07:06');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:00:00');
    page.clickOnBody();
    expect(page.timePickerMaxTimeValidationMsg.getText()).toEqual('maxTime invalid');
    page.maxTimeValidationPickerInput.clear();
    page.maxTimeValidationPickerInput.sendKeys('10:11:12');
    expect(page.timePickerMaxTimeValidationMsg.isPresent()).toBe(false);
  });

  it('should check that the min selectable time option is working', () => {
    page.minTimeInput.click();
    page.minTimeInput.clear();
    page.minTimeInput.sendKeys('08:07:06');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:00:00');
    expect(page.hourDownBtn.getAttribute('disabled')).toEqual('true');
    expect(page.minuteDownBtn.getAttribute('disabled')).toBe(null);
    expect(page.meridiemUpBtn.getAttribute('disabled')).toBe(null);
    expect(page.meridiemDownBtn.getAttribute('disabled')).toBe(null);
  });

  it('should check that the max selectable time option is working', () => {
    page.maxTimeInput.click();
    page.maxTimeInput.clear();
    page.maxTimeInput.sendKeys('09:07:06');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:00:00');
    expect(page.hourUpBtn.getAttribute('disabled')).toEqual('true');
    expect(page.minuteUpBtn.getAttribute('disabled')).toBe(null);
    expect(page.meridiemUpBtn.getAttribute('disabled')).toEqual('true');
    expect(page.meridiemDownBtn.getAttribute('disabled')).toEqual('true');
  });

  it('should check that the 12 hour time format options work', () => {
    page.showSeconds.click();
    page.hours12FormatInput.clear();
    page.hours12FormatInput.sendKeys('h');
    page.minutesFormatInput.clear();
    page.minutesFormatInput.sendKeys('m');
    page.secondsFormatInput.clear();
    page.secondsFormatInput.sendKeys('s');
    page.meridiemFormatInput.clear();
    page.meridiemFormatInput.sendKeys('a');
    page.timeSeparatorInput.clear();
    page.timeSeparatorInput.sendKeys('-');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:08:07');
    expect(page.hourDisplay.getText()).toEqual('9');
    expect(page.minuteDisplay.getText()).toEqual('8');
    expect(page.secondDisplay.getText()).toEqual('7');
    expect(page.meridiemDisplay.getText()).toEqual('am');
    expect(page.timeSeparatorDisplay.getText()).toEqual('-');
  });

  it('should check that the 24 hour time format options work', () => {
    page.showTwentyFourHours.click();
    page.showSeconds.click();
    page.hours24FormatInput.clear();
    page.hours24FormatInput.sendKeys('H');
    page.minutesFormatInput.clear();
    page.minutesFormatInput.sendKeys('m');
    page.secondsFormatInput.clear();
    page.secondsFormatInput.sendKeys('s');
    page.timeSeparatorInput.clear();
    page.timeSeparatorInput.sendKeys('-');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:08:07');
    expect(page.hourDisplay.getText()).toEqual('9');
    expect(page.minuteDisplay.getText()).toEqual('8');
    expect(page.secondDisplay.getText()).toEqual('7');
    expect(page.timeSeparatorDisplay.getText()).toEqual('-');
  });

  it('should check that the interval options work', () => {
    page.showSeconds.click();
    page.minutesIntervalInput.clear();
    page.minutesIntervalInput.sendKeys('6');
    page.secondsIntervalInput.clear();
    page.secondsIntervalInput.sendKeys('7');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:08:07');
    page.minuteUpBtn.click();
    expect(page.minuteDisplay.getText()).toEqual('14');
    expect(page.timePickerInput.getAttribute('value')).toEqual('09:14:07');
    page.minuteDownBtn.click();
    expect(page.minuteDisplay.getText()).toEqual('08');
    expect(page.timePickerInput.getAttribute('value')).toEqual('09:08:07');
    page.secondUpBtn.click();
    expect(page.secondDisplay.getText()).toEqual('14');
    expect(page.timePickerInput.getAttribute('value')).toEqual('09:08:14');
    page.secondDownBtn.click();
    expect(page.secondDisplay.getText()).toEqual('07');
    expect(page.timePickerInput.getAttribute('value')).toEqual('09:08:07');
  });
});
