import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-day-inline-demo',
  templateUrl: './day-inline-demo.component.html',
  styleUrls: ['./day-inline-demo.component.less']
})
export class DayInlineDemoComponent extends DateComponent implements OnInit {
  control: FormControl;

  ngOnInit(): void {
    this.control = this.buildForm('DD-MM-YYYY');
  }
}