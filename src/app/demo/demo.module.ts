import {DatePickerComponent} from '../date-picker/date-picker.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DemoComponent} from './demo/demo.component';
import {DemoRootComponent} from './demo-root.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DpDatePickerModule} from '../date-picker.module';
import {GaService} from './services/ga/ga.service';
import {ConfigFormComponent} from './config-form/config-form.component';
import {DayTimeDemoComponent} from './date-pickers/day-time/day-time-demo/day-time-demo.component';
import {DayTimeInlineDemoComponent} from './date-pickers/day-time/day-time-inline-demo/day-time-inline-demo.component';
import {DayTimeDirectiveDemoComponent} from './date-pickers/day-time/day-time-directive-demo/day-time-directive-demo.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    RouterModule.forRoot([
      {
        path: '',
        component: DemoComponent,
        children: [
          {
            path: '',
            redirectTo: 'daytimePicker',
            pathMatch: 'full'
          },
          {
            path: 'daytimePicker',
            component: DayTimeDemoComponent
          },
          {
            path: 'daytimeInline',
            component: DayTimeInlineDemoComponent
          },
          {
            path: 'daytimeDirective',
            component: DayTimeDirectiveDemoComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  declarations: [
    DemoRootComponent,
    DemoComponent,
    ConfigFormComponent,
    DayTimeDemoComponent,
    DayTimeInlineDemoComponent,
    DayTimeDirectiveDemoComponent
  ],
  entryComponents: [
    DatePickerComponent
  ],
  providers: [GaService],
  bootstrap: [DemoRootComponent]
})
export class DemoModule {
}
