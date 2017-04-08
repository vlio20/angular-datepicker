import {DayCalendarComponent} from '../dp-day-calendar/dp-day-calendar.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CalendarComponent} from './dp-calendar.component';
import {MonthCalendarComponent} from '../dp-month-calendar/dp-month-calendar.component';
import {UtilsService} from '../common/services/utils/utils.service';

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
});
