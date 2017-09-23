import {DatePickerComponent} from './date-picker.component';
import {DatePickerService} from './date-picker.service';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {UtilsService} from '../common/services/utils/utils.service';
import {DomHelper} from '../common/services/dom-appender/dom-appender.service';
import {By} from '@angular/platform-browser';
import {DayCalendarComponent} from '../day-calendar/day-calendar.component';

describe('Component: DpDayPicker', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let debug: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
      providers: [DatePickerService,
        UtilsService,
        DomHelper],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('openOnFocus = false, should not open picker when focused', fakeAsync(() => {
    component.componentConfig.openOnFocus = false;
    debug.query(By.css('input')).nativeElement.focus();
    expect(component.areCalendarsShown).toBe(false);
  }));

  it('openOnFocus = true, should open picker when focused', fakeAsync(() => {
    component.componentConfig.openOnFocus = true;
    debug.query(By.css('input')).nativeElement.focus();
    tick(component.componentConfig.onOpenDelay || 0);
    tick(10);
    fixture.detectChanges();
    expect(component.areCalendarsShown).toBe(true);
  }));

  it('openOnClick = false, should not open picker when clicked', fakeAsync(() => {
    component.componentConfig.openOnClick = false;
    debug.query(By.css('input')).nativeElement.click();
    expect(component.areCalendarsShown).toBe(false);
  }));

  it('openOnClick = true, should open picker when clicked', fakeAsync(() => {
    component.componentConfig.openOnClick = true;
    debug.query(By.css('input')).nativeElement.click();
    tick(component.componentConfig.onOpenDelay || 0);
    fixture.detectChanges();
    expect(component.areCalendarsShown).toBe(true);
  }));

});
