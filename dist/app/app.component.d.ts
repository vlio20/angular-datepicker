import { ObDayPickerComponent } from './ob-day-picker/ob-day-picker.component';
import { IDayPickerConfig } from './ob-day-picker/service/day-picker-config.model';
import * as moment from 'moment';
export declare class AppComponent {
    dayPicker: ObDayPickerComponent;
    date: any;
    minDate: moment.Moment;
    minConf: {};
    dayPickerConfig: IDayPickerConfig;
    changeDate(): void;
    togglePicker(state: boolean): void;
}
