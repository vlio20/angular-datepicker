import {ICalendarMonthConfig} from '../dp-day-calendar/day-calendar-config.model';
import {IDayEvent} from '../dp-day-calendar/day.model';
import {ICalendarConfig} from './calendar-config.model';
import {CalendarService} from './calendar.service';
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, HostBinding} from '@angular/core';
import {Moment} from 'moment';

@Component({
  selector: 'dp-calendar',
  templateUrl: './dp-calendar.component.html',
  styleUrls: ['./dp-calendar.component.less'],
  providers: [CalendarService],
})
export class DpCalendarComponent implements OnChanges {
  @Input() selected: Moment[];
  @Input() config: ICalendarConfig;
  @Input() theme: string;
  @Input() openOn: Moment[];

  @HostBinding('class') themeClass;

  @Output() selectedChange: EventEmitter<Moment[]> = new EventEmitter();
  @Output() dayClick: EventEmitter<IDayEvent> = new EventEmitter();
  @Output() dayContextMenu: EventEmitter<IDayEvent> = new EventEmitter();
  @Output() calendarMove: EventEmitter<Moment> = new EventEmitter();

  calendars: ICalendarMonthConfig[];
  showMonthCalendar: boolean = false;

  constructor(private calendarService: CalendarService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.config = this.calendarService.getConfig(this.config);
    this.calendars = this.calendarService.generateCalendars(
      this.config,
      this.selected,
      this.openOn && this.openOn[this.openOn.length - 1] || this.calendars && this.calendars[0] && this.calendars[0].month
    );
    this.themeClass = this.theme;
  }

  daySelected({day, event}: IDayEvent) {
    if (!this.config.allowMultiSelect) {

      // Single selection
      this.selected = [day.date];
    } else if (day.selected && this.selected) {

      // Unselecting a day
      this.selected = this.selected.filter(val => !val.isSame(day.date, 'day'));
    } else if (this.config.allowMultiSelect) {

      // Multi selection
      this.selected = this.selected ? this.selected.concat(day.date) : [day.date];
    }

    this.dayClick.emit({day, event});
    this.selectedChange.emit(this.selected);
  }

  getMonthToDisplay(month: Moment): string {
    if (typeof this.config.monthFormatter === 'function') {
      return this.config.monthFormatter(month);
    }

    return month.format(this.config.monthFormat);
  }

  getYearToDisplay(year: Moment): string {
    if (typeof this.config.yearFormatter === 'function') {
      return this.config.yearFormatter(year);
    }

    return year.format(this.config.yearFormat);
  }

  monthSelected(index: number, month: Moment) {
    const form = this.calendars[0].month.clone().startOf('month');
    const to = month.clone().startOf('month');
    this.moveCalendars(form, to.diff(form, 'month'));
    this.showMonthCalendar = false;
  }

  moveCalendars(base: Moment, months: number) {
    this.calendars = this.calendarService.moveCalendars(this.config, this.selected, base, months);
    this.calendarMove.emit(this.calendars[0].month);
  }

  isLeftNavDisabled(month: Moment): boolean {
    return this.calendarService.isMinMonth(<Moment>this.config.min, month);
  }

  isRightNavDisabled(month: Moment): boolean {
    return this.calendarService.isMaxMonth(<Moment>this.config.max, month);
  }

  shouldShowMonthSelector(index: number): boolean {
    return this.calendarService.shouldShowMonthSelector(index, this.config);
  }
}
