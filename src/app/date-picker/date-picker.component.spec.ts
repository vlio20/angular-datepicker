import {DatePickerComponent} from './date-picker.component';
import {DayTimeCalendarComponent} from '../day-time-calendar/day-time-calendar.component';
import {DayTimeCalendarService} from '../day-time-calendar/day-time-calendar.service';
import {DomHelper} from '../common/services/dom-appender/dom-appender.service';
import {CalendarMode} from '../common/types/calendar-mode';

describe('Component: DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  const setComponentMode = function(mode: CalendarMode) {
    component.mode = mode;
    component.init();
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
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
        DomHelper
      ]
    }).compileComponents();
  }));

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

    spyOn(component.onGoToCurrent, 'emit');
    component.dayCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });

  it('should emit event goToCurrent when month calendar emit', () => {
    setComponentMode('month');

    spyOn(component.onGoToCurrent, 'emit');
    component.monthCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });

  it('should emit event goToCurrent when daytime calendar emit', () => {
    setComponentMode('daytime');

    spyOn(component.onGoToCurrent, 'emit');
    component.dayTimeCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });
});
