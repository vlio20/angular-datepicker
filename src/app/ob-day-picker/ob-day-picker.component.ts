import {Component,
  OnInit,
  Input,
  HostListener,
  forwardRef,
  SimpleChanges,
  OnChanges} from '@angular/core';
import {ObCalendarComponent} from '../ob-calendar/ob-calendar.component';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import {DayPickerService} from './service/day-picker.service';
import {IDayPickerConfig} from './service/day-picker-config.model';
import {ICalendarConfig} from '../ob-calendar/config/calendar-config.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {UtilsService} from '../common/services/utils/utils.service';

@Component({
  selector: 'ob-day-picker',
  templateUrl: './ob-day-picker.component.html',
  styleUrls: ['./ob-day-picker.component.less'],
  entryComponents: [ObCalendarComponent],
  providers: [DayPickerService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ObDayPickerComponent),
    multi: true
  }]
})
export class ObDayPickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  moment = moment;
  isCalendarsShown: Observable<boolean>;
  showCalendars$ = new Subject();
  hideCalendars$ = new Subject();
  pickerConfig: IDayPickerConfig;
  calendars: ICalendarConfig[];
  value: Moment;
  _viewValue: string;
  get viewValue() {
    return this._viewValue;
  }

  set viewValue(val) {
    this._viewValue = val;
    this.propagateChange(val);
  }

  @Input('config') userConfig: IDayPickerConfig;
  @Input('value') userValue: Moment | string;

  @HostListener('click', ['$event']) onClick(e: Event) {
    e.stopPropagation();
  }

  @HostListener('document:click', ['$event']) onBodyClick(e: Event) {
    this.hideCalendars$.next(e);
  }

  constructor(private dayPickerService: DayPickerService) {
    this.initListeners();
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    const {userValue} = changes;
    if (userValue && !userValue.isFirstChange()) {
      this.init();
    }
  }

  writeValue(value: Moment): void {
    this.viewValue = value.format(this.pickerConfig.format);
  }

  propagateChange(_: any) {
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  // start

  init() {
    this.pickerConfig = this.dayPickerService.getConfig(this.userConfig, this.userValue);
    this.value = UtilsService.convertToMoment(this.userValue, this.pickerConfig.format);
    this.viewValue = this.value ? this.value.format(this.pickerConfig.format) : '';
    this.calendars = this.dayPickerService.generateCalendars(this.pickerConfig, this.value);
  }

  initListeners() {
    this.initCalendarsViability();
  }

  initCalendarsViability() {
    this.isCalendarsShown = Observable
      .merge(this.showCalendars$.mapTo(true), this.hideCalendars$.mapTo(false))
      .startWith(false);
  }

  isDateValid(value: string) {
    if (this.dayPickerService.isDateValid(value, this.pickerConfig.format)) {
      this.value = moment(value, this.pickerConfig.format);
    }
  }
}
