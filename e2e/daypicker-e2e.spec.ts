import {DemoPage} from './app.po';
import * as moment from 'moment';

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

  it('should check showSecondaryNavigationDayView and showSecondaryNavigationMonthView are working together', async () => {
    const currentTime = moment();
    await page.dayPickerMenu.click();
    await page.dayPickerInput.click();

    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);
    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);
    await page.dayCalendarNavHeaderBtn.click();

    await page.scrollIntoView(await page.showSecondaryNavigationDayView);
    await page.showSecondaryNavigationDayView.click();
    await page.secondaryNavigationStepDayView.clear();
    await page.secondaryNavigationStepDayView.sendKeys('20');
    await page.dayPickerInput.click();
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(true);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(true);
    await page.dayCalendarLeftSecondaryNavBtn.click();
    expect(await page.dayCalendarNavDayHeaderBtn.getText()).toEqual(currentTime.clone().subtract(20, 'month').format('MMM, YYYY'));
    await page.dayCalendarRightSecondaryNavBtn.click();
    await page.dayCalendarRightSecondaryNavBtn.click();
    expect(await page.dayCalendarNavDayHeaderBtn.getText()).toEqual(currentTime.clone().add(20, 'month').format('MMM, YYYY'));

    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);
    await page.dayCalendarNavHeaderBtn.click();
    await page.clickOnBody();


    await page.scrollIntoView(await page.showSecondaryNavigationMonthView);
    await page.showSecondaryNavigationMonthView.click();
    await page.dayPickerInput.click();
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(true);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(true);
    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(true);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(true);
    await page.dayCalendarNavHeaderBtn.click();
    await page.clickOnBody();

    await page.setInputValue(page.daytimePickerInput, currentTime.format('DD-MM-YYYY'));
    await page.scrollIntoView(await page.hideSecondaryNavigationDayView);
    await page.hideSecondaryNavigationDayView.click();
    await page.secondaryNavigationStepMonthView.clear();
    await page.secondaryNavigationStepMonthView.sendKeys('25');
    await page.dayPickerInput.click();
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(false);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(false);
    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.dayCalendarLeftSecondaryNavBtn.isPresent()).toBe(true);
    expect(await page.dayCalendarRightSecondaryNavBtn.isPresent()).toBe(true);
    await page.dayCalendarLeftSecondaryNavBtn.click();
    expect(await page.dayCalendarNavDayHeaderBtn.getText()).toEqual(currentTime.clone().subtract(25, 'year').format('YYYY'));
    await page.dayCalendarRightSecondaryNavBtn.click();
    await page.dayCalendarRightSecondaryNavBtn.click();
    expect(await page.dayCalendarNavDayHeaderBtn.getText()).toEqual(currentTime.clone().add(25, 'year').format('YYYY'));
    await page.dayCalendarNavHeaderBtn.click();
  });
});
