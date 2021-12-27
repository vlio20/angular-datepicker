import dayjs from 'dayjs';
import 'dayjs/plugin/isSameOrAfter';
import 'dayjs/plugin/isSameOrBefore';
import 'dayjs/plugin/isBetween';
import 'dayjs/plugin/isoWeek';
import 'dayjs/plugin/customParseFormat';

// @ts-ignore
dayjs.extend(require('dayjs/plugin/isSameOrAfter'));
// @ts-ignore
dayjs.extend(require('dayjs/plugin/isSameOrBefore'));
// @ts-ignore
dayjs.extend(require('dayjs/plugin/isBetween'));
// @ts-ignore
dayjs.extend(require('dayjs/plugin/isoWeek'));
// @ts-ignore
dayjs.extend(require('dayjs/plugin/customParseFormat'));

export const dayjsRef = dayjs;
