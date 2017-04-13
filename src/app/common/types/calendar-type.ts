export type CalendarType = 'day' | 'month';

export enum ECalendarType {
  Day,
  Month
}

export function getCalendarType(type: CalendarType) {
  switch (type) {
    case 'day':
      return ECalendarType.Day;
    case 'month':
      return ECalendarType.Month
  }
}