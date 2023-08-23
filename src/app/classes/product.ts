import { format } from "date-fns";
import { IProduct } from "../models";
import { Observable, map } from "rxjs";

const defaultDateInputFormat = 'yyyy-MM-dd';

export class ProductHelper {
  static formatDate(product: IProduct): IProduct {
    product.date_release = format(new Date(product.date_release), defaultDateInputFormat);
    product.date_revision = format(new Date(product.date_revision), defaultDateInputFormat);
    return product;
  }

  static formatDate$(product$: Observable<IProduct | undefined>): Observable<IProduct | undefined> {
    return product$.pipe(map((p) => {
      if (p === undefined) {
        return p
      }
      
      p.date_release = format(new Date(p.date_release), defaultDateInputFormat);
      p.date_revision = format(new Date(p.date_revision), defaultDateInputFormat);
      console.log(p);
      return p;
    }))
  }
}

