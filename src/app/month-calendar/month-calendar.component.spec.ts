import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MonthCalendarComponent} from './month-calendar.component';
import {UtilsService} from '../common/services/utils/utils.service';
import {CalendarNavComponent} from '../calendar-nav/calendar-nav.component';
import {MonthCalendarService} from './month-calendar.service';
import * as moment from 'moment';
import {IMonth} from './month.model';
import {Moment} from 'moment';

describe('Component: MonthCalendarComponent', () => {
  let component: MonthCalendarComponent;
  let fixture: ComponentFixture<MonthCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthCalendarComponent, CalendarNavComponent],
      providers: [MonthCalendarService, UtilsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthCalendarComponent);
    component = fixture.componentInstance;
    component.config = component.monthCalendarService.getConfig({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should have the right CSS classes for', () => {
    const defaultMonth: IMonth = {
      date: undefined,
      selected: false,
      currentMonth: false,
      disabled: false,
      text: ''
    };
    const defaultCssClasses: { [klass: string]: boolean } = {
      'dp-selected': false,
      'dp-current-month': false
    };

    it('the selected month', () => {
      expect(component.getMonthBtnCssClass({
        ...defaultMonth,
        selected: true
      } as IMonth)).toEqual({
        ...defaultCssClasses,
        'dp-selected': true
      });
    });

    it('the current month', () => {
      expect(component.getMonthBtnCssClass({
        ...defaultMonth,
        currentMonth: true
      } as IMonth)).toEqual({
        ...defaultCssClasses,
        'dp-current-month': true
      });
    });

    it('custom days', () => {
      component.componentConfig.monthBtnCssClassCallback = (day: Moment) => 'custom-class';

      expect(component.getMonthBtnCssClass({
        ...defaultMonth
      } as IMonth)).toEqual({
        ...defaultCssClasses,
        'custom-class': true
      });
    });
  });
});
