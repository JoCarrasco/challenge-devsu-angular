import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../api/api.service';
import { IProduct } from '../../models';
import { PRODUCTS_ENDPOINTS as endpoints} from '../../constants';
import { OperationsHelper } from 'src/app/classes/operations';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private api: ApiService) { }

  getProduct$(id: string): Observable<IProduct | undefined> {
    return this.getProducts$().pipe(map((products) => {
      return products.find((p) => p.id === id);
    }))
  }

  getProducts$() {
    return this.api.get<IProduct[]>(endpoints.products);
  }

  getProductVerification$(id: string) {
    return this.api.get<boolean>(endpoints.productVerify(id));
  }

  updateProduct$(product: IProduct) {
    return this.api.put<IProduct, IProduct>(endpoints.products, product);
  }

  createProduct$(product: IProduct) {
    return this.api.post<IProduct, IProduct>(endpoints.products, product);
  }

  deleteProduct$(id: string) {
    return this.api.delete(endpoints.product(id));
  }

  searchProducts$(query: string, queryByPropNames: string[]): Observable<IProduct[]> {
    return this.getProducts$().pipe(map((products) => OperationsHelper.searchByPropNames<IProduct>(query, products, queryByPropNames)));
  }
}
