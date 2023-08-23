import { DateTimeHelper } from 'src/app/classes/datetime';
import { add, format, formatISO, parse } from "date-fns";
import { IProduct } from "../models";
import { Observable, map } from "rxjs";
import { PRODUCT_SETTINGS as productSettings } from '../constants';



export class ProductHelper {
  private static defaultFormat = productSettings.dateTableFormat;

  static formatDate(product: IProduct, formatStr: string = this.defaultFormat): IProduct {
    product.date_release = format(DateTimeHelper.changeLocalTz(new Date(product.date_release)), formatStr);
    product.date_revision = format(DateTimeHelper.changeLocalTz(new Date(product.date_revision)), formatStr);
    return product;
  }

  static formatGroup(products: IProduct[], formatStr: string = this.defaultFormat) {
    return products.map((product) => this.formatDate(product, formatStr));
  }
  
  static rollbackFormat(product: IProduct): IProduct {
    product.date_release = formatISO(new Date(product.date_release));
    product.date_revision = formatISO(new Date(product.date_revision));
    return product;
  }

  static formatDate$(product$: Observable<IProduct | undefined>): Observable<IProduct | undefined> {
    return product$.pipe(map((p) => {
      if (p === undefined) {
        return p
      }
      
      return this.formatDate(p);
    }))
  }

  static addOneYearStr(str: string): string {
    const inputFormat = productSettings.dateInputFormat;
    const date = parse(str, inputFormat, new Date());
    return format(add(date, { years: 1 }), inputFormat);
  }
}

