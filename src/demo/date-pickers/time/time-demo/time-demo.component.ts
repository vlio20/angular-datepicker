import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-time-demo',
  templateUrl: './time-demo.component.html',
  styleUrls: ['./time-demo.component.less']
})
export class TimeDemoComponent extends DateComponent implements OnInit {
  control: FormControl;

  ngOnInit(): void {
    this.control = this.buildForm('HH:mm:ss');
  }
}
