import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'dp-calendar-nav',
  templateUrl: './calendar-nav.component.html',
  styleUrls: ['./calendar-nav.component.less']
})
export class CalendarNavComponent {
  @Output() onLeftNav: EventEmitter<null> = new EventEmitter();
  @Output() onRightNav: EventEmitter<null> = new EventEmitter();
  @Output() onLabelClick: EventEmitter<null> = new EventEmitter();
  @Input() label: string;
  @Input() isLabelClickable: boolean = false;
  @Input() showLeftNav: boolean = true;
  @Input() showRightNav: boolean = true;
  @Input() leftNavDisabled: boolean = false;
  @Input() rightNavDisabled: boolean = false;

  leftNavClicked() {
    this.onLeftNav.emit();
  }

  rightNavClicked() {
    this.onRightNav.emit();
  }

  labelClicked() {
    this.onLabelClick.emit();
  }
}
