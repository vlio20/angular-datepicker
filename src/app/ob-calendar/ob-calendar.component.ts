import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {CalendarService} from './service/calendar.service';
import {ICalendarConfig} from './config/calendar-config.model';
import {ICalendarDay} from './config/day.model';
import {Moment} from 'moment';

@Component({
  selector: 'ob-calendar',
  templateUrl: './ob-calendar.component.html',
  styleUrls: ['./ob-calendar.component.less'],
  providers: [CalendarService]
})
export class ObCalendarComponent implements OnInit, OnChanges {
  @Input() config: ICalendarConfig;
  @Input() selected: Moment;
  @Output('on-change') dateClicked = new EventEmitter();
  weeks: ICalendarDay[][];
  weekdays: string[];

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.weeks = this.calendarService.generateMonthArray(this.config.firstDayOfWeek, this.config.month,
      this.selected);
    this.weekdays = this.calendarService.generateWeekdays(this.config.firstDayOfWeek, this.config.weekdayNames);
  }

  ngOnChanges(changes: SimpleChanges) {
    const {selected} = changes;
    if (selected && !selected.isFirstChange()) {
      this.weeks = this.calendarService.generateMonthArray(this.config.firstDayOfWeek, this.config.month,
        this.selected);
    }
  }

  dateClick(date: ICalendarDay) {
    this.dateClicked.emit({date});
  }
}
