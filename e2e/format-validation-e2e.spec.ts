import {DemoPage} from './app.po';

describe('format validation', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should check that the format validation is working', () => {
    const common = (menu, input) => {
      menu.click();
      input.sendKeys('lmaldlad');
      page.clickOnBody();
      expect(page.formatValidationMsg.getText()).toBe('invalid format');
      input.clear();
    };

    common(page.daytimePickerMenu, page.daytimePickerInput);
    common(page.daytimeDirectiveMenu, page.daytimeDirectiveInput);
    common(page.dayPickerMenu, page.dayPickerInput);
    common(page.dayDirectiveMenu, page.dayDirectiveInput);
    common(page.dayDirectiveReactiveMenu, page.dayDirectiveReactiveInput);
    common(page.monthPickerMenu, page.monthPickerInput);
    common(page.monthDirectiveMenu, page.monthDirectiveInput);
    common(page.timePickerMenu, page.timePickerInput);
    common(page.timeDirectiveMenu, page.timeSelectDirectiveInput);
  });
});
