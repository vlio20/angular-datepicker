import {DayCalendarComponent} from '../dp-day-calendar/dp-day-calendar.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CalendarComponent} from './dp-calendar.component';
import {MonthCalendarComponent} from '../dp-month-calendar/dp-month-calendar.component';
import {UtilsService} from '../common/services/utils/utils.service';
import * as moment from 'moment';
import {Moment} from 'moment';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, DayCalendarComponent, MonthCalendarComponent],
      providers: [UtilsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check month format', () => {
    const testDate = moment('19870114', 'YYYYMMDD');
    component.config = {
      monthFormat: 'MM'
    };

    expect(component.getMonthToDisplay(testDate)).toBe('01');
  });

  it('should check month formatter', () => {
    const testDate = moment('19870114', 'YYYYMMDD');

    component.config = {
      monthFormat: 'MM',
      monthFormatter: (date: Moment) => {
        return date.format('MMM');
      }
    };

    expect(component.getMonthToDisplay(testDate)).toBe('Jan');
  });

  it('should check year format', () => {
    const testDate = moment('19870114', 'YYYYMMDD');
    component.config = {
      yearFormat: 'YY'
    };

    expect(component.getYearToDisplay(testDate)).toBe('87');
  });

  it('should check year formatter', () => {
    const testDate = moment('19870114', 'YYYYMMDD');

    component.config = {
      yearFormat: 'YY',
      yearFormatter: (date: Moment) => {
        return date.format('YYYY');
      }
    };

    expect(component.getYearToDisplay(testDate)).toBe('1987');
  });
});
