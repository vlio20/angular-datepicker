import {DemoComponent} from './demo.component';
import {TestBed} from '@angular/core/testing';

describe('Component: Demo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoComponent]
    })
  })

  it('should create an instance', () => {
    const component = TestBed.inject(DemoComponent);
    expect(component).toBeTruthy();
  });
});
