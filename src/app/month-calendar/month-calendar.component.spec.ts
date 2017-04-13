import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MonthCalendarComponent} from './month-calendar.component';
import {UtilsService} from '../common/services/utils/utils.service';
import {MonthCalendarService} from './month-calendar.service';
import * as moment from 'moment';

describe('Component: MonthCalendarComponent', () => {
  let component: MonthCalendarComponent;
  let fixture: ComponentFixture<MonthCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthCalendarComponent],
      providers: [MonthCalendarService, UtilsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthCalendarComponent);
    component = fixture.componentInstance;
    component.config = {
      month: moment()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
