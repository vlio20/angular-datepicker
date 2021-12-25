import {inject, TestBed} from '@angular/core/testing';
import {DatePickerService} from './date-picker.service';

import {UtilsService} from '../common/services/utils/utils.service';
import {DayTimeCalendarService} from '../day-time-calendar/day-time-calendar.service';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {TimeSelectService} from '../time-select/time-select.service';
import {Dayjs} from 'dayjs';
import {dayjsRef} from '../common/dayjs/dayjs.ref';

describe('Service: DatePicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatePickerService,
        DayTimeCalendarService,
        DayCalendarService,
        TimeSelectService,
        UtilsService
      ]
    });
  });

  it('should check getConfig method for dates format', inject([DatePickerService],
    (service: DatePickerService) => {
      const config1 = service.getConfig(<any>{
        min: '2016-10-25',
        max: '2017-10-25',
        format: 'YYYY-MM-DD'
      });

      expect((<Dayjs>config1.min).isSame(dayjsRef('2016-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);
      expect((<Dayjs>config1.max).isSame(dayjsRef('2017-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);

      const config2 = service.getConfig({
        min: dayjsRef('2016-10-25', 'YYYY-MM-DD'),
        max: dayjsRef('2017-10-25', 'YYYY-MM-DD')
      });

      expect((<Dayjs>config2.min).isSame(dayjsRef('2016-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);
      expect((<Dayjs>config2.max).isSame(dayjsRef('2017-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);

      expect(service.getConfig({}, 'time').format).toEqual('HH:mm:ss');
      expect(service.getConfig({}, 'daytime').format).toEqual('DD-MM-YYYY HH:mm:ss');
      expect(service.getConfig({}, 'month').format).toEqual('MMM, YYYY');
      expect(service.getConfig({}, 'day').format).toEqual('DD-MM-YYYY');
      expect(service.getConfig({}).format).toEqual('DD-MM-YYYY HH:mm:ss');
    }));
});
