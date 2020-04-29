import {DemoPage} from './app.po';
import * as moment from 'moment';

describe('dpDayPicker daytimePicker', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();

    await page.dateFormatInput.clear();
    await page.dateFormatInput.sendKeys('DD-MM-YYYY HH:mm:ss');
    await page.daytimePickerMenu.click();
  });

  it('should check if min date validation is working', async () => {
    await page.minDateValidationPickerInput.clear();
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
    await page.setInputValue(page.minDateValidationPickerInput, '10-04-2017 10:08:07');
    await page.setInputValue(page.daytimePickerInput, '10-04-2017 09:08:07');
    expect(await page.minDateValidationMsg.getText()).toEqual('minDate invalid');
    await page.setInputValue(page.minDateValidationPickerInput, '10-04-2017 09:08:07');
    expect(await page.minDateValidationMsg.isPresent()).toBe(false);
  });

  it('should check if max date validation is working', async () => {
    await page.maxDateValidationPickerInput.clear();
    expect(await page.maxDateValidationMsg.isPresent()).toBe(false);
    await page.setInputValue(page.maxDateValidationPickerInput, '12-04-2017 08:08:07');
    await page.setInputValue(page.daytimePickerInput, '12-04-2017 09:08:07');
    expect(await page.maxDateValidationMsg.getText()).toEqual('maxDate invalid');
    await page.setInputValue(page.maxDateValidationPickerInput, '12-04-2017 09:08:07');
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
    await page.setInputValue(page.daytimePickerInput, '11-04-2017 09:06:07');
    expect(await page.hourUpBtn.getAttribute('disabled')).toEqual('true');
    expect(await page.minuteUpBtn.getAttribute('disabled')).toBe(null);
    expect(await page.meridiemUpBtn.getAttribute('disabled')).toBe('true');
    expect(await page.meridiemDownBtn.getAttribute('disabled')).toBe('true');
  });

  it('should check that the max selectable option is working', async () => {
    await page.setInputValue(page.daytimePickerInput, '11-04-2017 09:08:07');
    expect(await page.selectedDays.count()).toEqual(1);
    await page.setInputValue(page.daytimePickerInput, ' ');

    expect(await page.selectedDays.count()).toEqual(0);
  });

  it('should check showSecondaryNavigation is working', async () => {
    const currentTime = moment(); // store current time, to avoid having multiple different "current time"
    await page.daytimePickerInput.click(); // open calendar
    // showSecondaryNavigation is off
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);
    await page.dayCalendarNavHeaderBtn.click(); // shows month view of the calendar
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);
    await page.dayCalendarNavHeaderBtn.click(); // hide month view of the calendar

    await page.showSecondaryNavigation.click(); // enables showSecondaryNavigation
    await page.secondaryNavigationStep.clear();
    await page.secondaryNavigationStep.sendKeys('20'); // set step
    await page.daytimePickerInput.click(); // open calendar
    await page.dayCalendarLeftSecondaryNavBtn.click(); // click left secondary navigation button (-20 months)
    expect(await page.dayCalendarNavDayHeaderBtn.getText()).toEqual(currentTime.clone().subtract(20, 'month').format('MMM, YYYY'));

    await page.dayCalendarRightSecondaryNavBtn.click();
    await page.dayCalendarRightSecondaryNavBtn.click();
    expect(await page.dayCalendarNavDayHeaderBtn.getText()).toEqual(currentTime.clone().add(20, 'month').format('MMM, YYYY'));

    await page.dayCalendarNavHeaderBtn.click(); // shows month view of the calendar
    // no button on month view, even if showSecondaryNavigation is enabled
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);
  });
});
