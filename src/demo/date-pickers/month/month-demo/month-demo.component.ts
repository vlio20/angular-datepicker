import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-month-demo',
  templateUrl: './month-demo.component.html',
  styleUrls: ['./month-demo.component.less']
})
export class MonthDemoComponent extends DateComponent implements OnInit {
  control: FormControl;

  ngOnInit(): void {
    this.control = this.buildForm('MMM, YYYY');
  }
}