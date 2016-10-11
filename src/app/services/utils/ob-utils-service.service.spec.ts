/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ObUtilsServiceService } from './ob-utils-service.service.ts';

describe('Service: ObUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObUtilsServiceService]
    });
  });

  it('should ...', inject([ObUtilsServiceService], (service: ObUtilsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
