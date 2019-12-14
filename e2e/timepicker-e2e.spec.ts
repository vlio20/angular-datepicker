import {DemoPage} from './app.po';

fdescribe('dpDayPicker timePicker', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();

    await page.timePickerMenu.click();
    await page.dateFormatInput.clear();
    await page.dateFormatInput.sendKeys('HH:mm:ss');
  });

  it('should check if min time validation is working', async () => {
    await page.minTimeValidationPickerInput.clear();
    expect(await page.timePickerMinTimeValidationMsg.isPresent()).toBe(false);
    await page.minTimeValidationPickerInput.clear();
    await page.minTimeValidationPickerInput.sendKeys('10:11:12');
    await page.timePickerInput.click();
    await page.timePickerInput.clear();
    await page.timePickerInput.sendKeys('09:00:00');
    await page.clickOnBody();
    expect(await page.timePickerMinTimeValidationMsg.isPresent()).toBe(true);
    expect(await page.timePickerMinTimeValidationMsg.getText()).toEqual('minTime invalid');
    await page.minTimeValidationPickerInput.clear();
    await page.minTimeValidationPickerInput.sendKeys('08:07:06');
    await page.clickOnBody();
    expect(await page.timePickerMinTimeValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max time validation is working', async () => {
    page.maxTimeValidationPickerInput.click();
    page.maxTimeValidationPickerInput.clear();
    expect(await page.timePickerMaxTimeValidationMsg.isPresent()).toBe(false);
    page.maxTimeValidationPickerInput.clear();
    page.maxTimeValidationPickerInput.sendKeys('08:07:06');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:00:00');
    page.clickOnBody();
    expect(await page.timePickerMaxTimeValidationMsg.getText()).toEqual('maxTime invalid');
    page.maxTimeValidationPickerInput.clear();
    page.maxTimeValidationPickerInput.sendKeys('10:11:12');
    expect(await page.timePickerMaxTimeValidationMsg.isPresent()).toBe(false);
  });

  it('should check that the min selectable time option is working', async () => {
    page.minTimeInput.click();
    page.minTimeInput.clear();
    page.minTimeInput.sendKeys('08:07:06');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:00:00');
    expect(await page.hourDownBtn.getAttribute('disabled')).toEqual('true');
    expect(await page.minuteDownBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemUpBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemDownBtn.getAttribute('disabled')).toBe(null);
  });

  it('should check that the max selectable time option is working', async () => {
    page.maxTimeInput.click();
    page.maxTimeInput.clear();
    page.maxTimeInput.sendKeys('09:07:06');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:00:00');
    expect(await page.hourUpBtn.getAttribute('disabled')).toEqual('true');
    expect(await page.minuteUpBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemUpBtn.getAttribute('disabled')).toEqual('true');
    expect(await page.meridiemDownBtn.getAttribute('disabled')).toEqual('true');
  });

  it('should check that the 12 hour time format options work', async () => {
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
    expect(await page.hourDisplay.getText()).toEqual('9');
    expect(await page.minuteDisplay.getText()).toEqual('8');
    expect(await page.secondDisplay.getText()).toEqual('7');
    expect(await page.meridiemDisplay.getText()).toEqual('am');
    expect(await page.timeSeparatorDisplay.getText()).toEqual('-');
  });

  it('should check that the 24 hour time format options work', async () => {
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
    expect(await page.hourDisplay.getText()).toEqual('9');
    expect(await page.minuteDisplay.getText()).toEqual('8');
    expect(await page.secondDisplay.getText()).toEqual('7');
    expect(await page.timeSeparatorDisplay.getText()).toEqual('-');
  });

  it('should check that the interval options work', async () => {
    page.showSeconds.click();
    page.minutesIntervalInput.clear();
    page.minutesIntervalInput.sendKeys('6');
    page.secondsIntervalInput.clear();
    page.secondsIntervalInput.sendKeys('7');
    page.timePickerInput.click();
    page.timePickerInput.clear();
    page.timePickerInput.sendKeys('09:08:07');
    page.minuteUpBtn.click();
    expect(await page.minuteDisplay.getText()).toEqual('14');
    expect(await page.timePickerInput.getAttribute('value')).toEqual('09:14:07');
    page.minuteDownBtn.click();
    expect(await page.minuteDisplay.getText()).toEqual('08');
    expect(await page.timePickerInput.getAttribute('value')).toEqual('09:08:07');
    page.secondUpBtn.click();
    expect(await page.secondDisplay.getText()).toEqual('14');
    expect(await page.timePickerInput.getAttribute('value')).toEqual('09:08:14');
    page.secondDownBtn.click();
    expect(await page.secondDisplay.getText()).toEqual('07');
    expect(await page.timePickerInput.getAttribute('value')).toEqual('09:08:07');
  });
});
