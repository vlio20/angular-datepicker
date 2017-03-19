import {Injectable} from '@angular/core';
import {TDrops, TOpens} from '../../types/poistions.type';

@Injectable()
export class DomHelper {

  setElementPosition(args: IAppendToArgs): void {
    const {container, element, anchor, drops, opens} = args;
    const popupElem = <HTMLElement>element.querySelector('.dp-popup');

    if (container.style.position === 'static') {
      container.style.position = 'relative';
    }

    if (element.style.position !== 'absolute') {
      element.style.position = 'absolute'
    }

    element.style.visibility = 'hidden';

    setTimeout(() => {
      DomHelper.setYAxisPosition(element, anchor, drops);
      DomHelper.setXAxisPosition(element, anchor, opens);

      if (drops === 'down' && !DomHelper.isBottomInView(popupElem)) {
        DomHelper.setYAxisPosition(element, anchor, 'up');
      }

      if (drops === 'up' && !DomHelper.isTopInView(popupElem)) {
        DomHelper.setYAxisPosition(element, anchor, 'down');
      }

      element.style.visibility = 'visible';
    });
  }

  private static setYAxisPosition(element: HTMLElement, anchor: HTMLElement, drops: TDrops) {
    const anchorPosition = anchor.getBoundingClientRect();

    if (drops === 'down') {
      element.style.top = anchorPosition.bottom + document.body.scrollTop + 'px';
    } else {
      element.style.top = (anchorPosition.top + document.body.scrollTop - element.scrollHeight) + 'px';
    }
  }

  private static setXAxisPosition(element: HTMLElement, anchor: HTMLElement, opens: TOpens) {
    const anchorPosition = anchor.getBoundingClientRect();

    if (opens === 'right') {
      element.style.left = anchorPosition.left + 'px';
    } else {
      element.style.right = anchorPosition.right + 'px';
    }
  }

  private static isTopInView(el: HTMLElement): boolean {
    const elemTop = el.getBoundingClientRect().top;

    return (elemTop >= 0);
  }

  private static isBottomInView(el: HTMLElement): boolean {
    const elemBottom = el.getBoundingClientRect().bottom;

    return (elemBottom <= window.innerHeight);
  }
}

export interface IAppendToArgs {
  container: HTMLElement;
  element: HTMLElement;
  anchor: HTMLElement;
  drops: TDrops;
  opens: TOpens;
}