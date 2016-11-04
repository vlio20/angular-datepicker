import { ObDayPickerComponent } from '../dp-day-picker/dp-day-picker.component';
import { Moment } from 'moment';
import { IDayPickerConfig } from '../dp-day-picker/service/day-picker-config.model';
export declare class DemoComponent {
    dayPicker: ObDayPickerComponent;
    demoFormat: string;
    readonly DAYS: string[];
    date: Moment;
    material: boolean;
    required: boolean;
    disabled: boolean;
    validationMinDate: Moment;
    validationMaxDate: Moment;
    placeholder: string;
    config: IDayPickerConfig;
    configChanged(): void;
    createCustomWeekDays(): void;
}
