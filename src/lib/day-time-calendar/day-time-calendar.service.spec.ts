import {inject, TestBed} from '@angular/core/testing';
import {DayTimeCalendarService} from './day-time-calendar.service';
import * as momentNs from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {TimeSelectService} from '../time-select/time-select.service';
import {IDayCalendarConfigInternal} from '../day-calendar/day-calendar-config.model';

const moment = momentNs;

const DAY_FORMAT = 'YYYYMMDD';
const TIME_FORMAT = 'HH:mm:ss';
const COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;

describe('Service: DayTimeCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayTimeCalendarService, DayCalendarService, TimeSelectService, UtilsService]
    });
  });

  it('should check the updateDay method', inject([DayTimeCalendarService],
    (service: DayTimeCalendarService) => {
      const daytime = moment('2011091313:12:11', COMBINED_FORMAT);
      const day = moment('10110203', DAY_FORMAT);
      expect(service.updateDay(daytime, day, {}).format(COMBINED_FORMAT)).toEqual('1011020313:12:11');
    })
  );

  it('should check the updateTime method when time is before min', inject([DayTimeCalendarService],
    (service: DayTimeCalendarService) => {
      const daytime = moment('2011091313:12:11', COMBINED_FORMAT);
      const config: IDayCalendarConfigInternal = {
        min: daytime.clone().add(10, 'm'),
        max: daytime.clone().add(50, 'm')
      };

      const time = daytime.clone();
      expect(service.updateDay(daytime, time, config).format(COMBINED_FORMAT))
        .toEqual(daytime.clone().add(10, 'm').format(COMBINED_FORMAT));

      expect(service.updateDay(daytime, time, {}).format(COMBINED_FORMAT))
        .toEqual(daytime.format(COMBINED_FORMAT));
    })
  );

  it('should check the updateTime method when time is before max', inject([DayTimeCalendarService],
    (service: DayTimeCalendarService) => {
      const daytime = moment('2011091313:12:11', COMBINED_FORMAT);
      const config: IDayCalendarConfigInternal = {
        min: daytime.clone().subtract(50, 'm'),
        max: daytime.clone().subtract(10, 'm')
      };

      const time = daytime.clone();
      expect(service.updateDay(daytime, time, config).format(COMBINED_FORMAT))
        .toEqual(daytime.clone().subtract(10, 'm').format(COMBINED_FORMAT));

      expect(service.updateDay(daytime, time, {}).format(COMBINED_FORMAT))
        .toEqual(daytime.format(COMBINED_FORMAT));
    })
  );

  it('should check the updateTime method', inject([DayTimeCalendarService], (service: DayTimeCalendarService) => {
      const daytime = moment('2011091313:12:11', COMBINED_FORMAT);
      const time = moment('03:11:10', TIME_FORMAT);
      expect(service.updateTime(daytime, time).format(COMBINED_FORMAT)).toEqual('2011091303:11:10');
    })
  );
});
