import {inject, TestBed} from '@angular/core/testing';
import {UtilsService} from './utils.service';
import * as moment from 'moment';
import {IDate} from '../../models/date.model';

describe('Service: ObUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService]
    });
  });

  it('should ...', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
  }));

  it('should check isDateValid method', inject([UtilsService], (service: UtilsService) => {
    expect(service.isDateValid('13-10-2015', 'DD-MM-YYYY')).toBe(true);
    expect(service.isDateValid('13-10-2015', 'DD-MM-YY')).toBe(false);
    expect(service.isDateValid('', 'DD-MM-YY')).toBe(true);
  }));

  it('should check updateSelected method for day', inject([UtilsService], (service: UtilsService) => {
    const date1: IDate = {
      date: moment('21-04-2017', 'DD-MM-YYYY'),
      selected: false
    };

    const date2: IDate = {
      date: moment('22-04-2017', 'DD-MM-YYYY'),
      selected: false
    };

    let arr1 = service.updateSelected(false, [], date1, 'day');
    expect(arr1.length).toEqual(1);
    expect(arr1[0]).toBe(date1.date);

    arr1 = service.updateSelected(false, [], date2, 'day');
    expect(arr1.length).toEqual(1);
    expect(arr1[0]).toBe(date2.date);

    date1.selected = true;
    const arr2 = service.updateSelected(false, arr1, date1, 'day');
    expect(arr2.length).toEqual(0);

    date2.selected = false;
    expect(service.updateSelected(true, [date1.date], date2, 'day').length).toEqual(2);

    date1.selected = true;
    expect(service.updateSelected(true, [date1.date], date1, 'day').length).toEqual(0);
  }));

  it('should check updateSelected method for month', inject([UtilsService], (service: UtilsService) => {
    const date1: IDate = {
      date: moment('21-04-2017', 'DD-MM-YYYY'),
      selected: false
    };

    const date2: IDate = {
      date: moment('22-04-2017', 'DD-MM-YYYY'),
      selected: false
    };

    const date3: IDate = {
      date: moment('22-05-2017', 'DD-MM-YYYY'),
      selected: false
    };

    let arr1 = service.updateSelected(false, [], date1, 'month');
    expect(arr1.length).toEqual(1);
    expect(arr1[0]).toBe(date1.date);

    arr1 = service.updateSelected(false, [], date2, 'month');
    expect(arr1.length).toEqual(1);
    expect(arr1[0]).toBe(date2.date);

    date1.selected = true;
    const arr2 = service.updateSelected(false, arr1, date1, 'month');
    expect(arr2.length).toEqual(0);

    date3.selected = false;
    expect(service.updateSelected(true, [date1.date], date3, 'month').length).toEqual(2);

    date1.selected = true;
    expect(service.updateSelected(true, [date1.date], date1, 'month').length).toEqual(0);
  }));
});
