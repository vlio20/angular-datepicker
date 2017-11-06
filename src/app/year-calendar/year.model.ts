import {IDate} from '../common/models/date.model';

export interface IYear extends IDate {
  currentYear: boolean;
  disabled: boolean;
  text: string;
}
