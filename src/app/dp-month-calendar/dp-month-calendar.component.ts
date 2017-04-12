import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IMonth} from './month.model';
import {MonthCalendarService} from './month-calendar.service';
import {Moment} from 'moment';

@Component({
  selector: 'dp-month-calendar',
  templateUrl: './dp-month-calendar.component.html',
  styleUrls: ['./dp-month-calendar.component.less'],
  providers: [MonthCalendarService]
})
export class MonthCalendarComponent implements OnInit {
  @Input() config: any;
  @Input() selected: Moment;

  @Output() monthClick: EventEmitter<Moment> = new EventEmitter();
  yearMonths: IMonth[][];

  constructor(private monthCalendarService: MonthCalendarService) {
  }

  ngOnInit() {
    this.yearMonths = this.monthCalendarService.generateYear(this.config.month, this.selected);
  }

  isDisabledMonth(month: IMonth): boolean {
    return this.monthCalendarService.isDateDisabled(month, this.config);
  }

  monthSelected(month: IMonth) {
    this.monthClick.emit(month.date);
  }
}
