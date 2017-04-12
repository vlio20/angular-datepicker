import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNavComponent } from './calendar-nav.component';

describe('CalendarNavComponent', () => {
  let component: CalendarNavComponent;
  let fixture: ComponentFixture<CalendarNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
