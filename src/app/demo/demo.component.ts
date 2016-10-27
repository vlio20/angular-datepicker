import {Component, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {ObDayPickerComponent} from '../ob-day-picker/ob-day-picker.component';

@Component({
  selector: 'ob-demo-root',
  templateUrl: './demo.component.html',
  entryComponents: [ObDayPickerComponent],
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  @ViewChild('dayPicker') dayPicker: ObDayPickerComponent;

  ngModelOnly =
    `
<ob-day-picker [(ngModel)]="date"></ob-day-picker>

`;

  disabled =
    `
<ob-day-picker [(ngModel)]="date" 
               [disabled]="disabled">
</ob-day-picker>

`;

  demos = [
    {
      header: 'Basic Usage',
      date: undefined,
      config: undefined,
      template: this.ngModelOnly,
      ts: `
export class DemoComponent {
  date;
}

`
    },
    {
      header: 'Disabled',
      date: undefined,
      config: undefined,
      disabled: true,
      template: this.disabled,
      ts: `
export class DemoComponent {
  date;
  disabled: boolean = true;
}

`
    },
  ];
}
