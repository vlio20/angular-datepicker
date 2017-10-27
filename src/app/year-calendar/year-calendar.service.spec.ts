import {inject, TestBed} from '@angular/core/testing';
import * as moment from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {YearCalendarService} from './year-calendar.service';
import {IYear} from './year.model';

describe('Service: YearCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YearCalendarService, UtilsService]
    });
  });

  it('should check getYearBtnCssClass method',
    inject([YearCalendarService],
      (service: YearCalendarService) => {
        const date = moment('05-04-2017', 'DD-MM-YYYY');
        expect(service.getYearBtnCssClass({}, date)).toEqual('');
        expect(service.getYearBtnCssClass({yearBtnCssClassCallback: (m => 'class1 class2')}, date))
          .toEqual('class1 class2');
      }));
});
