import {DemoPage} from './app.po';

describe('format validation', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
  });

  it('should check that the format validation is working', async () => {
    const common = async (menu, input) => {
      await menu.click();
      await input.sendKeys('lmaldlad');
      await page.clickOnBody();
      expect(await page.formatValidationMsg.getText()).toBe('invalid format');
      await input.clear();
    };

    await common(page.daytimePickerMenu, page.daytimePickerInput);
    await common(page.daytimeDirectiveMenu, page.daytimeDirectiveInput);
    await common(page.dayPickerMenu, page.dayPickerInput);
    await common(page.dayDirectiveMenu, page.dayDirectiveInput);
    await common(page.dayDirectiveReactiveMenu, page.dayDirectiveReactiveInput);
    await common(page.monthPickerMenu, page.monthPickerInput);
    await common(page.monthDirectiveMenu, page.monthDirectiveInput);
    await common(page.timePickerMenu, page.timePickerInput);
    await common(page.timeDirectiveMenu, page.timeSelectDirectiveInput);
  });
});
