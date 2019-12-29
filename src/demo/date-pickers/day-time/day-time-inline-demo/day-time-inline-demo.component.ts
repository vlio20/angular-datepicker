import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-day-time-inline-demo',
  templateUrl: './day-time-inline-demo.component.html',
  styleUrls: ['./day-time-inline-demo.component.less']
})
export class DayTimeInlineDemoComponent extends DateComponent implements OnInit {
  control: FormControl;

  ngOnInit(): void {
    this.control = this.buildForm('DD-MM-YYYY HH:mm:ss');
  }
}
