import {DemoPage} from './app.po';
import * as moment from 'moment';
import {browser} from 'protractor';
import * as fs from 'fs';
import {TestUtils} from './test-utils';

describe('dpDayPicker timePicker', () => {

  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should make sure unSelectOnClick feature works as expected for day calendar', () => {
    const dayRunner = (menuItem, input, isPicker) => {
      const date = moment();
      const dayClick = () => {
        if (isPicker) {
          page.clickOnDayButton(date.format('DD'));
        } else {
          page.clickOnDayButtonInline(date.format('DD'));
        }
      };

      menuItem.click();
      page.enableUnselectSelected.click();

      if (isPicker) {
        page.scrollIntoView(page.noCloseOnSelect);
        page.noCloseOnSelect.click();
        input.click();
      }

      dayClick();
      expect(page.selectedDay.isPresent()).toEqual(true);
      dayClick();
      expect(page.selectedDay.isPresent()).toEqual(false);

      page.clickOnBody();

      page.disableUnselectSelected.click();

      if (isPicker) {
        input.click();
      }

      dayClick();

      expect(page.selectedDay.isPresent()).toEqual(true);

      dayClick();
      expect(page.selectedDay.isPresent()).toEqual(true);

      page.enableUnselectSelected.click();

      if (isPicker) {
        input.click();
      }

      dayClick();
      expect(page.selectedDay.isPresent()).toEqual(false);
    };

    dayRunner(page.dayPickerMenu, page.dayPickerInput, true);
    dayRunner(page.dayDirectiveMenu, page.dayDirectiveInput, true);
    dayRunner(page.dayInlineMenu, null, false);
  });

  it('should make sure unSelectOnClick feature works as expected for month calendar', () => {
    const monthRunner = (menuItem, input, isPicker) => {
      const date = moment();
      const dayClick = () => {
        if (isPicker) {
          page.clickOnMonthButton(date.format('MMM'));
        } else {
          page.clickOnMonthButtonInline(date.format('MMM'));
        }
      };

      menuItem.click();
      page.enableUnselectSelected.click();

      if (isPicker) {
        page.scrollIntoView(page.noCloseOnSelect);
        page.noCloseOnSelect.click();
        input.click();
      }

      dayClick();
      expect(page.selectedMonth.isPresent()).toEqual(true);
      dayClick();
      expect(page.selectedMonth.isPresent()).toEqual(false);

      page.clickOnBody();
      page.scrollIntoView(page.disableUnselectSelected);
      page.disableUnselectSelected.click();

      if (isPicker) {
        input.click();
      }

      dayClick();

      expect(page.selectedMonth.isPresent()).toEqual(true);

      dayClick();
      expect(page.selectedMonth.isPresent()).toEqual(true);

      page.enableUnselectSelected.click();

      if (isPicker) {
        input.click();
      }

      dayClick();
      expect(page.selectedMonth.isPresent()).toEqual(false);
    };

    monthRunner(page.monthPickerMenu, page.monthPickerInput, true);
    monthRunner(page.monthDirectiveMenu, page.monthDirectiveInput, true);
    monthRunner(page.monthInlineMenu, null, false);
  });
});
