import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CalendarNavComponent} from './calendar-nav.component';

describe('CalendarNavComponent', () => {
  let component: CalendarNavComponent;
  let fixture: ComponentFixture<CalendarNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarNavComponent]
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

  it('should emit event when go to current click', () => {
    const nativeElement = fixture.nativeElement;
    const goToCurrent = nativeElement.querySelector('.dp-current-location-btn');

    spyOn(component.onGoToCurrent, 'emit');
    goToCurrent.dispatchEvent(new Event('click'));
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });
});
