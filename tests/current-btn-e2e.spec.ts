import {DemoPage} from './app.po';
import dayjs from 'dayjs'
import {expect, Locator, Page, test} from '@playwright/test';

test.describe('dpDayPicker dayPicker', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
  });

  test('should check if go to current location btn is working as expected', async () => {
    const currentMonth = dayjs().format('MMM, YYYY');
    const currentYear = dayjs().format('YYYY');
    const prevMonth = dayjs().subtract(1, 'month').format('MMM, YYYY');
    const prevYear = dayjs().subtract(1, 'year').format('YYYY');

    const commonDayCalendar = async (menu: Locator, input: Locator) => {
      await menu.click();
      await po.showGoToCurrentRadio().click();
      await input.click();
      await expect(await po.currentLocationBtn()).toBeVisible();
      await expect(await po.dayCalendarNavHeaderBtn().textContent()).toEqual(currentMonth);
      await po.dayCalendarLeftNavBtn().click();
      await expect(await po.dayCalendarNavHeaderBtn().textContent()).toEqual(prevMonth);
      await po.currentLocationBtn().click();
      await expect(await po.dayCalendarNavHeaderBtn().textContent()).toEqual(currentMonth);
      await po.dayCalendarNavHeaderBtn().click();
      await expect(await po.dayCalendarNavMonthHeaderBtn().textContent()).toEqual(currentYear);
      await po.monthCalendarLeftNavBtn().click();
      await expect(await po.dayCalendarNavMonthHeaderBtn().textContent()).toEqual(prevYear);
      await po.dayCalendarNavMonthHeaderBtn().click();

      await po.currentLocationBtn().click();
      await expect(await po.dayCalendarNavHeaderBtn().textContent()).toEqual(currentMonth);

      await po.hideGoToCurrentRadio().click();
      await input.click();
      await expect(await po.currentLocationBtn()).toBeHidden();
      await po.dayCalendarNavHeaderBtn().click();
      await expect(await po.currentLocationBtn()).toBeHidden();
    };

    const commonMonth = async (menu: Locator, input: Locator) => {
      await menu.click();
      await po.showGoToCurrentRadio().click();
      await input.click();
      await expect(await po.currentLocationBtn()).toBeVisible();
      await expect(await po.deyCalendarMonthNavHeader().textContent()).toEqual(currentYear);
      await po.monthCalendarLeftNavBtn().click();
      await expect(await po.deyCalendarMonthNavHeader().textContent()).toEqual(prevYear);
      await po.currentLocationBtn().click();
      await expect(await po.deyCalendarMonthNavHeader().textContent()).toEqual(currentYear);

      await po.hideGoToCurrentRadio().click();
      await input.click();
      await expect(await po.currentLocationBtn()).toBeHidden();
    };

    await commonDayCalendar(po.daytimePickerMenu(), po.daytimePickerInput());
    await commonDayCalendar(po.daytimeDirectiveMenu(), po.daytimeDirectiveInput());

    await commonDayCalendar(po.dayPickerMenu(), po.dayPickerInput());
    await commonDayCalendar(po.dayDirectiveMenu(), po.dayDirectiveInput());

    await commonMonth(po.monthPickerMenu(), po.monthPickerInput());
    await commonMonth(po.monthDirectiveMenu(), po.monthDirectiveInput());
  });

  test('should hide current date button when not between min and max', async () => {
    await po.dayPickerMenu().click();
    await po.setText(po.minSelectableInput(), dayjs().add(3, 'month').format('DD-MM-YYYY'));
    await po.dayPickerInput().click();
    await expect(await po.currentLocationBtn()).toBeHidden();
  });
});
