import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DayTimeCalendarComponent} from './day-time-calendar.component';
import {DayTimeCalendarService} from './day-time-calendar.service';
import {DayCalendarComponent} from '../day-calendar/day-calendar.component';
import {TimeSelectComponent} from '../time-select/time-select.component';
import {TimeSelectService} from '../time-select/time-select.service';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {UtilsService} from '../common/services/utils/utils.service';
import {MonthCalendarComponent} from '../month-calendar/month-calendar.component';
import {CalendarNavComponent} from '../calendar-nav/calendar-nav.component';

describe('Component: DayTimeCalendarComponent', () => {
  let component: DayTimeCalendarComponent;
  let fixture: ComponentFixture<DayTimeCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        DayTimeCalendarComponent,
        DayCalendarComponent,
        TimeSelectComponent,
        CalendarNavComponent,
        MonthCalendarComponent
      ],
      providers: [
        DayTimeCalendarService,
        DayCalendarService,
        TimeSelectService,
        UtilsService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTimeCalendarComponent);
    component = fixture.componentInstance;
    component.config = component.dayTimeCalendarService.getConfig({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event goToCurrent when nav emit', () => {
    spyOn(component.onGoToCurrent, 'emit');
    component.dayCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });
});
