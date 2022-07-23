import debounce from '../../../projects/ng2-date-picker/src/lib/common/decorators/decorators';
import {IDatePickerConfig} from '../../../projects/ng2-date-picker/src/lib/date-picker/date-picker-config.model';
import {DatePickerComponent} from '../../../projects/ng2-date-picker/src/lib/date-picker/date-picker.component';
import {DatePickerDirective} from '../../../projects/ng2-date-picker/src/lib/date-picker/date-picker.directive';
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import dayjs, {Dayjs} from 'dayjs';
import {GaService} from './common/services/ga/ga.service';
import {ECalendarValue} from '../../../projects/ng2-date-picker/src/lib/common/types/calendar-value-enum';
import {INavEvent} from '../../../projects/ng2-date-picker/src/lib/common/models/navigation-event.model';
import {ISelectionEvent} from '../../../projects/ng2-date-picker/src/lib/common/types/selection-event.model';
import { IDayTimeCalendarConfig } from '../../../projects/ng2-date-picker/src/public-api';

@Component({
  selector: 'dp-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  date = dayjs().format('YYYY-MM-DDTHH:mm:ss');
  format = 'YYYY-MM-DDTHH:mm:ss';
  config = {
    format: this.format,
    max: dayjs().format(this.format),
  } as IDayTimeCalendarConfig;

  onChange(theDate: any) {
    this.date = theDate;
  }
}
