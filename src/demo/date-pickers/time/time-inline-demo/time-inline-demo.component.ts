import {Component} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-time-inline-demo',
  templateUrl: './time-inline-demo.component.html',
  styleUrls: ['./time-inline-demo.component.less']
})
export class TimeInlineDemoComponent extends DateComponent {
  control = new FormControl();
}
