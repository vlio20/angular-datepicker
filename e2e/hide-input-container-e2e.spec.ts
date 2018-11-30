import {DemoPage} from './app.po';

describe('hideInputContainer', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should hide/show InputContainer datetimepicker', async () => {
    expect(await page.daytimePickerInput.isDisplayed()).toBe(true);
    page.hideInputRadio.click();
    expect(await page.daytimePickerInput.isDisplayed()).toBe(false);
  });
});
