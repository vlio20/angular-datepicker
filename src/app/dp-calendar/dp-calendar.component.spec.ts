import {DpCalendarMonthComponent} from '../dp-day-calendar/dp-day-calendar.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DpCalendarComponent} from './dp-calendar.component';

describe('DpCalendarComponent', () => {
  let component: DpCalendarComponent;
  let fixture: ComponentFixture<DpCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DpCalendarComponent, DpCalendarMonthComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
