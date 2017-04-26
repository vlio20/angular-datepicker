import {TestBed, inject} from '@angular/core/testing';
import {DatePickerDirectiveService} from './date-picker-directive.service';
import {UtilsService} from '../common/services/utils/utils.service';

describe('Service: DatePickerDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePickerDirectiveService, UtilsService]
    });
  });

  it('should check convertToElement method', inject([DatePickerDirectiveService, UtilsService],
    (service: DatePickerDirectiveService, stubUtilsService: UtilsService) => {
      stubUtilsService.closestParent = jasmine.createSpy('closestParent').and.returnValue('fakeElement');

      const baseElement = <any>{};
      const element1 = service.convertToHTMLElement({nativeElement: 'fakeElement'}, baseElement);
      expect(element1).toBe('fakeElement');
      expect(stubUtilsService.closestParent).not.toHaveBeenCalled();

      const element2 = service.convertToHTMLElement('.notFound', baseElement);
      expect(element2).toBe('fakeElement');
      expect(stubUtilsService.closestParent).toHaveBeenCalledWith(baseElement, '.notFound');
    }));

  it('should check getConfig method', inject([DatePickerDirectiveService],
    (service: DatePickerDirectiveService) => {
      const config1 = service.getConfig();
      expect(config1).toEqual({hideInputContainer: true});

      const config2 = service.getConfig({allowMultiSelect: true});
      expect(config2).toEqual({
        allowMultiSelect: true,
        hideInputContainer: true,
      });

      const config3 = service.getConfig({allowMultiSelect: true}, 'fakeElement');
      expect(config3).toEqual({
        allowMultiSelect: true,
        hideInputContainer: true,
        inputElementContainer: 'fakeElement',
      });
    }));
});
