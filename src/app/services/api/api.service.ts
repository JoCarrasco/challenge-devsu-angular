import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf, iif, of, throwError } from 'rxjs';
import { PRODUCTS_ROUTE, PRODUCT_ROUTE } from 'src/app/constants/api.constants';
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
  
  products$ = this.getProducts();

  constructor(private http: HttpClient) { }
  
  getProduct(id: string): Observable<IApiProduct> {
    return this.get<IApiProduct>(PRODUCT_ROUTE(id));
  }

  private getProducts(): Observable<IApiProduct[]> {
    return this.get<IApiProduct[]>(PRODUCTS_ROUTE);
  }

  private get<T>(route: string): Observable<T> {
    return this.http.get<T>(route, { headers: this.headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return throwError(() => new Error(err.message))
      })
    )
  }

  private handleError (error: HttpErrorResponse) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    this.error$.next({ status: error.status, statusCode: error.statusText, message: errMsg })
    return new Error(errMsg);
  }
}
