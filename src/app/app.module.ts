import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ObDayPickerComponent} from './ob-day-picker/ob-day-picker.component';
import {ObCalendarComponent} from './ob-calendar/ob-calendar.component';

export {ObDayPickerComponent} from './ob-day-picker/ob-day-picker.component'

@NgModule({
  declarations: [
    AppComponent,
    ObDayPickerComponent,
    ObCalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})

export class ObDatePickerModule {
}
