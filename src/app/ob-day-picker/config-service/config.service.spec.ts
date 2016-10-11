/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('Service: ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService]
    });
  });

  it('should ...', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));
});
