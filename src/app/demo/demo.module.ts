import {NgModule} from '@angular/core';
import {DemoComponent} from './demo.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ObDatePickerModule} from '../dp-date-picker.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ObDatePickerModule
  ],
  declarations: [
    DemoComponent
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule {
}
