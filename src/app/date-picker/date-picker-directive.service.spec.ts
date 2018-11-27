import {inject, TestBed} from '@angular/core/testing';
import {DatePickerDirectiveService} from './date-picker-directive.service';
import {UtilsService} from '../common/services/utils/utils.service';

describe('Service: DatePickerDirective', () => {
  const fakeElement: HTMLElement = document.createElement('div');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePickerDirectiveService, UtilsService]
    });
  });

  it('should check convertToElement method', inject([DatePickerDirectiveService, UtilsService],
    (service: DatePickerDirectiveService, stubUtilsService: UtilsService) => {
      stubUtilsService.closestParent = jasmine.createSpy('closestParent').and.returnValue(fakeElement);

      const baseElement = <any>{};
      const element1 = service.convertToHTMLElement({nativeElement: fakeElement}, baseElement);
      expect(element1).toBe(fakeElement);
      expect(stubUtilsService.closestParent).not.toHaveBeenCalled();

      const element2 = service.convertToHTMLElement('.notFound', baseElement);
      expect(element2).toBe(<HTMLElement>fakeElement);
      expect(stubUtilsService.closestParent).toHaveBeenCalledWith(baseElement, '.notFound');
    }));

  it('should check getConfig method', inject([DatePickerDirectiveService],
    (service: DatePickerDirectiveService) => {
      service.convertToHTMLElement = jasmine.createSpy('convertToHTMLElement').and.returnValue(fakeElement);

      const config1 = service.getConfig();
      expect(config1).toEqual({hideInputContainer: true});
      expect(service.convertToHTMLElement).not.toHaveBeenCalled();

      const config2 = service.getConfig({allowMultiSelect: true});
      expect(config2).toEqual({
        allowMultiSelect: true,
        hideInputContainer: true
      });
      expect(service.convertToHTMLElement).not.toHaveBeenCalled();

      const config3 = service.getConfig({allowMultiSelect: true}, {nativeElement: fakeElement});
      expect(config3).toEqual({
        allowMultiSelect: true,
        hideInputContainer: true,
        inputElementContainer: fakeElement
      });
      expect(service.convertToHTMLElement).not.toHaveBeenCalled();

      const fakeAttachElementRef = {nativeElement: {}};
      const fakeElementRef = {nativeElement: fakeElement};
      const config4 = service.getConfig({allowMultiSelect: true}, fakeElementRef, fakeAttachElementRef);
      expect(config4).toEqual({
        allowMultiSelect: true,
        hideInputContainer: true,
        inputElementContainer: fakeElement
      });
      expect(service.convertToHTMLElement).toHaveBeenCalledWith(fakeAttachElementRef, fakeElement);

      const config5 = service.getConfig({allowMultiSelect: true}, fakeElementRef, 'someSelector');
      expect(config5).toEqual({
        allowMultiSelect: true,
        hideInputContainer: true,
        inputElementContainer: fakeElement
      });
      expect(service.convertToHTMLElement).toHaveBeenCalledWith('someSelector', fakeElement);
    }));
});
