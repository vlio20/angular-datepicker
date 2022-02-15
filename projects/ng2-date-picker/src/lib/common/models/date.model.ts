import { Dayjs } from 'dayjs';

export interface IDate {
  date: Dayjs;
  selected: boolean;
}

export interface IDateRange {
  from: Dayjs;
  to: Dayjs;
}