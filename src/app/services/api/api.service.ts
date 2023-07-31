import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf, iif, of, throwError, lastValueFrom } from 'rxjs';
import { PRODUCTS_ROUTE, PRODUCT_ID_VERIFY_ROUTE, PRODUCT_ROUTE } from 'src/app/constants/api.constants';
import { catchError, switchMap } from 'rxjs/operators';
import { IApiProduct } from 'src/app/models/api.models';

interface IErrorObj {
  status: number;
  statusCode: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly headers = (new HttpHeaders({ 'authorId': '1' }));
  private error$ = new BehaviorSubject<IErrorObj | null>(null);
  error = this.error$.asObservable();
  errorExists = this.error.pipe(switchMap((ob) => iif(() => ob === null, of(false), of(true))));
  
  products$ = new BehaviorSubject<IApiProduct[] | null>(null);

  constructor(private http: HttpClient) { }
  
  getProduct(id: string): Observable<IApiProduct> {
    return this.get<IApiProduct>(PRODUCT_ROUTE(id));
  }
  
  public getIsIdValid(id: string): Observable<boolean> {
    return this.get<boolean>(PRODUCT_ID_VERIFY_ROUTE(id));
  }

  async updateProductsObs() {
    this.products$.next(await lastValueFrom(this.getProducts()));
  }


  getProducts(): Observable<IApiProduct[]> {
    return this.get<IApiProduct[]>(PRODUCTS_ROUTE);
  }

  createProduct(product: IApiProduct): Observable<IApiProduct> {
    return this.http.post<IApiProduct>(PRODUCTS_ROUTE, product,  { headers: this.headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return throwError(() => new Error(err.message))
      })
    );
  } 

  updateProduct(product: IApiProduct): Observable<IApiProduct> {
    return this.http.put<IApiProduct>(PRODUCTS_ROUTE, product,  { headers: this.headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return throwError(() => new Error(err.message))
      })
    );
  } 

  private get<T>(route: string): Observable<T> {
    return this.http.get<T>(route, { headers: this.headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return throwError(() => new Error(err.message))
      })
    )
  }

  deleteProduct(id: string): Promise<void> {
    return new Promise(async (resolve) => {
      try {
        await lastValueFrom(this.http.delete(PRODUCT_ROUTE(id), { headers: this.headers }));
        // console.log(res);
        resolve();
      } catch (err) {
        // console.log('Found');
        // console.log(err);
        resolve();
        this.updateProductsObs();
      }
    })
  }

  private handleError (error: HttpErrorResponse) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    this.error$.next({ status: error.status, statusCode: error.statusText, message: errMsg })
    return new Error(errMsg);
  }
}
