import {UtilsService} from '../common/services/utils/utils.service';
import {IDatePickerDirectiveConfig} from './date-picker-directive-config.model';
import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class DatePickerDirectiveService {
  constructor(public utilsService: UtilsService) {
  }

  convertToHTMLElement(attachTo: ElementRef | string, baseElement: HTMLElement): HTMLElement {
    if (typeof attachTo === 'string') {
      return this.utilsService.closestParent(baseElement, attachTo);
    } else if (attachTo) {
      return attachTo.nativeElement;
    }

    return undefined;
  }

  getConfig(config: IDatePickerDirectiveConfig = {}, attachTo?: HTMLElement): IDatePickerDirectiveConfig {
    const _config: IDatePickerDirectiveConfig = {...config};
    _config.hideInputContainer = true;

    if (attachTo) {
      _config.inputElementContainer = attachTo;
    }

    return _config;
  }
}
