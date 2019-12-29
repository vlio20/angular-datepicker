import {UtilsService} from '../common/services/utils/utils.service';
import {DatePickerDirective} from './date-picker.directive';
import {Component} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

@Component({
  template: ''
})
class TestComponent {
}

describe('Directive: DpDayPicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [UtilsService]
    });
  });

  const directive = new DatePickerDirective(null, null, null, null, null, null);

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should check UtilsService.closestParent', inject([UtilsService], (service: UtilsService) => {
    const root = TestBed.createComponent(TestComponent).nativeElement;
    root.innerHTML = `
      <div id="top">
        <span class="wrapper">
          <input type="text" />
        </span>
      </div>
      `;
    const inputElement = root.querySelector('input');

    const wrapperElement = service.closestParent(inputElement, '.wrapper');
    expect(wrapperElement.tagName).toBe('SPAN');
    expect(wrapperElement.className).toBe('wrapper');

    const topElement = service.closestParent(inputElement, '#top');
    expect(topElement.tagName).toBe('DIV');
    expect(topElement.id).toBe('top');

    const notFoundElement = service.closestParent(inputElement, '.notFound');
    expect(notFoundElement).toBeUndefined();
  }));
});
