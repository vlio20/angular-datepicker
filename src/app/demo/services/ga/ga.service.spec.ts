import { TestBed, inject } from '@angular/core/testing';

import { GaService } from './ga.service';

describe('GaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GaService]
    });
  });

  it('should ...', inject([GaService], (service: GaService) => {
    expect(service).toBeTruthy();
  }));
});
