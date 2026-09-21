import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {form, FormField} from '@angular/forms/signals';
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

@Component({
  standalone: false,
  template: '<dp-date-picker [config]="config" [formField]="dateForm.date"></dp-date-picker>'
})
class SignalFormDatePickerHostComponent {
  readonly config = {format: 'YYYY-MM-DD'};
  readonly model = signal({date: '2026-09-21'});
  readonly dateForm = form(this.model);
}

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
      imports: [FormsModule, OverlayModule, FormField],
      declarations: [
        SignalFormDatePickerHostComponent,
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

  it('should render an initial value when bound through Signal Forms', () => {
    const signalFormFixture = TestBed.createComponent(SignalFormDatePickerHostComponent);

    expect(() => signalFormFixture.detectChanges()).not.toThrow();

    const datePicker = signalFormFixture.debugElement.query(By.directive(DatePickerComponent))
      .componentInstance as DatePickerComponent;
    expect(datePicker.selected[0].format('YYYY-MM-DD')).toBe('2026-09-21');
    expect(signalFormFixture.componentInstance.model().date).toBe('2026-09-21');
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
