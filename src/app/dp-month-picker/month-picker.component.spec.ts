import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DpMonthPickerComponent} from './month-picker.component';

describe('MonthPickerComponent', () => {
  let component: DpMonthPickerComponent;
  let fixture: ComponentFixture<DpMonthPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DpMonthPickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
