[![Package Quality](http://npm.packagequality.com/badge/ng2-date-picker.png)](http://packagequality.com/#?package=ng2-date-picker)  
[![Build Status](https://travis-ci.org/vlio20/ng2-date-picker.svg?branch=master)](https://travis-ci.org/vlio20/ng2-date-picker)
[![npm version](https://badge.fury.io/js/ng2-date-picker.svg)](https://badge.fury.io/js/ng2-date-picker)

# Date Picker
This is a configurable date-picker build for Angular2 applications and uses MomentJS as its dependency.   
[DEMO](https://vlio20.github.io/angular-datepicker/)


## Installation:
1. Download from npm:
`npm install ng2-date-picker --save`  
2. import the `DpDatePickerModule` module:  
 `import {DpDatePickerModule} from 'ng2-date-picker';`  
3. Add `DpDatePickerModule` to your module imports:  
```ts
 @NgModule({
   ...
   imports: [
     ...
     DpDatePickerModule
   ]
 })
```
## Usage
Put the dp-date-picker component wherever you need it.


### Attributes:  

| Name                 | Type               | Default                                                                   | description                                                                                                                                                                                                                  |
|----------------------|:------------------:|:------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| disabled             | `Boolean`          | `false`                                                                  | If set to true the input would be disabled                                                                                                                                                                                    |
| placeholder          | `String`           | `""`                                                                     | The date-picker input placeholder                                                                                                                                                                                             |
| required             | `Boolean`          | `undefined`                                                              | This is a validation rule, if there won't be any selected date then the containing form will be invalid.                                                                                                                      |
| minDate              | `Moment|String`    | `undefined`                                                              | This is a validation rule, if the selected date will be before `minDate` the containing form will be invalid. Note: if provided as string format configuration should be provided in the config object.                       |
| maxDate              | `Moment|String`    | `undefined`                                                              | This is a validation rule, if the selected date will be after `maxDate` the containing form will be invalid. Note: if provided as string format configuration should be provided in the config object.                        | 
| theme                | `string       `    | `''`                                                                     | Theme is a class added to the popup container - this will allow styling of the calendar when it's appended to outer element (for example - body). There is a built in theme named dp-material, you can find it in the demo.   | 
| config               | `IDayPickerConfig` | See Below                                                                | Configuration object - see description below.                                                                                                                                                                                 | 


### Configuration:  
In order to provide configurations to the date-picker you need to pass it to the `dp-date-picker` component:  
```html
<dp-day-picker [(ngModel)]="selectedDate" [config]="datePickerConfig"></dp-day-picker>
```
Here are the available configurations:  

| Name                 | Type                 | Default                                                                   | description                                                                                                                                                                                                                                                                   |
|----------------------|:--------------------:|:-------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| firstDayOfWeek       | `String`             | `"su"`                                                                    | The first day of the calendar's week. Should be one of: `"su", "mo", "tu", "we", "th", "fr", "sa"`                                                                                                                                                                            |
| calendarsAmount      | `Number`             | `1`                                                                       | The amount of calenders shown when the date-picker open                                                                                                                                                                                                                       |
| format               | `String`             | `"DD-MM-YYYY"`                                                            | If ngModel provided as `String` the format is required, this format also will be used as the input format style.                                                                                                                                                              |
| monthFormat          | `String`             | `"MMM-YYYY"`                                                              | The date format of the day calendar, the one that seen above the calendar days. Will be overwritten if `monthFormatter` provided.                                                                                                                                             |
| monthFormatter       | `(Moment) => String` | `undefined`                                                               | The date formatter (callback function) of the day calendar, the one that seen above the calendar days.                                                                                                                                                                        |
| yearFormat           | `String`             | `"YYYY"`                                                                  | The date format of the month calendar, the one that seen above the calendar months. Will be overwritten if `yearFormatter` provided. (available when `enableMonthSelector` is set to `true`).                                                                                 |
| yearFormatter        | `(Moment) => String` | `undefined`                                                               | The date formatter (callback function) of the month calendar, the one that seen above the calendar months. (available when `enableMonthSelector` is set to `true`).                                                                                                           |
| allowMultiSelect     | `Boolean`            | `undefined`                                                               | If set to `true` will allow for choosing multiple dates. `false` will force a single selection. If `undefined`, the picker will attempt to guess based on the type of the input value.                                                                                        |
| closeOnSelect        | `Boolean`            | `true`                                                                    | If set to `true` will close the date-picker after choosing a date from the calender, otherwise, won't.                                                                                                                                                                        |
| closeOnSelectDelay   | `Number`             | `100`                                                                     | The delay (in ms) between the date selection and the date-picker collapse                                                                                                                                                                                                     |
| onOpenDelay          | `Number`             | `0`                                                                       | The delay (in ms) between the date picker focusing and the date-picker popup apparel                                                                                                                                                                                          |
| weekdayNames         | `Object`             | `{su: 'sun',mo: 'mon',tu: 'tue',we: 'wed',th: 'thu',fr: 'fri',sa: 'sat'}` | The weekday names as they are shown above the calendar days. The keys should be the same as seen in the default example.                                                                                                                                                      |
| disableKeypress      | `Boolean`            | `false`                                                                   | Disables the possibility to change the date value by typing it - changing the date would be possible only from the picker                                                                                                                                                     |
| min                  | `Moment|String`      | `undefined`                                                               | Disables all dates (on the date-picker) that are set to before the `min`, note that if invalid date would be set by the input then the date picker value would be the min date but the input will show the user typed date.                                                   |
| max                  | `Moment|String`      | `undefined`                                                               | Disables all dates (on the date-picker) that are set to after the `max`, note that if invalid date would be set by the input then the date picker value would be the max date but the input will show the user typed date.                                                    |
| userValueType        | `String`             | `undefined`                                                               | The type of the value being passed out in `ngModelChange`. `"string"` passes values back as `string` or `string[]`. `"object"` passes values back as `Moment` or `Moment[]`. If `undefined`, the picker will attempt to guess based on the type of the input value.           |
| appendTo             | `String|HTMLElement` | `undefined`                                                               | The selector/element to which the calendar popup will append to (this is useful for `overflow: hidden` container issues). Please note that the `appendTo` element will be set with position `absolute` if it has position `static` (the default position).                    |
| drops                | `'up'|'down'`        | `down`                                                                    | Whether the picker appears below or above the input element.                                                                                                                                                                                                                  |
| opens                | `'right'|'left'`     | `right`                                                                   | Whether the picker appears aligned to the left or to the right the input element.                                                                                                                                                                                             |
| showNearMonthDays    | `Boolean`            | `true`                                                                    | Whether to show/hide next and previous month days.                                                                                                                                                                                                                            |
| showWeekNumbers      | `Boolean`            | `false`                                                                   | Whether to show/hide the week number of each week (iso week number).                                                                                                                                                                                                          |
| enableMonthSelector  | `Boolean`            | `true`                                                                    | Whether to enable/disable the selection of a moth granularity picker.                                                                                                                                                                                                         |

### API:
In order to use the date-picker api user the `@ViewChild` annotation in the date-picker containing component class, take at the example bellow:  
Container component:
```ts  
import {Component, ViewChild} from '@angular/core';
import {DpDayPickerComponent} from 'ng2-date-picker';

@Component({
selector: 'my-container',
template: `
<div>
    <h1>Container</h1>
    <dp-day-picker #dayPicker></dp-day-picker>
    <button (click)="open()"></button>
    <button (click)="close()"></button>
</div>
`
});
class MyContainer {
    @ViewChild('dayPicker') dayPicker: DpDayPickerComponent;
    
    open() {
        this.dayPicker.api.open();
    }
     
    close() {
         this.dayPicker.api.close();
    } 
}  
```
Here is the list of APIs:  

| Name                 | Signature       | Description            |
|----------------------|:---------------:|------------------------|
| open                 | `() => void`    | Opens the date picker  |
| close                | `() => void`    | Closes the date picker |


## Inline

You can use the `<dp-calendar>` component to display the calendar widget without an associated input box.

i.e.
```html
<dp-calendar [(selected)]="dates" [config]="calendarConfig"></dp-calendar>
```

### Inputs

| Name                 | Type              | Description                                                                                                                                                                                                                                                    |
|----------------------|:-----------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selected             | `Moment[]`        | Opens the date picker                                                                                                                                                                                                                                          |
| theme                | `string`          | Same as putting a class on the element                                                                                                                                                                                                                                           |
| config               | `ICalendarConfig` | A subset of the `IDayPickerConfig`.<br>Properties include: `firstDayOfWeek`, `calendarsAmount`, `min`, `max`, `allowMultiSelect`, `format`, `monthFormat`, and `monthFormatter`.<br>These properties behave as described in the `Configuration` section above. |

### Outputs

| Name                 | Type                      | Description                                                        |
|----------------------|:-------------------------:|--------------------------------------------------------------------|
| selectedChange       | `EventEmitter<Moment[]>`  | Emits the currently selected days every time the selection changes |
| dayClick             | `EventEmitter<IDayEvent>` | Emits every time a day is clicked on the calendar                  |
| dayContextMenu       | `EventEmitter<IDayEvent>` | Emits every time a day is right-clicked on the calendar            |
| calendarMove         | `EventEmitter<Moment>`    | Emits every time the calendar moves to a different set of months. The date emitted is the first month displayed. |
