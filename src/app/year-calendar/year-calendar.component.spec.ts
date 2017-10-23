import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {YearCalendarComponent} from './year-calendar.component';
import {UtilsService} from '../common/services/utils/utils.service';
import {CalendarNavComponent} from '../calendar-nav/calendar-nav.component';
import {YearCalendarService} from './year-calendar.service';
import * as moment from 'moment';
import {IYear} from './year.model';
import {Moment} from 'moment';

describe('Component: YearCalendarComponent', () => {
  let component: YearCalendarComponent;
  let fixture: ComponentFixture<YearCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearCalendarComponent, CalendarNavComponent],
      providers: [YearCalendarService, UtilsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearCalendarComponent);
    component = fixture.componentInstance;
    component.config = component.yearCalendarService.getConfig({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should have the right CSS classes for', () => {
    const defaultYear: IYear = {
      date: undefined,
      selected: false,
      currentYear: false,
      disabled: false,
      text: ''
    };
    const defaultCssClasses: { [klass: string]: boolean } = {
      'dp-selected': false,
      'dp-current-year': false
    };

    it('the selected year', () => {
      expect(component.getYearBtnCssClass({
        ...defaultYear,
        selected: true
      } as IYear)).toEqual({
        ...defaultCssClasses,
        'dp-selected': true
      });
    });

    it('the current year', () => {
      expect(component.getYearBtnCssClass({
        ...defaultYear,
        currentYear: true
      } as IYear)).toEqual({
        ...defaultCssClasses,
        'dp-current-year': true
      });
    });

    it('custom days', () => {
      component.componentConfig.yearBtnCssClassCallback = (day: Moment) => 'custom-class';

      expect(component.getYearBtnCssClass({
        ...defaultYear
      } as IYear)).toEqual({
        ...defaultCssClasses,
        'custom-class': true
      });
    });
  });
});
