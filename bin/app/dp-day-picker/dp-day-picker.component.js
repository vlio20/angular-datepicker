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
var dp_calendar_component_1 = require('../dp-calendar/dp-calendar.component');
var moment = require('moment');
var day_picker_service_1 = require('./service/day-picker.service');
var forms_1 = require('@angular/forms');
var utils_service_1 = require('../common/services/utils/utils.service');
var DpDayPickerComponent = (function () {
    function DpDayPickerComponent(dayPickerService) {
        var _this = this;
        this.dayPickerService = dayPickerService;
        this.shouldNgInit = true;
        // attributes
        this.placeholder = '';
        this.disabled = false;
        this.areCalendarsShown = false;
        this.hideStateHelper = false;
        this.userValueType = 'object';
        this.api = {};
        this.showCalendars = function () {
            _this.hideStateHelper = true;
            _this.areCalendarsShown = true;
        };
        this.hideCalendars = function () {
            _this.areCalendarsShown = false;
        };
    }
    Object.defineProperty(DpDayPickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.viewValue = value ? value.format(this.pickerConfig.format) : '';
            var val = this.userValueType === 'string' ? this.viewValue : value;
            if (this.value) {
                this.calendars = this.dayPickerService.moveCalendars(this.pickerConfig, this.value, this.value, 0);
            }
            this.onChangeCallback(val);
        },
        enumerable: true,
        configurable: true
    });
    DpDayPickerComponent.prototype.onClick = function () {
        this.hideStateHelper = true;
    };
    DpDayPickerComponent.prototype.onBodyClick = function () {
        if (!this.hideStateHelper) {
            this.hideCalendars();
        }
        this.hideStateHelper = false;
    };
    DpDayPickerComponent.prototype.ngOnInit = function () {
        if (this.shouldNgInit) {
            this.init();
        }
    };
    DpDayPickerComponent.prototype.ngOnChanges = function (changes) {
        this.shouldNgInit = false;
        var minDate = changes.minDate, maxDate = changes.maxDate;
        this.init();
        if (minDate || maxDate) {
            this.initValidators();
        }
    };
    DpDayPickerComponent.prototype.writeValue = function (value) {
        if (value) {
            this.userValueType = typeof value;
            this.userValue = value;
            this.init();
        }
    };
    DpDayPickerComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    DpDayPickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DpDayPickerComponent.prototype.registerOnTouched = function (fn) {
    };
    DpDayPickerComponent.prototype.validate = function (c) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(c);
        }
        else {
            return function () { return null; };
        }
    };
    DpDayPickerComponent.prototype.isDateValid = function (value) {
        if (this.dayPickerService.isDateValid(value, this.pickerConfig.format)) {
            this.value = moment(value, this.pickerConfig.format);
        }
        else {
            this.value = null;
        }
    };
    // start
    DpDayPickerComponent.prototype.init = function () {
        this.pickerConfig = this.dayPickerService.getConfig(this.userConfig);
        this.value = this.userValue ? utils_service_1.UtilsService.convertToMoment(this.userValue, this.pickerConfig.format) : this.value;
        this.calendars = this.dayPickerService.generateCalendars(this.pickerConfig, this.value);
        this.initApi();
    };
    DpDayPickerComponent.prototype.initValidators = function () {
        this.validateFn = this.dayPickerService.createValidator({
            minDate: typeof this.minDate === 'string' ?
                moment(this.minDate, this.pickerConfig.format) : this.minDate,
            maxDate: typeof this.maxDate === 'string' ?
                moment(this.maxDate, this.pickerConfig.format) : this.maxDate
        }, this.pickerConfig.format);
        this.onChangeCallback(this.viewValue);
    };
    DpDayPickerComponent.prototype.initApi = function () {
        this.api = {
            open: this.showCalendars.bind(this),
            close: this.hideCalendars.bind(this)
        };
    };
    DpDayPickerComponent.prototype.daySelected = function (_a) {
        var day = _a.day;
        this.value = day.date;
        if (this.pickerConfig.closeOnSelect) {
            setTimeout(this.hideCalendars, this.pickerConfig.closeOnSelectDelay);
        }
    };
    DpDayPickerComponent.prototype.inputFocused = function () {
        this.hideStateHelper = false;
        this.areCalendarsShown = true;
    };
    DpDayPickerComponent.prototype.moveCalendars = function (base, months) {
        this.calendars = this.dayPickerService.moveCalendars(this.pickerConfig, this.value, base, months);
    };
    DpDayPickerComponent.prototype.isLeftNavDisabled = function (month) {
        return this.dayPickerService.isMinMonth(this.pickerConfig.min, month);
    };
    DpDayPickerComponent.prototype.isRightNavDisabled = function (month) {
        return this.dayPickerService.isMaxMonth(this.pickerConfig.max, month);
    };
    DpDayPickerComponent.prototype.onViewDateChange = function (date) {
        if (this.dayPickerService.isDateValid(date, this.pickerConfig.format)) {
            this.value = date !== '' ? moment(date, this.pickerConfig.format) : null;
        }
        else {
            this.onChangeCallback(undefined);
        }
    };
    DpDayPickerComponent.prototype.onKeydown = function (e) {
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
    ], DpDayPickerComponent.prototype, "userConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DpDayPickerComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DpDayPickerComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DpDayPickerComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DpDayPickerComponent.prototype, "maxDate", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DpDayPickerComponent.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('document:click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DpDayPickerComponent.prototype, "onBodyClick", null);
    DpDayPickerComponent = __decorate([
        core_1.Component({
            selector: 'dp-day-picker',
            template: "\n    <div>\n      <input type=\"text\"\n             class=\"dp-daypicker-input\"\n             [placeholder]=\"placeholder\"\n             [ngModel]=\"viewValue\"\n             (ngModelChange)=\"onViewDateChange($event)\"\n             (focus)=\"inputFocused()\"\n             (keydown)=\"onKeydown($event)\"\n             [disabled]=\"disabled\"/>\n      <div class=\"dp-calendars-container\" *ngIf=\"areCalendarsShown\">\n        <div class=\"dp-calendar-container\"\n             *ngFor=\"let calendar of calendars; let start = first; let end = last\">\n          <div class=\"dp-calendar-nav-container\">\n            <button class=\"dp-calendar-nav-left\"\n                    *ngIf=\"start\"\n                    [disabled]=\"isLeftNavDisabled(calendar.month)\"\n                    (click)=\"moveCalendars(calendars[0].month, -1)\"> <\n            </button>\n            <span class=\"dp-calendar-month\">{{calendar.month.format(pickerConfig.monthFormat)}}</span>\n            <button class=\"dp-calendar-nav-right\"\n                    *ngIf=\"end\"\n                    [disabled]=\"isRightNavDisabled(calendar.month)\"\n                    (click)=\"moveCalendars(calendars[0].month, 1)\"> >\n            </button>\n          </div>\n          <dp-calendar [selected]=\"value\"\n                       [config]=\"calendar\"\n                       (on-change)=\"daySelected($event)\">\n          </dp-calendar>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    :host {\n      display: inline-block;\n    }\n    .dp-calendars-container {\n      position: absolute;\n      background: #FFFFFF;\n      box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);\n      border-left: 1px solid rgba(0, 0, 0, 0.1);\n      border-right: 1px solid rgba(0, 0, 0, 0.1);\n      border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n    }\n    .dp-calendar-container {\n      display: inline-block;\n    }\n    .dp-calendar-nav-container {\n      position: relative;\n      box-sizing: border-box;\n      height: 25px;\n      border: 1px solid #000000;\n      border-bottom: none;\n    }\n    .dp-calendar-nav-left,\n    .dp-calendar-nav-right {\n      position: absolute;\n      top: 50%;\n      transform: translateY(-50%);\n      cursor: pointer;\n    }\n    .dp-calendar-nav-left {\n      left: 0;\n    }\n    .dp-calendar-nav-right {\n      right: 0;\n    }\n    .dp-calendar-month {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n    :host(.dp-material) .dp-calendar-container {\n      background: white;\n    }\n    :host(.dp-material) .dp-calendar-container:not(:first-of-type) {\n      border-left: 1px solid #B0AFAF;\n    }\n    :host(.dp-material) .dp-calendar-nav-container {\n      height: 30px;\n      border: none;\n    }\n    :host(.dp-material) .dp-calendar-nav-left,\n    :host(.dp-material) .dp-calendar-nav-right {\n      border: none;\n      background: white;\n      outline: none;\n      font-size: 16px;\n    }\n    :host(.dp-material) .dp-daypicker-input {\n      box-sizing: border-box;\n      height: 30px;\n      width: 212px;\n      font-size: 13px;\n      outline: none;\n    }\n    :host(.dp-material) >>> dp-calendar .dp-calendar-weekday {\n      height: 25px;\n      width: 30px;\n      line-height: 25px;\n      background: #E0E0E0;\n      border: none;\n    }\n    :host(.dp-material) >>> dp-calendar .dp-calendar-wrapper {\n      border: none;\n    }\n    :host(.dp-material) >>> dp-calendar .dp-calendar-day {\n      box-sizing: border-box;\n      height: 30px;\n      width: 30px;\n      background: white;\n      border-radius: 50%;\n      border: none;\n      outline: none;\n    }\n    :host(.dp-material) >>> dp-calendar .dp-calendar-day:hover {\n      background: #E0E0E0;\n    }\n    :host(.dp-material) >>> dp-calendar .dp-selected {\n      background: #106CC8;\n      color: white;\n    }\n    :host(.dp-material) >>> dp-calendar .dp-selected:hover {\n      background: #106CC8;\n    }\n    :host(.dp-material) >>> dp-calendar .dp-current-day {\n      border: 1px solid #106CC8;\n    }\n  "],
            entryComponents: [dp_calendar_component_1.ObCalendarComponent],
            providers: [
                day_picker_service_1.DayPickerService,
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return DpDayPickerComponent; }),
                    multi: true
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return DpDayPickerComponent; }),
                    multi: true
                }
            ]
        }), 
        __metadata('design:paramtypes', [day_picker_service_1.DayPickerService])
    ], DpDayPickerComponent);
    return DpDayPickerComponent;
}());
exports.DpDayPickerComponent = DpDayPickerComponent;

//# sourceMappingURL=dp-day-picker.component.js.map
