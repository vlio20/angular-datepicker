import {Injectable} from '@angular/core';

@Injectable()
export class DomHelper {

  setElementPosition(args: IAppendToArgs): void {
    const {container, element, anchor} = args;
    if (container.style.position === 'static') {
      container.style.position = 'relative';
    }

    if (element.style.position !== 'absolute') {
      element.style.position = 'absolute'
    }

    const anchorPosition = anchor.getBoundingClientRect();
    element.style.top = anchorPosition.bottom + document.body.scrollTop + 'px';
    element.style.left = anchorPosition.left + 'px';
    element.style.visibility = 'hidden';

    setTimeout(() => {
      if (!DomHelper.isScrolledIntoView(<HTMLElement>element.querySelector('.dp-popup'))) {
        element.style.top = (anchorPosition.top + document.body.scrollTop - element.scrollHeight) + 'px';
        element.style.left = anchorPosition.left + 'px';
      }

      element.style.visibility = 'visible';
    });
  }

  private static isScrolledIntoView(el: HTMLElement): boolean {
    const elemTop = el.getBoundingClientRect().top;
    const elemBottom = el.getBoundingClientRect().bottom;

    return (elemTop >= 0) && (elemBottom <= window.innerHeight);
  }
}

export interface IAppendToArgs {
  container: HTMLElement,
  element: HTMLElement,
  anchor: HTMLElement
}