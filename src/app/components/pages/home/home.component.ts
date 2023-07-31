import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IApiProduct } from 'src/app/models/api.models';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-wrapper">
      <div class="cta-tools-row">
        <app-search [queryItems]="products | async" [queryByPropNames]="searchByProps" (onSearch)="handleSearch($event)" (onAbortSearch)="handleAbortSearch()"></app-search>
        <button class="brand-btn" (click)="handleAddNewProduct()">Agregar</button>
      </div>
      <app-products-table class="products-table" [products]="products | async" *ngIf="!isSearchActive"></app-products-table>
      <app-products-table class="searched-products-table" [products]="searchedProducts | async" *ngIf="isSearchActive"></app-products-table>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchByProps = ['name', 'description'];

  products: Observable<IApiProduct[]> = this.api.products$;
  searchedProducts: Observable<IApiProduct[]> = of([]);

  isSearchActive: boolean = false;

  constructor(private api: ApiService, public router: Router) { }

  handleSearch(result: IApiProduct[] | undefined) {
    if (result !== undefined) {
      this.searchedProducts = of(result);
      this.isSearchActive = true;
    }
  }

  handleAddNewProduct(): void {
    this.router.navigate(['product/create']);
  }

  handleAbortSearch() {
    this.isSearchActive = false;
  }
}
