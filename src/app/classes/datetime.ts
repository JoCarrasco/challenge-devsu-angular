import { add, format, parse } from 'date-fns';

export class DateTimeHelper {
  static formatDateByStr(dateStr: string) {
    const date = new Date(dateStr);
    return this.formatDate(date);
  }

  static today() {
    return new Date().toISOString().split('T')[0]
  }

  static formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }

  static addOneYearStr(str: string): string {
    const date = parse(str, 'yyyy-MM-dd', new Date());
    return format(add(date, { years: 1 }), 'yyyy-MM-dd');
  }
}
