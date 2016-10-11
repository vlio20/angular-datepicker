/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DayPickerService } from './day-picker.service';

describe('Service: ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayPickerService]
    });
  });

  it('should ...', inject([DayPickerService], (service: DayPickerService) => {
    expect(service).toBeTruthy();
  }));
});
