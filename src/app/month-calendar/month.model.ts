import {IDate} from '../common/models/date.model';

export interface IMonth extends IDate {
  currentMonth: boolean;
  disabled: boolean;
  text: string;
}
