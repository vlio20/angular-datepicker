import {DemoPage} from './app.po';
import * as moment from 'moment';
import {ElementFinder} from 'protractor';

describe('dpDayPicker dayPicker', () => {

  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should check if go to current location btn is working as expected', () => {
    const currentMonth = moment().format('MMM, YYYY');
    const currentYear = moment().format('YYYY');
    const prevMonth = moment().subtract(1, 'month').format('MMM, YYYY');
    const prevYear = moment().subtract(1, 'year').format('YYYY');

    const commonDayCalendar = async (menu: ElementFinder, input: ElementFinder) => {
      menu.click();
      page.showGoToCurrentRadio.click();
      input.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(true);
      expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(currentMonth);
      page.dayCalendarLeftNavBtn.click();
      expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(prevMonth);
      page.currentLocationBtn.click();
      expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(currentMonth);
      page.dayCalendarNavHeaderBtn.click();
      expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(currentYear);
      page.monthCalendarLeftNavBtn.click();
      expect(await page.dayCalendarNavMonthHeaderBtn.getText()).toEqual(prevYear);
      page.dayCalendarNavMonthHeaderBtn.click();

      page.currentLocationBtn.click();
      expect(await page.dayCalendarNavHeaderBtn.getText()).toEqual(currentMonth);

      page.hideGoToCurrentRadio.click();
      input.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(false);
      page.dayCalendarNavHeaderBtn.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(false);
    };

    const commonMonth = async (menu: ElementFinder, input?: ElementFinder) => {
      menu.click();
      page.showGoToCurrentRadio.click();
      input.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(true);
      expect(await page.deyCalendarMonthNavHeader.getText()).toEqual(currentYear);
      page.monthCalendarLeftNavBtn.click();
      expect(await page.deyCalendarMonthNavHeader.getText()).toEqual(prevYear);
      page.currentLocationBtn.click();
      expect(await page.deyCalendarMonthNavHeader.getText()).toEqual(currentYear);

      page.hideGoToCurrentRadio.click();
      input.click();
      expect(await page.currentLocationBtn.isPresent()).toBe(false);
    };

    commonDayCalendar(page.daytimePickerMenu, page.daytimePickerInput);
    commonDayCalendar(page.daytimeDirectiveMenu, page.daytimeDirectiveInput);

    commonDayCalendar(page.dayPickerMenu, page.dayPickerInput);
    commonDayCalendar(page.dayDirectiveMenu, page.dayDirectiveInput);
    commonDayCalendar(page.dayDirectiveReactiveMenu, page.dayDirectiveReactiveInput);

    commonMonth(page.monthPickerMenu, page.monthPickerInput);
    commonMonth(page.monthDirectiveMenu, page.monthDirectiveInput);
  });

  it('should hide current date button when not between min and max', async () => {
    page.dayPickerMenu.click();
    page.minSelectableInput.sendKeys(moment().add(3, 'month').format('DD-MM-YYYY'));
    page.dayPickerInput.click();
    expect(await page.currentLocationBtn.isPresent()).toBe(false);
  });
});
