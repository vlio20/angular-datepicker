import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IMonth} from './month.model';
import {MonthCalendarService} from './month-calendar.service';
import {Moment} from 'moment';
import {ICalendarMonthConfig} from '../dp-day-calendar/day-calendar-config.model';

@Component({
  selector: 'dp-month-calendar',
  templateUrl: './dp-month-calendar.component.html',
  styleUrls: ['./dp-month-calendar.component.less'],
  providers: [MonthCalendarService]
})
export class MonthCalendarComponent implements OnInit {
  @Input() config: ICalendarMonthConfig;
  @Input() selected: Moment;

  @Output() monthClick: EventEmitter<Moment> = new EventEmitter();
  yearMonths: IMonth[][];

  constructor(private monthCalendarService: MonthCalendarService) {
  }

  ngOnInit() {
    this.yearMonths = this.monthCalendarService.generateYear(this.config.month, this.selected);
  }

  isDisabledDay(month: IMonth): boolean {
    return false;
  }

  monthSelected(month: IMonth) {
    this.monthClick.emit(month.date);
  }
}
