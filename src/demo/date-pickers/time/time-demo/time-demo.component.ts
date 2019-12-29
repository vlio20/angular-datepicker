import {Component} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-time-demo',
  templateUrl: './time-demo.component.html',
  styleUrls: ['./time-demo.component.less']
})
export class TimeDemoComponent extends DateComponent {
  control = new FormControl();
}
