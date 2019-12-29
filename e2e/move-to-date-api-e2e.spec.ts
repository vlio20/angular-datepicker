import {DemoPage} from './app.po';

describe('Move to date api', () => {

  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
  });

  it('should move to date API on day', async () => {
    const runner = async (menuItem, input, isPicker, cont) => {
      await menuItem.click();
      await page.moveCalendarTo.click();

      if (isPicker) {
        input.click();
      }

      expect(await cont.getText()).toContain('1987');
    };

    await runner(page.dayPickerMenu, page.dayPickerInput, true, page.dayCalendarNavHeaderBtn);
    await runner(page.dayDirectiveMenu, page.dayDirectiveInput, true, page.dayCalendarNavHeaderBtn);
    await runner(page.dayInlineMenu, null, false, page.dayCalendarNavHeaderBtnInline);

    await runner(page.daytimePickerMenu, page.daytimePickerInput, true, page.dayCalendarNavHeaderBtn);
    await runner(page.daytimeDirectiveMenu, page.daytimeDirectiveInput, true, page.dayCalendarNavHeaderBtn);
    await runner(page.daytimeInlineMenu, null, false, page.dayTimeCalendarNavHeaderBtnInline);

    await runner(page.monthPickerMenu, page.monthPickerInput, true, page.navHeader);
    await runner(page.monthDirectiveMenu, page.monthDirectiveInput, true, page.navHeader);
    await runner(page.monthInlineMenu, null, false, page.monthCalendarNavHeaderInline);
  });
});
