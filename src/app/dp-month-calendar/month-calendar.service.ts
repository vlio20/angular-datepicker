import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IMonth} from './month.model';

@Injectable()
export class MonthCalendarService {
  constructor(private utilsService: UtilsService) {
  }

  generateYear(year: Moment, selected: Moment = null): IMonth[][] {
    const index = year.clone().startOf('year');

    return this.utilsService.createArray(3).map(() => {
      return this.utilsService.createArray(4).map(() => {
        const month = {
          date: index.clone(),
          selected: index.isSame(selected, 'month'),
          currentMonth: index.isSame(moment(), 'year')
        };

        index.add(1, 'month');
        return month;
      });
    });
  }
}