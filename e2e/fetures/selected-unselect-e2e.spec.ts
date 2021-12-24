import {DemoPage} from '../app.po';
import * as dayjs from 'dayjs';

describe('dpDayPicker timePicker', () => {

  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should make sure unSelectOnClick feature works as expected for day calendar', async () => {
    const dayRunner = async (menuItem, input, isPicker) => {
      const date = dayjs();
      const dayClick = async () => {
        if (isPicker) {
          await page.clickOnDayButton(date.format('DD'));
        } else {
          await page.clickOnDayButtonInline(date.format('DD'));
        }
      };

      await menuItem.click();
      await page.enableUnselectSelected.click();

      if (isPicker) {
        await page.scrollIntoView(page.noCloseOnSelect);
        await page.noCloseOnSelect.click();
        await page.clearInput(input);
        await input.click();
      } else {
        await page.clickOnDayButtonInline(date.format('DD'));
      }

      await dayClick();
      expect(await page.selectedDay.isPresent()).toEqual(true);
      await dayClick();
      expect(await page.selectedDay.isPresent()).toEqual(false);

      await page.clickOnBody();

      await page.disableUnselectSelected.click();

      if (isPicker) {
        await input.click();
      }

      await dayClick();

      expect(await page.selectedDay.isPresent()).toEqual(true);

      await dayClick();
      expect(await page.selectedDay.isPresent()).toEqual(true);

      await page.enableUnselectSelected.click();

      if (isPicker) {
        await input.click();
      }

      await dayClick();
      expect(await page.selectedDay.isPresent()).toEqual(false);
    };

    await dayRunner(page.dayPickerMenu, page.dayPickerInput, true);
    await dayRunner(page.dayDirectiveMenu, page.dayDirectiveInput, true);
    await dayRunner(page.dayInlineMenu, null, false);
  });

  it('should make sure unSelectOnClick feature works as expected for month calendar', async () => {
    const monthRunner = async (menuItem, input, isPicker) => {
      const date = dayjs();
      const monthClick = async () => {
        if (isPicker) {
          await page.clickOnMonthButton(date.format('MMM'));
        } else {
          await page.clickOnMonthButtonInline(date.format('MMM'));
        }
      };

      await menuItem.click();
      await page.enableUnselectSelected.click();

      if (isPicker) {
        await page.scrollIntoView(page.noCloseOnSelect);
        await page.noCloseOnSelect.click();
        await page.clearInput(input);
        await input.click();
      } else {
        await page.clickOnMonthButtonInline(date.format('MMM'));
      }

      await monthClick();
      expect(await page.selectedMonth.isPresent()).toEqual(true);
      await monthClick();
      expect(await page.selectedMonth.isPresent()).toEqual(false);

      await page.clickOnBody();
      await page.scrollIntoView(page.disableUnselectSelected);
      await page.disableUnselectSelected.click();

      if (isPicker) {
        await input.click();
      }

      await monthClick();

      expect(await page.selectedMonth.isPresent()).toEqual(true);

      await monthClick();
      expect(await page.selectedMonth.isPresent()).toEqual(true);

      await page.enableUnselectSelected.click();

      if (isPicker) {
        await input.click();
      }

      await monthClick();
      expect(await page.selectedMonth.isPresent()).toEqual(false);
    };

    await monthRunner(page.monthPickerMenu, page.monthPickerInput, true);
    await monthRunner(page.monthDirectiveMenu, page.monthDirectiveInput, true);
    await monthRunner(page.monthInlineMenu, null, false);
  });
});
