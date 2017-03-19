import {Injectable} from '@angular/core';
import {TDrops, TOpens} from '../../types/poistions.type';

@Injectable()
export class DomHelper {

  private static setYAxisPosition(element: HTMLElement, anchor: HTMLElement, drops: TDrops) {
    const {top, bottom} = anchor.getBoundingClientRect();

    if (drops === 'down') {
      element.style.top = bottom + document.body.scrollTop + 'px';
    } else {
      element.style.top = (top + document.body.scrollTop - element.scrollHeight) + 'px';
    }
  }

  private static setXAxisPosition(element: HTMLElement, anchor: HTMLElement, dimElem: HTMLElement, opens: TOpens) {
    const {left, right} = anchor.getBoundingClientRect();

    if (opens === 'right') {
      element.style.left = left + 'px';
    } else {
      element.style.left = left - dimElem.offsetWidth + anchor.offsetWidth + 'px';
    }
  }

  private static isTopInView(el: HTMLElement): boolean {
    const {top} = el.getBoundingClientRect();
    return (top >= 0);
  }

  private static isBottomInView(el: HTMLElement): boolean {
    const {bottom} = el.getBoundingClientRect();
    return (bottom <= window.innerHeight);
  }

  private static isLeftInView(el: HTMLElement): boolean {
    const {left} = el.getBoundingClientRect();
    return (left >= 0);
  }

  private static isRightInView(el: HTMLElement): boolean {
    const {right} = el.getBoundingClientRect();
    return (right <= window.innerWidth);
  }

  setElementPosition({container, element, anchor, dimElem, drops, opens}: IAppendToArgs): void {

    if (container.style.position === 'static') {
      container.style.position = 'relative';
    }

    if (element.style.position !== 'absolute') {
      element.style.position = 'absolute';
    }

    element.style.visibility = 'hidden';

    setTimeout(() => {
      DomHelper.setYAxisPosition(element, anchor, drops);
      DomHelper.setXAxisPosition(element, anchor, dimElem, opens);

      if (drops === 'down' && !DomHelper.isBottomInView(dimElem)) {
        DomHelper.setYAxisPosition(element, anchor, 'up');
      }

      if (drops === 'up' && !DomHelper.isTopInView(dimElem)) {
        DomHelper.setYAxisPosition(element, anchor, 'down');
      }

      if (opens === 'right' && !DomHelper.isRightInView(dimElem)) {
        DomHelper.setXAxisPosition(element, anchor, dimElem, 'left');
      }

      if (opens === 'left' && !DomHelper.isLeftInView(dimElem)) {
        DomHelper.setXAxisPosition(element, anchor, dimElem, 'right');
      }

      element.style.visibility = 'visible';
    });
  }
}

export interface IAppendToArgs {
  container: HTMLElement;
  element: HTMLElement;
  anchor: HTMLElement;
  dimElem: HTMLElement;
  drops: TDrops;
  opens: TOpens;
}