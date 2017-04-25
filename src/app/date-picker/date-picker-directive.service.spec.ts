import {TestBed, inject} from '@angular/core/testing';
import {DatePickerDirectiveService} from './date-picker-directive.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDate} from '../common/models/date.model';

describe('Service: DatePickerDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePickerDirectiveService, UtilsService]
    });
  });

  it('should check getConfig method', inject([DatePickerDirectiveService],
    (service: DatePickerDirectiveService) => {
      const config1 = service.getConfig();
      expect(config1).toEqual({ hideInputContainer: true });

      const config2 = service.getConfig({ allowMultiSelect: true });
      expect(config2).toEqual({
        allowMultiSelect: true,
        hideInputContainer: true,
      });

      const config3 = service.getConfig({ allowMultiSelect: true }, '.some-class');
      expect(config3).toEqual({
        allowMultiSelect: true,
        hideInputContainer: true,
        inputElementContainer: '.some-class',
      });

      const config4 = service.getConfig({ allowMultiSelect: true }, { nativeElement: 'fakeElement' });
      expect(config4).toEqual({
        allowMultiSelect: true,
        hideInputContainer: true,
        inputElementContainer: 'fakeElement',
      });
    }));
});
