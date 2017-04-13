import {Moment} from 'moment';

export interface IMonth {
  date: Moment;
  selected?: boolean;
  currentMonth?: boolean;
}