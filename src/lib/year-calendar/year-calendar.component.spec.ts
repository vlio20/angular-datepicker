import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearCalendarComponent } from './year-calendar.component';

describe('YearCalendarComponent', () => {
  let component: YearCalendarComponent;
  let fixture: ComponentFixture<YearCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
