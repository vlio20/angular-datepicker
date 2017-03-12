import {TestBed, inject} from '@angular/core/testing';
import {UtilsService} from './utils.service';

describe('Service: ObUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService]
    });
  });

  it('should ...', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
  }));
});
