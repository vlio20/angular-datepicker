import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {CalendarMonthService} from './calendar-month.service';
import {ICalendarMonthConfig} from './calendar-month-config.model';
import {ICalendarDay, IDayEvent} from './day.model';
import {Moment} from 'moment';

@Component({
  selector: 'dp-calendar-month',
  templateUrl: './dp-calendar-month.component.html',
  styleUrls: ['./dp-calendar-month.component.less'],
  providers: [CalendarMonthService]
})
export class DpCalendarMonthComponent implements OnInit, OnChanges {
  @Input() config: ICalendarMonthConfig;
  @Input() selected: Moment[];
  @Output() dayClick: EventEmitter<IDayEvent> = new EventEmitter();
  @Output() dayContextMenu: EventEmitter<IDayEvent> = new EventEmitter();
  weeks: ICalendarDay[][];
  weekdays: string[];

  constructor(private calendarService: CalendarMonthService) {
  }

  ngOnInit() {
    this.weeks = this.calendarService.generateMonthArray(this.config, this.selected);
    this.weekdays = this.calendarService.generateWeekdays(this.config.firstDayOfWeek, this.config.weekdayNames);
  }

  ngOnChanges(changes: SimpleChanges) {
    const {selected} = changes;
    if (selected && !selected.isFirstChange()) {
      this.weeks = this.calendarService
        .generateMonthArray(this.config, this.selected);
    }
  }

  isDisabledDay(day: ICalendarDay) {
    return this.calendarService.isDateDisabled(day, this.config);
  }
}
