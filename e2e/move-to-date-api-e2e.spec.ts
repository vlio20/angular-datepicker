import {DemoPage} from './app.po';

describe('Move to date api', () => {

  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should move to date API on day', () => {
    const runner = (menuItem, input, isPicker, cont) => {
      menuItem.click();
      page.moveCalendarTo.click();

      if (isPicker) {
        input.click();
      }

      expect(cont.getText()).toContain('1987');
    };

    runner(page.dayPickerMenu, page.dayPickerInput, true, page.dayCalendarNavHeaderBtn);
    runner(page.dayDirectiveMenu, page.dayDirectiveInput, true, page.dayCalendarNavHeaderBtn);
    runner(page.dayInlineMenu, null, false, page.dayCalendarNavHeaderBtnInline);

    runner(page.daytimePickerMenu, page.daytimePickerInput, true, page.dayCalendarNavHeaderBtn);
    runner(page.daytimeDirectiveMenu, page.daytimeDirectiveInput, true, page.dayCalendarNavHeaderBtn);
    runner(page.daytimeInlineMenu, null, false, page.dayTimeCalendarNavHeaderBtnInline);

    runner(page.monthPickerMenu, page.monthPickerInput, true, page.navHeader);
    runner(page.monthDirectiveMenu, page.monthDirectiveInput, true, page.navHeader);
    runner(page.monthInlineMenu, null, false, page.monthCalendarNavHeaderInline);
  });
});
