import {Moment} from 'moment';

export type CalendarValue = Moment | Moment[] | string | string[];

export enum ECalendarValue {
  Moment,
  MomentArr,
  String,
  StringArr
}