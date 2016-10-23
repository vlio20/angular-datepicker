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
var moment = require('moment');
var utils_service_1 = require('../../common/services/utils/utils.service');
var DayPickerService = (function () {
    function DayPickerService() {
        this.defaultConfig = {
            firstDayOfWeek: 'su',
            calendarsAmount: 1,
            format: 'DD-MM-YYYY',
            closeOnSelect: true,
            closeOnSelectDelay: 100,
            weekdayNames: {
                su: 'sun',
                mo: 'mon',
                tu: 'tue',
                we: 'wed',
                th: 'thu',
                fr: 'fri',
                sa: 'sat'
            },
            disabled: false,
            disableKeypress: false
        };
    }
    // private formatValues(config: IDayPickerConfig): void {
    //   const {selected, format} = config;
    // }
    DayPickerService.prototype.getConfig = function (config) {
        var _config = Object.assign({}, this.defaultConfig, config);
        // this.formatValues(config);
        return _config;
    };
    DayPickerService.prototype.generateCalendars = function (config, selected, month) {
        var base = (month && month.clone()) || (selected && selected.clone()) || moment();
        return utils_service_1.UtilsService.createArray(config.calendarsAmount).map(function (n, i) { return ({
            month: base.add(i, 'month').clone(),
            selected: selected,
            firstDayOfWeek: config.firstDayOfWeek,
            weekdayNames: config.weekdayNames,
            min: config.min,
            max: config.max
        }); });
    };
    DayPickerService.prototype.isDateValid = function (date, format) {
        if (date === '') {
            return true;
        }
        return moment(date, format, true).isValid();
    };
    DayPickerService.prototype.moveCalendars = function (config, selected, base, months) {
        var month = base.clone().add(months, 'month');
        return this.generateCalendars(config, selected, month);
    };
    DayPickerService.prototype.isMinMonth = function (min, month) {
        return month.clone().subtract(1, 'month').isBefore(min, 'month');
    };
    DayPickerService.prototype.isMaxMonth = function (max, month) {
        return month.clone().add(1, 'month').isAfter(max, 'month');
    };
    DayPickerService.prototype.createValidator = function (_a, dateFormat) {
        var minDate = _a.minDate, maxDate = _a.maxDate;
        var isValid;
        var value;
        var validators = [];
        if (minDate) {
            validators.push({
                key: 'minDate',
                isValid: function () {
                    var _isValid = value.isSameOrAfter(minDate, 'day');
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (maxDate) {
            validators.push({
                key: 'maxDate',
                isValid: function () {
                    var _isValid = value.isSameOrBefore(maxDate, 'day');
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        return function validateInput(c) {
            isValid = true;
            if (c.value) {
                value = typeof c.value === 'string' ? moment(c.value, dateFormat) : c.value;
            }
            else {
                return null;
            }
            if (!value.isValid()) {
                return {
                    format: {
                        given: c.value
                    }
                };
            }
            var errors = validators.reduce(function (map, err) {
                if (!err.isValid()) {
                    map[err.key] = {
                        given: value
                    };
                }
                return map;
            }, {});
            return !isValid ? errors : null;
        };
    };
    DayPickerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DayPickerService);
    return DayPickerService;
}());
exports.DayPickerService = DayPickerService;

//# sourceMappingURL=day-picker.service.js.map
