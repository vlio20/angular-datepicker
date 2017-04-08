import {TestBed, inject} from '@angular/core/testing';
import {CalendarService} from '../dp-calendar/calendar.service';
import {DayPickerService} from './day-picker.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';

describe('Service: DayPicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayPickerService, CalendarService, UtilsService]
    });
  });

  it('should check isDateValid method', inject([DayPickerService], (service: DayPickerService) => {
    expect(DayPickerService.isDateValid('13-10-2015', 'DD-MM-YYYY')).toBe(true);
    expect(DayPickerService.isDateValid('13-10-2015', 'DD-MM-YY')).toBe(false);
    expect(DayPickerService.isDateValid('', 'DD-MM-YY')).toBe(true);
  }));

  it('should check getConfig method for dates format aspect', inject([DayPickerService],
    (service: DayPickerService) => {
      const config1 = service.getConfig({
        min: '2016-10-25',
        max: '2017-10-25',
        format: 'YYYY-MM-DD'
      });

      expect((<Moment>config1.min).isSame(moment('2016-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);
      expect((<Moment>config1.max).isSame(moment('2017-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);

      const config2 = service.getConfig({
        min: moment('2016-10-25', 'YYYY-MM-DD'),
        max: moment('2017-10-25', 'YYYY-MM-DD')
      });

      expect((<Moment>config2.min).isSame(moment('2016-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);
      expect((<Moment>config2.max).isSame(moment('2017-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);
    }));
});
