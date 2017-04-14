import {DatePickerComponent} from '../date-picker/date-picker.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DemoComponent} from './demo/demo.component';
import {DemoRootComponent} from './demo-root.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {DpDatePickerModule} from '../dp-date-picker.module';
import {MultiselectTestComponent} from './multiselect-test/multiselect-test.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DpDatePickerModule,
    RouterModule.forRoot([
      {
        path: 'multiselect-test',
        component: MultiselectTestComponent,
      },
      {
        path: '**',
        component: DemoComponent,
      }
    ])
  ],
  declarations: [
    DemoRootComponent,
    DemoComponent,
    MultiselectTestComponent,
  ],
  entryComponents: [
    DatePickerComponent,
  ],
  bootstrap: [DemoRootComponent]
})
export class DemoModule {
}
