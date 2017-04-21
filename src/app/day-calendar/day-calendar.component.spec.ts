import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UtilsService} from '../common/services/utils/utils.service';
import {CalendarNavComponent} from '../calendar-nav/calendar-nav.component';
import * as moment from 'moment';
import {DayCalendarComponent} from './day-calendar.component';
import {DayCalendarService} from './day-calendar.service';
import {MonthCalendarComponent} from '../month-calendar/month-calendar.component';

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
    })).toEqual('05');
  });
});
