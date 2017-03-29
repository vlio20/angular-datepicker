import {CalendarService} from '../dp-calendar/calendar.service';
import {DpDayPickerComponent} from './dp-day-picker.component';
import {DayPickerService} from './day-picker.service';

describe('Component: DpDayPicker', () => {
  const component = new DpDayPickerComponent(new DayPickerService(new CalendarService()));

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
