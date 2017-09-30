import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UtilsService} from '../common/services/utils/utils.service';
import {CalendarNavComponent} from '../calendar-nav/calendar-nav.component';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DayCalendarComponent} from './day-calendar.component';
import {DayCalendarService} from './day-calendar.service';
import {MonthCalendarComponent} from '../month-calendar/month-calendar.component';
import {IDay} from './day.model';

describe('Component: DayCalendarComponent', () => {
  let component: DayCalendarComponent;
  let fixture: ComponentFixture<DayCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DayCalendarComponent, CalendarNavComponent, MonthCalendarComponent],
      providers: [DayCalendarService, UtilsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCalendarComponent);
    component = fixture.componentInstance;
    component.config = component.dayCalendarService.getConfig({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check getMonthBtnText default value', () => {
    expect(component.getDayBtnText({
      date: moment('05-04-2017', 'DD-MM-YYYY')
    } as IDay)).toEqual('05');
  });

  describe('should have the right CSS classes for', () => {
    const defaultDay: IDay = {
      date: undefined,
      selected: false,
      currentMonth: false,
      prevMonth: false,
      nextMonth: false,
      currentDay: false
    };
    const defaultCssClasses: {[klass: string]: boolean} = {
      'dp-selected': false,
      'dp-current-month': false,
      'dp-prev-month': false,
      'dp-next-month': false,
      'dp-current-day': false
    };

    it('the selected day', () => {
      expect(component.getDayBtnCssClass({
        ...defaultDay,
        selected: true
      } as IDay)).toEqual({
        ...defaultCssClasses,
        'dp-selected': true
      });
    });

    it('the current month', () => {
      expect(component.getDayBtnCssClass({
        ...defaultDay,
        currentMonth: true
      } as IDay)).toEqual({
        ...defaultCssClasses,
        'dp-current-month': true
      });
    });

    it('the previous month', () => {
      expect(component.getDayBtnCssClass({
        ...defaultDay,
        prevMonth: true
      } as IDay)).toEqual({
        ...defaultCssClasses,
        'dp-prev-month': true
      });
    });

    it('the next month', () => {
      expect(component.getDayBtnCssClass({
        ...defaultDay,
        nextMonth: true
      } as IDay)).toEqual({
        ...defaultCssClasses,
        'dp-next-month': true
      });
    });

    it('the current day', () => {
      expect(component.getDayBtnCssClass({
        ...defaultDay,
        currentDay: true
      } as IDay)).toEqual({
        ...defaultCssClasses,
        'dp-current-day': true
      });
    });

    it('custom days', () => {
      component.componentConfig.dayBtnCssClassCallback = (day: Moment) => 'custom-class';

      expect(component.getDayBtnCssClass({
        ...defaultDay
      } as IDay)).toEqual({
        ...defaultCssClasses,
        'custom-class': true
      });
    });
  });

  describe('should have the correct weekday format', () => {
    it('weekdayFormat', () => {
      component.componentConfig.weekDayFormat = 'd';

      expect(component.getWeekdayName(moment())).toBe(moment().format('d'));
    });

    it('weekdayFormatter', () => {
      component.componentConfig.weekDayFormatter = (x: number) => x.toString();

      expect(component.getWeekdayName(moment())).toBe(moment().day().toString());
    });
  });
});
