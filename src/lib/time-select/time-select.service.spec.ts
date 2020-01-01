import {inject, TestBed} from '@angular/core/testing';
import {TimeSelectService} from './time-select.service';
import * as momentNs from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {ITimeSelectConfigInternal} from './time-select-config.model';

const moment = momentNs;

describe('Service: TimeSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeSelectService, UtilsService]
    });
  });

  const configBase: ITimeSelectConfigInternal = {
    hours12Format: 'h',
    hours24Format: 'H',
    minutesFormat: 'm',
    secondsFormat: 's',
    meridiemFormat: 'a',
    timeSeparator: '-',
    minutesInterval: 3,
    secondsInterval: 4
  };

  it('should check the getTimeFormat method', inject([TimeSelectService],
    (service: TimeSelectService) => {
      expect(service.getTimeFormat({
        ...configBase,
        showTwentyFourHours: false,
        showSeconds: false
      })).toEqual('h-m a');
      expect(service.getTimeFormat({
        ...configBase,
        showTwentyFourHours: true,
        showSeconds: false
      })).toEqual('H-m');
      expect(service.getTimeFormat({
        ...configBase,
        showTwentyFourHours: false,
        showSeconds: true
      })).toEqual('h-m-s a');
      expect(service.getTimeFormat({
        ...configBase,
        showTwentyFourHours: true,
        showSeconds: true
      })).toEqual('H-m-s');
    }));

  it('should check the getHours method', inject([TimeSelectService],
    (service: TimeSelectService) => {
      const time = moment('13:12:11', 'HH:mm:ss');
      expect(service.getHours(configBase, time))
        .toEqual('1');
      expect(service.getHours({
        ...configBase,
        showTwentyFourHours: true
      }, time))
        .toEqual('13');
    }));

  it('should check the decrease method', inject([TimeSelectService],
    (service: TimeSelectService) => {
      const time = moment('13:12:11', 'HH:mm:ss');
      expect(service.decrease(configBase, time, 'hour').hour()).toEqual(12);
      expect(service.decrease(configBase, time, 'minute').minute()).toEqual(9);
      expect(service.decrease(configBase, time, 'second').second()).toEqual(7);
    }));

  it('should check the increase method', inject([TimeSelectService],
    (service: TimeSelectService) => {
      const time = moment('13:12:11', 'HH:mm:ss');
      expect(service.increase(configBase, time, 'hour').hour()).toEqual(14);
      expect(service.increase(configBase, time, 'minute').minute()).toEqual(15);
      expect(service.increase(configBase, time, 'second').second()).toEqual(15);
    }));

  it('should check the toggleMeridiem method', inject([TimeSelectService],
    (service: TimeSelectService) => {
      const time = moment('13:12:11', 'HH:mm:ss');
      expect(service.toggleMeridiem(time).hour()).toEqual(1);
      expect(service.toggleMeridiem(service.toggleMeridiem(time)).isSame(time)).toEqual(true);
    }));

  it('should check the shouldShowDecrease method', inject([TimeSelectService],
    (service: TimeSelectService) => {
      const time = moment('13:12:11', 'HH:mm:ss');
      const minConfig = {
        ...configBase,
        min: moment('13:12:11', 'HH:mm:ss')
      };
      const minTimeConfig = {
        ...configBase,
        minTime: moment('13:12:11', 'HH:mm:ss')
      };
      const minAndMinTimeConfig = {
        ...configBase,
        min: moment('11:11:11', 'HH:mm:ss'),
        minTime: moment('13:12:11', 'HH:mm:ss')
      };
      const minAndMinTimeConfig2 = {
        ...configBase,
        min: moment('13:12:11', 'HH:mm:ss'),
        minTime: moment('11:11:11', 'HH:mm:ss')
      };
      expect(service.shouldShowDecrease(minConfig, time, 'hour')).toEqual(false);
      expect(service.shouldShowDecrease(minConfig, time, 'minute')).toEqual(false);
      expect(service.shouldShowDecrease(minConfig, time, 'second')).toEqual(false);
      expect(service.shouldShowDecrease(minConfig, time.clone().add(1, 'hour'), 'hour')).toEqual(true);
      expect(service.shouldShowDecrease(minConfig, time.clone().add(2, 'minute'), 'minute')).toEqual(false);
      expect(service.shouldShowDecrease(minConfig, time.clone().add(3, 'second'), 'second')).toEqual(false);
      expect(service.shouldShowDecrease(minConfig, time.clone().add(10, 'minute'), 'minute')).toEqual(true);
      expect(service.shouldShowDecrease(minConfig, time.clone().add(15, 'second'), 'second')).toEqual(true);
      expect(service.shouldShowDecrease(minTimeConfig, time, 'hour')).toEqual(false);
      expect(service.shouldShowDecrease(minTimeConfig, time, 'minute')).toEqual(false);
      expect(service.shouldShowDecrease(minTimeConfig, time, 'second')).toEqual(false);
      expect(service.shouldShowDecrease(minTimeConfig, time.clone().add(1, 'hour'), 'hour')).toEqual(true);
      expect(service.shouldShowDecrease(minTimeConfig, time.clone().add(2, 'minute'), 'minute')).toEqual(false);
      expect(service.shouldShowDecrease(minTimeConfig, time.clone().add(3, 'second'), 'second')).toEqual(false);
      expect(service.shouldShowDecrease(minTimeConfig, time.clone().add(10, 'minute'), 'minute')).toEqual(true);
      expect(service.shouldShowDecrease(minTimeConfig, time.clone().add(15, 'second'), 'second')).toEqual(true);
      expect(service.shouldShowDecrease(minAndMinTimeConfig, time, 'hour')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig, time, 'minute')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig, time, 'second')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig, time.clone().add(1, 'hour'), 'hour')).toEqual(true);
      expect(service.shouldShowDecrease(minAndMinTimeConfig, time.clone().add(2, 'minute'), 'minute')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig, time.clone().add(3, 'second'), 'second')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig, time.clone().add(10, 'minute'), 'minute')).toEqual(true);
      expect(service.shouldShowDecrease(minAndMinTimeConfig, time.clone().add(15, 'second'), 'second')).toEqual(true);
      expect(service.shouldShowDecrease(minAndMinTimeConfig2, time, 'hour')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig2, time, 'minute')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig2, time, 'second')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig2, time.clone().add(1, 'hour'), 'hour')).toEqual(true);
      expect(service.shouldShowDecrease(minAndMinTimeConfig2, time.clone().add(2, 'minute'), 'minute')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig2, time.clone().add(3, 'second'), 'second')).toEqual(false);
      expect(service.shouldShowDecrease(minAndMinTimeConfig2, time.clone().add(10, 'minute'), 'minute')).toEqual(true);
      expect(service.shouldShowDecrease(minAndMinTimeConfig2, time.clone().add(15, 'second'), 'second')).toEqual(true);
    }));

  it('should check the shouldShowIncrease method', inject([TimeSelectService],
    (service: TimeSelectService) => {
      const time = moment('13:12:11', 'HH:mm:ss');
      const maxConfig = {
        ...configBase,
        max: moment('13:12:11', 'HH:mm:ss')
      };
      const maxTimeConfig = {
        ...configBase,
        maxTime: moment('13:12:11', 'HH:mm:ss')
      };
      const maxAndMaxTimeConfig = {
        ...configBase,
        max: moment('15:11:11', 'HH:mm:ss'),
        maxTime: moment('13:12:11', 'HH:mm:ss')
      };
      const maxAndMaxTimeConfig2 = {
        ...configBase,
        max: moment('13:12:11', 'HH:mm:ss'),
        maxTime: moment('15:11:11', 'HH:mm:ss')
      };
      expect(service.shouldShowIncrease(maxConfig, time, 'hour')).toEqual(false);
      expect(service.shouldShowIncrease(maxConfig, time, 'minute')).toEqual(false);
      expect(service.shouldShowIncrease(maxConfig, time, 'second')).toEqual(false);
      expect(service.shouldShowIncrease(maxConfig, time.clone().subtract(1, 'hour'), 'hour')).toEqual(true);
      expect(service.shouldShowIncrease(maxConfig, time.clone().subtract(2, 'minute'), 'minute')).toEqual(false);
      expect(service.shouldShowIncrease(maxConfig, time.clone().subtract(3, 'second'), 'second')).toEqual(false);
      expect(service.shouldShowIncrease(maxConfig, time.clone().subtract(10, 'minute'), 'minute')).toEqual(true);
      expect(service.shouldShowIncrease(maxConfig, time.clone().subtract(15, 'second'), 'second')).toEqual(true);
      expect(service.shouldShowIncrease(maxTimeConfig, time, 'hour')).toEqual(false);
      expect(service.shouldShowIncrease(maxTimeConfig, time, 'minute')).toEqual(false);
      expect(service.shouldShowIncrease(maxTimeConfig, time, 'second')).toEqual(false);
      expect(service.shouldShowIncrease(maxTimeConfig, time.clone().subtract(1, 'hour'), 'hour')).toEqual(true);
      expect(service.shouldShowIncrease(maxTimeConfig, time.clone().subtract(2, 'minute'), 'minute')).toEqual(false);
      expect(service.shouldShowIncrease(maxTimeConfig, time.clone().subtract(3, 'second'), 'second')).toEqual(false);
      expect(service.shouldShowIncrease(maxTimeConfig, time.clone().subtract(10, 'minute'), 'minute')).toEqual(true);
      expect(service.shouldShowIncrease(maxTimeConfig, time.clone().subtract(15, 'second'), 'second')).toEqual(true);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig, time, 'hour')).toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig, time, 'minute')).toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig, time, 'second')).toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig, time.clone().subtract(1, 'hour'), 'hour')).toEqual(true);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig, time.clone().subtract(2, 'minute'), 'minute'))
        .toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig, time.clone().subtract(3, 'second'), 'second'))
        .toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig, time.clone().subtract(10, 'minute'), 'minute'))
        .toEqual(true);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig, time.clone().subtract(15, 'second'), 'second'))
        .toEqual(true);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig2, time, 'hour')).toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig2, time, 'minute')).toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig2, time, 'second')).toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig2, time.clone().subtract(1, 'hour'), 'hour')).toEqual(true);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig2, time.clone().subtract(2, 'minute'), 'minute'))
        .toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig2, time.clone().subtract(3, 'second'), 'second'))
        .toEqual(false);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig2, time.clone().subtract(10, 'minute'), 'minute'))
        .toEqual(true);
      expect(service.shouldShowIncrease(maxAndMaxTimeConfig2, time.clone().subtract(15, 'second'), 'second'))
        .toEqual(true);
    }));

  it('should check the shouldShowToggleMeridiem method', inject([TimeSelectService],
    (service: TimeSelectService) => {
      const afternoonTime = moment('13:12:11', 'HH:mm:ss');
      const morningTime = moment('10:12:11', 'HH:mm:ss');
      const minConfig = {
        ...configBase,
        min: moment('13:12:11', 'HH:mm:ss')
      };
      const maxConfig = {
        ...configBase,
        max: moment('13:12:11', 'HH:mm:ss')
      };
      const minMaxConfig = {
        ...configBase,
        min: moment('11:12:11', 'HH:mm:ss'),
        max: moment('15:12:11', 'HH:mm:ss')
      };
      expect(service.shouldShowToggleMeridiem(configBase, morningTime)).toEqual(true);
      expect(service.shouldShowToggleMeridiem(configBase, afternoonTime)).toEqual(true);
      expect(service.shouldShowToggleMeridiem(minConfig, morningTime)).toEqual(true);
      expect(service.shouldShowToggleMeridiem(minConfig, afternoonTime)).toEqual(false);
      expect(service.shouldShowToggleMeridiem(maxConfig, morningTime)).toEqual(false);
      expect(service.shouldShowToggleMeridiem(maxConfig, afternoonTime)).toEqual(true);
      expect(service.shouldShowToggleMeridiem(minMaxConfig, morningTime)).toEqual(false);
      expect(service.shouldShowToggleMeridiem(minMaxConfig, afternoonTime)).toEqual(false);
    }));
});
