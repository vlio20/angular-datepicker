import {CalendarService} from '../dp-calendar/calendar.service';
import {DpDayPickerComponent} from './date-picker.component';
import {DayPickerService} from './date-picker.service';

describe('Component: DpDayPicker', () => {
  const component = new DpDayPickerComponent(new DayPickerService(new CalendarService()));

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
