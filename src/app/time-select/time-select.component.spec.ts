import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UtilsService} from '../common/services/utils/utils.service';
import {CalendarNavComponent} from '../calendar-nav/calendar-nav.component';
import * as momentNs from 'moment';
import {TimeSelectComponent} from './time-select.component';
import {TimeSelectService} from './time-select.service';
import {MonthCalendarComponent} from '../month-calendar/month-calendar.component';

const moment = momentNs;

describe('Component: TimeSelectComponent', () => {
  let component: TimeSelectComponent;
  let fixture: ComponentFixture<TimeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeSelectComponent, CalendarNavComponent, MonthCalendarComponent],
      providers: [TimeSelectService, UtilsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSelectComponent);
    component = fixture.componentInstance;
    component.config = component.timeSelectService.getConfig({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate time parts', () => {
    component.selected = moment('5:33:44', 'H:mm:ss');
    expect(component.hours).toEqual('05');
    expect(component.minutes).toEqual('33');
    expect(component.seconds).toEqual('44');
    expect(component.meridiem).toEqual('AM');
  });
});
