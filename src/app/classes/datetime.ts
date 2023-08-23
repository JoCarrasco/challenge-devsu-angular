import { zonedTimeToUtc } from 'date-fns-tz';

export class DateTimeHelper {
  static today() {
    return new Date().toISOString().split('T')[0]
  }

  static changeLocalTz(date: Date): Date {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return zonedTimeToUtc(date, tz);
  }
}
