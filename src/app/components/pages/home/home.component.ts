import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApiProduct } from 'src/app/models/api.models';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-wrapper">
      <div class="cta-tools-row">
        <app-search [queryItems]="products" [queryByPropNames]="searchByProps" (onSearch)="handleSearch($event)" (onAbortSearch)="handleAbortSearch()"></app-search>
        <button class="brand-btn" (click)="handleAddNewProduct()">Agregar</button>
      </div>
      <app-products-table class="products-table" [products]="products" *ngIf="!isSearchActive"></app-products-table>
      <app-products-table class="searched-products-table" [products]="searchedProducts" *ngIf="isSearchActive"></app-products-table>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchByProps = ['name', 'description'];

  products: IApiProduct[] = [];
  searchedProducts: IApiProduct[] = [];

  isSearchActive: boolean = false;

  constructor(private api: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.api.products$.subscribe((res) => {
      if (res !== null) {
        this.products = res;
      }
    })

    this.api.updateProductsObs();
  }

  handleSearch(result: IApiProduct[] | undefined) {
    if (result !== undefined) {
      this.searchedProducts = result;
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
