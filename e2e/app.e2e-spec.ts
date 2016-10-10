import { Ng2DatePickerPage } from './app.po';

describe('ng2-date-picker App', function() {
  let page: Ng2DatePickerPage;

  beforeEach(() => {
    page = new Ng2DatePickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
