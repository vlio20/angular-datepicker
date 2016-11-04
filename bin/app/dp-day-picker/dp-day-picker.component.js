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
var ObDayPickerComponent = (function () {
    function ObDayPickerComponent(dayPickerService) {
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
    Object.defineProperty(ObDayPickerComponent.prototype, "value", {
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
    ObDayPickerComponent.prototype.onClick = function () {
        this.hideStateHelper = true;
    };
    ObDayPickerComponent.prototype.onBodyClick = function () {
        if (!this.hideStateHelper) {
            this.hideCalendars();
        }
        this.hideStateHelper = false;
    };
    ObDayPickerComponent.prototype.ngOnInit = function () {
        if (this.shouldNgInit) {
            this.init();
        }
    };
    ObDayPickerComponent.prototype.ngOnChanges = function (changes) {
        this.shouldNgInit = false;
        var minDate = changes.minDate, maxDate = changes.maxDate;
        this.init();
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
        this.value = this.userValue ? utils_service_1.UtilsService.convertToMoment(this.userValue, this.pickerConfig.format) : this.value;
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
            setTimeout(this.hideCalendars, this.pickerConfig.closeOnSelectDelay);
        }
    };
    ObDayPickerComponent.prototype.inputFocused = function () {
        this.hideStateHelper = false;
        this.areCalendarsShown = true;
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
        __metadata('design:type', String)
    ], ObDayPickerComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ObDayPickerComponent.prototype, "disabled", void 0);
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
            selector: 'dp-day-picker',
            templateUrl: './dp-day-picker.component.html',
            styleUrls: ['./dp-day-picker.component.less'],
            entryComponents: [dp_calendar_component_1.ObCalendarComponent],
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

//# sourceMappingURL=dp-day-picker.component.js.map
