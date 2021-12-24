import {DemoPage} from './app.po';

describe('hideInputContainer', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
  });

  it('should hide/show InputContainer datetimepicker', async () => {
    expect(await page.daytimePickerInput.isDisplayed()).toBe(true);
    await page.hideInputRadio.click();
    expect(await page.daytimePickerInput.isPresent()).toBe(false);
  });
});
