import {FormsModule} from '@angular/forms';
import {DatePickerComponent} from './date-picker.component';
import {DayTimeCalendarComponent} from '../day-time-calendar/day-time-calendar.component';
import {DayTimeCalendarService} from '../day-time-calendar/day-time-calendar.service';
import {CalendarMode} from '../common/types/calendar-mode';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DayCalendarComponent} from '../day-calendar/day-calendar.component';
import {TimeSelectComponent} from '../time-select/time-select.component';
import {CalendarNavComponent} from '../calendar-nav/calendar-nav.component';
import {MonthCalendarComponent} from '../month-calendar/month-calendar.component';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {TimeSelectService} from '../time-select/time-select.service';
import {UtilsService} from '../common/services/utils/utils.service';
import {By} from '@angular/platform-browser';
import {OverlayModule} from '@angular/cdk/overlay';

describe('Component: DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  const setComponentMode = function (mode: CalendarMode) {
    component.mode = mode;
    component.init();
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, OverlayModule],
      declarations: [
        DatePickerComponent,
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
        UtilsService,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event goToCurrent when day calendar emit', () => {
    setComponentMode('day');
    component.showCalendars();
    fixture.detectChanges();

    spyOn(component.onGoToCurrent, 'emit');
    component.dayCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });

  it('should emit event goToCurrent when month calendar emit', () => {
    setComponentMode('month');
    component.showCalendars();
    fixture.detectChanges();

    spyOn(component.onGoToCurrent, 'emit');
    component.monthCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });

  it('should emit event goToCurrent when daytime calendar emit', () => {
    setComponentMode('daytime');
    component.showCalendars();
    fixture.detectChanges();

    spyOn(component.onGoToCurrent, 'emit');
    component.dayTimeCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });

  it('should call onTouched when input is blurred', () => {
    setComponentMode('day');
    spyOn(component, 'onTouchedCallback');
    component.registerOnTouched(component.onTouchedCallback);

    const inputElement = fixture.debugElement.query(By.css('.dp-picker-input'));
    inputElement.triggerEventHandler('blur', {});

    expect(component.onTouchedCallback).toHaveBeenCalledWith();
  });
});
