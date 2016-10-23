"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ob_calendar_component_1 = require('../ob-calendar/ob-calendar.component');
var moment = require('moment');
var day_picker_service_1 = require('./service/day-picker.service');
var forms_1 = require('@angular/forms');
var utils_service_1 = require('../common/services/utils/utils.service');
var ObDayPickerComponent = (function () {
    function ObDayPickerComponent(dayPickerService) {
        this.dayPickerService = dayPickerService;
        this.areCalendarsShown = false;
        this.hideStateHelper = false;
        this.userValueType = 'object';
        this.api = {};
    }
    Object.defineProperty(ObDayPickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.viewValue = value ? value.format(this.pickerConfig.format) : '';
            var val = this.userValueType === 'string' ? this.viewValue : value;
            this.onChangeCallback(val);
        },
        enumerable: true,
        configurable: true
    });
    ObDayPickerComponent.prototype.onClick = function () {
        this.hideStateHelper = true;
    };
    ObDayPickerComponent.prototype.onBodyClick = function () {
        if (!this.hideStateHelper) {
            this.hideCalendars();
        }
        this.hideStateHelper = false;
    };
    ObDayPickerComponent.prototype.ngOnChanges = function (changes) {
        var userConfig = changes.userConfig, minDate = changes.minDate, maxDate = changes.maxDate;
        if (userConfig) {
            this.init();
        }
        if (minDate || maxDate) {
            this.initValidators();
        }
    };
    ObDayPickerComponent.prototype.writeValue = function (value) {
        if (value) {
            this.userValueType = typeof value;
            this.userValue = value;
            this.init();
        }
    };
    ObDayPickerComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    ObDayPickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    ObDayPickerComponent.prototype.registerOnTouched = function (fn) {
    };
    ObDayPickerComponent.prototype.validate = function (c) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(c);
        }
        else {
            return function () { return null; };
        }
    };
    ObDayPickerComponent.prototype.isDateValid = function (value) {
        if (this.dayPickerService.isDateValid(value, this.pickerConfig.format)) {
            this.value = moment(value, this.pickerConfig.format);
        }
        else {
            this.value = null;
        }
    };
    // start
    ObDayPickerComponent.prototype.init = function () {
        this.pickerConfig = this.dayPickerService.getConfig(this.userConfig);
        this.value = utils_service_1.UtilsService.convertToMoment(this.userValue, this.pickerConfig.format);
        this.calendars = this.dayPickerService.generateCalendars(this.pickerConfig, this.value);
        this.initApi();
    };
    ObDayPickerComponent.prototype.initValidators = function () {
        this.validateFn = this.dayPickerService.createValidator({
            minDate: typeof this.minDate === 'string' ?
                moment(this.minDate, this.pickerConfig.format) : this.minDate,
            maxDate: typeof this.maxDate === 'string' ?
                moment(this.maxDate, this.pickerConfig.format) : this.maxDate
        }, this.pickerConfig.format);
        this.onChangeCallback(this.viewValue);
    };
    ObDayPickerComponent.prototype.initApi = function () {
        this.api = {
            open: this.showCalendars.bind(this),
            close: this.hideCalendars.bind(this)
        };
    };
    ObDayPickerComponent.prototype.daySelected = function (_a) {
        var day = _a.day;
        this.value = day.date;
        if (this.pickerConfig.closeOnSelect) {
            setTimeout(this.hideCalendars.bind(this), this.pickerConfig.closeOnSelectDelay);
        }
    };
    ObDayPickerComponent.prototype.inputFocused = function () {
        this.hideStateHelper = false;
        this.areCalendarsShown = true;
    };
    ObDayPickerComponent.prototype.showCalendars = function () {
        this.hideStateHelper = true;
        this.areCalendarsShown = true;
    };
    ObDayPickerComponent.prototype.hideCalendars = function () {
        this.areCalendarsShown = false;
    };
    ObDayPickerComponent.prototype.moveCalendars = function (base, months) {
        this.calendars = this.dayPickerService.moveCalendars(this.pickerConfig, this.value, base, months);
    };
    ObDayPickerComponent.prototype.isLeftNavDisabled = function (month) {
        return this.dayPickerService.isMinMonth(this.pickerConfig.min, month);
    };
    ObDayPickerComponent.prototype.isRightNavDisabled = function (month) {
        return this.dayPickerService.isMaxMonth(this.pickerConfig.max, month);
    };
    ObDayPickerComponent.prototype.onViewDateChange = function (date) {
        if (this.dayPickerService.isDateValid(date, this.pickerConfig.format)) {
            this.value = date !== '' ? moment(date, this.pickerConfig.format) : null;
        }
        else {
            this.onChangeCallback(undefined);
        }
    };
    ObDayPickerComponent.prototype.onKeydown = function (e) {
        if (e.keyCode === 13) {
            this.areCalendarsShown = !this.areCalendarsShown;
            e.preventDefault();
        }
        if (e.keyCode === 27) {
            this.areCalendarsShown = false;
            e.preventDefault();
        }
        if (this.pickerConfig.disableKeypress) {
            e.preventDefault();
        }
    };
    __decorate([
        core_1.Input('config'), 
        __metadata('design:type', Object)
    ], ObDayPickerComponent.prototype, "userConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObDayPickerComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObDayPickerComponent.prototype, "maxDate", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ObDayPickerComponent.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('document:click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ObDayPickerComponent.prototype, "onBodyClick", null);
    ObDayPickerComponent = __decorate([
        core_1.Component({
            selector: 'ob-day-picker',
            template: "\n    <div>\n      <input type=\"text\"\n             class=\"ob-daypicker-input\"\n             [placeholder]=\"pickerConfig.placeholder\"\n             [ngModel]=\"viewValue\"\n             (ngModelChange)=\"onViewDateChange($event)\"\n             (focus)=\"inputFocused()\"\n             (keydown)=\"onKeydown($event)\"\n             [disabled]=\"pickerConfig.disabled\"/>\n      <div class=\"ob-calendars-container\" *ngIf=\"areCalendarsShown\">\n        <div class=\"ob-calendar-container\"\n             *ngFor=\"let calendar of calendars; let start = first; let end = last\">\n          <div class=\"ob-calendar-nav-container\">\n            <button class=\"ob-calendar-nav-left\"\n                    *ngIf=\"start\"\n                    [disabled]=\"isLeftNavDisabled(calendar.month)\"\n                    (click)=\"moveCalendars(calendar.month, -1)\"> <\n            </button>\n            <span class=\"ob-calendar-month\">{{calendar.month.format('MMM, YYYY')}}</span>\n            <button class=\"ob-calendar-nav-right\"\n                    *ngIf=\"end\"\n                    [disabled]=\"isRightNavDisabled(calendar.month)\"\n                    (click)=\"moveCalendars(calendar.month, 1)\"> >\n            </button>\n          </div>\n          <ob-calendar [selected]=\"value\"\n                       [config]=\"calendar\"\n                       (on-change)=\"daySelected($event)\">\n          </ob-calendar>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    :host {\n      display: inline-block;\n    }\n    .ob-calendars-container {\n      position: absolute;\n      background: #FFFFFF;\n    }\n    .ob-calendar-container {\n      display: inline-block;\n    }\n    .ob-calendar-nav-container {\n      position: relative;\n      box-sizing: border-box;\n      height: 25px;\n      border: 1px solid #000000;\n      border-bottom: none;\n    }\n    .ob-calendar-nav-left,\n    .ob-calendar-nav-right {\n      position: absolute;\n      top: 50%;\n      transform: translateY(-50%);\n      cursor: pointer;\n    }\n    .ob-calendar-nav-left {\n      left: 0;\n    }\n    .ob-calendar-nav-right {\n      right: 0;\n    }\n    .ob-calendar-month {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n  "],
            entryComponents: [ob_calendar_component_1.ObCalendarComponent],
            providers: [
                day_picker_service_1.DayPickerService,
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return ObDayPickerComponent; }),
                    multi: true
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return ObDayPickerComponent; }),
                    multi: true
                }
            ]
        }), 
        __metadata('design:paramtypes', [day_picker_service_1.DayPickerService])
    ], ObDayPickerComponent);
    return ObDayPickerComponent;
}());
exports.ObDayPickerComponent = ObDayPickerComponent;

//# sourceMappingURL=ob-day-picker.component.js.map
