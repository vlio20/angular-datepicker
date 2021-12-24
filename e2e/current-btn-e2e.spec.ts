import {DemoPage} from './app.po';
import * as dayjs from 'dayjs';
import {ElementFinder} from 'protractor';

describe('dpDayPicker dayPicker', () => {

  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should check if go to current location btn is working as expected', async () => {
    const currentMonth = dayjs().format('MMM, YYYY');
    const currentYear = dayjs().format('YYYY');
    const prevMonth = dayjs().subtract(1, 'month').format('MMM, YYYY');
    const prevYear = dayjs().subtract(1, 'year').format('YYYY');

    const commonDayCalendar = async (menu: ElementFinder, input: ElementFinder) => {
      await menu.click();
      await page.showGoToCurrentRadio.click();
      await input.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(true);
      expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(currentMonth);
      await page.dayCalendarLeftNavBtn.click();
      expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(prevMonth);
      await page.currentLocationBtn.click();
      expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(currentMonth);
      await page.dayCalendarNavHeaderBtn.click();
      expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(currentYear);
      await page.monthCalendarLeftNavBtn.click();
      expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(prevYear);
      await page.dayCalendarNavMonthHeaderBtn.click();

      await page.currentLocationBtn.click();
      expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(currentMonth);

      await page.hideGoToCurrentRadio.click();
      await input.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(false);
      await page.dayCalendarNavHeaderBtn.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(false);
    };

    const commonMonth = async (menu: ElementFinder, input?: ElementFinder) => {
      await menu.click();
      await page.showGoToCurrentRadio.click();
      await input.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(true);
      expect(await page.deyCalendarMonthNavHeader.getText()).toEqual(currentYear);
      await page.monthCalendarLeftNavBtn.click();
      expect(await page.deyCalendarMonthNavHeader.getText()).toEqual(prevYear);
      await page.currentLocationBtn.click();
      expect(await page.deyCalendarMonthNavHeader.getText()).toEqual(currentYear);

      await page.hideGoToCurrentRadio.click();
      await input.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(false);
    };

    await commonDayCalendar(page.daytimePickerMenu, page.daytimePickerInput);
    await commonDayCalendar(page.daytimeDirectiveMenu, page.daytimeDirectiveInput);

    await commonDayCalendar(page.dayPickerMenu, page.dayPickerInput);
    await commonDayCalendar(page.dayDirectiveMenu, page.dayDirectiveInput);

    await commonMonth(page.monthPickerMenu, page.monthPickerInput);
    await commonMonth(page.monthDirectiveMenu, page.monthDirectiveInput);
  });

  it('should hide current date button when not between min and max', async () => {
    await page.dayPickerMenu.click();
    await page.minSelectableInput.sendKeys(dayjs().add(3, 'month').format('DD-MM-YYYY'));
    await page.dayPickerInput.click();
    expect(await page.currentLocationBtn.isPresent()).toBe(false);
  });
});
