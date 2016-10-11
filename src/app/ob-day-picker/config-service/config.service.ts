import {Injectable} from '@angular/core';
import {IDayPickerConfig} from './day-picker-config.model';
import * as moment from 'moment';

@Injectable()
export class ConfigService {
  private config: IDayPickerConfig = {
    selected: moment(),
    firstDayOfWeek: 'su',
    calendarsAmount: 1
  };

  constructor() {
  }

  setConfig(config: IDayPickerConfig) {
    this.config = Object.assign({}, this.config, config);
    return this.getConfig();
  }

  getConfig(): IDayPickerConfig {
    return Object.freeze(this.config);
  }
}
