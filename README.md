# Date Picker
This is a configurable date-picker build for Angular2 applications and uses MomentJS as a dependency.  

### Attributes:  

| Name                 | Type             | Default                                                                   | description                                                                                                                                                                                                        |
|----------------------|:----------------:|:------------------------------------------------------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| disabled             | `Boolean`        | `false`                                                                  | If set to true the input would be disabled                                                                                                                                                                          |
| placeholder          | `String`         | `""`                                                                     | The date-picker input placeholder                                                                                                                                                                                   |
| required             | `Boolean`        | `undefined`                                                              | This is a validation rule, if there won't be any selected date then the containing form will be invalid.                                                                                                            |
| minDate              | `Moment|String`  | `undefined`                                                              | This is a validation rule, if the selected date will be before `minDate` the containing form will be invalid. Note: if provided as string format configuration should be provided in the config object              |
| MaxDate              | `Moment|String`  | `undefined`                                                              | This is a validation rule, if the selected date will be after `MaxDate` the containing form will be invalid. Note: if provided as string format configuration should be provided in the config object               | 


### Configuration:  
In order to provide configurations to the date-picker you need to pass it to the `ob-date-picker` component:  
```
<ob-day-picker [config]="datePikerConfig"></ob-day-picker>
```
Here are the available configurations:
| Name                 | Type      | Default                                                                   | description                                                                                                               |
|----------------------|:---------:|:-------------------------------------------------------------------------:|---------------------------------------------------------------------------------------------------------------------------|
| firstDayOfWeek       | `String`  | `"su"`                                                                    | The first day of the calendar's week. Should be one of: `"su", "mo", "tu", "we", "th", "fr", "sa"`                        |
| calendarsAmount      | `Number`  | `1`                                                                       | The amount of calenders shown when the date-picker open                                                                   |
| format               | `String`  | `"DD-MM-YYY"`                                                             | If ngModel provided as `String` the format is required, this format also will be used as the input format style           |
| closeOnSelect        | `Boolean` | `true`                                                                    | If set to `true` will close the date-picker after choosing a date from the calender, otherwise, won't                     |
| closeOnSelectDelay   | `Number`  | `100`                                                                     | The delay (in ms) between the date selection and the date-picker collapse                                                 |
| weekdayNames         | `Object`  | `{su: 'sun',mo: 'mon',tu: 'tue',we: 'wed',th: 'thu',fr: 'fri',sa: 'sat'}` | The weekday names as they are shown above the calendar days. The keys should be the same as seen in the default example.  |
| disableKeypress      | `Boolean` | `false`                                                                   | Disables the possibility to change the date value by typing it - changing the date would be possible only from the picker |
