import {Injectable} from '@angular/core';
import {TDrops, TOpens} from '../../types/poistions.type';

@Injectable()
export class DomHelper {

  private static setYAxisPosition(element: HTMLElement, container: HTMLElement, anchor: HTMLElement, drops: TDrops) {
    const anchorRect = anchor.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const bottom = anchorRect.bottom - containerRect.top;
    const top = anchorRect.top - containerRect.top;

    if (drops === 'down') {
      element.style.top = (bottom - 1 + 'px');
    } else {
      element.style.top = (top + 1 - element.scrollHeight) + 'px';
    }
  }

  private static setXAxisPosition(element: HTMLElement, container: HTMLElement, anchor: HTMLElement, dimElem: HTMLElement, opens: TOpens) {
    const anchorRect = anchor.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const left = anchorRect.left - containerRect.left;

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

  appendElementToPosition(config: IAppendToArgs): void {
    const {container, element} = config;

    if (!container.style.position || container.style.position === 'static') {
      container.style.position = 'relative';
    }

    if (element.style.position !== 'absolute') {
      element.style.position = 'absolute';
    }

    element.style.visibility = 'hidden';

    setTimeout(() => {
      this.setElementPosition(config);

      element.style.visibility = 'visible';
    });
  }

  setElementPosition({element, container, anchor, dimElem, drops, opens}: IAppendToArgs) {
    DomHelper.setYAxisPosition(element, container, anchor, drops);
    DomHelper.setXAxisPosition(element, container, anchor, dimElem, opens);

    if (drops === 'down' && !DomHelper.isBottomInView(dimElem)) {
      DomHelper.setYAxisPosition(element, container, anchor, 'up');
    }

    if (drops === 'up' && !DomHelper.isTopInView(dimElem)) {
      DomHelper.setYAxisPosition(element, container, anchor, 'down');
    }

    if (opens === 'right' && !DomHelper.isRightInView(dimElem)) {
      DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'left');
    }

    if (opens === 'left' && !DomHelper.isLeftInView(dimElem)) {
      DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
    }
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
