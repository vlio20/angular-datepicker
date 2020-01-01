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

  getConfig(config: IDatePickerDirectiveConfig = {},
            baseElement?: ElementRef,
            attachTo?: ElementRef | string): IDatePickerDirectiveConfig {
    const _config: IDatePickerDirectiveConfig = {...config};
    _config.hideInputContainer = true;

    let native;

    if (config.inputElementContainer) {
      native = this.utilsService.getNativeElement(config.inputElementContainer);
    } else {
      native = baseElement ? baseElement.nativeElement : null;
    }

    if (native) {
      _config.inputElementContainer = attachTo
        ? this.convertToHTMLElement(attachTo, native)
        : native;
    }

    return _config;
  }
}
