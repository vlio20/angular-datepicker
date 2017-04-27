import {TestBed, inject} from '@angular/core/testing';
import {DatePickerService} from './date-picker.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';

describe('Service: DatePicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePickerService, UtilsService]
    });
  });

  it('should check getConfig method for dates format', inject([DatePickerService],
    (service: DatePickerService) => {
      const config1 = service.getConfig(<any>{
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
