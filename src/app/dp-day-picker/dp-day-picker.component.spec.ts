/* tslint:disable:no-unused-variable */

import {DpDayPickerComponent} from './dp-day-picker.component';
import {DayPickerService} from './service/day-picker.service';

describe('Component: ObDayPicker', () => {
  const component = new DpDayPickerComponent(new DayPickerService());

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
