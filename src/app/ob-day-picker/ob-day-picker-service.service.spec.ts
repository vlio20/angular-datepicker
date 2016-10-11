/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ObDayPickerServiceService } from './ob-day-picker-service.service.ts';

describe('Service: ObDayPickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObDayPickerServiceService]
    });
  });

  it('should ...', inject([ObDayPickerServiceService], (service: ObDayPickerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
