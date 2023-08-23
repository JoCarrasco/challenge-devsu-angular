import { ProductHelper } from 'src/app/classes/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from '../../../services';
import { IProductsTableComponentOnItemAction, OnItemActionType } from '../../core/products-table/products-table.component';
import { IProduct } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDeleteSubscription: Subscription | null = null;
  private onSearchSubscription: Subscription | null = null;
  private initializationSubscription: Subscription | null = null;

  private queryByPropNames = ['name', 'description'];

  private streamOfProducts$ = new BehaviorSubject<IProduct[] | null>(null);
  private streamOfSearchedProducts$ = new BehaviorSubject<IProduct[] | null>(null);

  products$ = this.streamOfProducts$.asObservable();
  searchedProducts$ = this.streamOfSearchedProducts$.asObservable();
  isSearchActive: boolean = false;

  constructor(private productService: ProductService, public router: Router) { }

  handleItemAction(itemAction: IProductsTableComponentOnItemAction) {
    if (itemAction.action === OnItemActionType.Edit) {
      this.router.navigate([`product/${itemAction.id}`]);
    } else if (itemAction.action === OnItemActionType.Delete) {
      if (this.onDeleteSubscription) {
        this.onDeleteSubscription.unsubscribe();
      }
      this.onDeleteSubscription = this.productService.deleteProduct$(itemAction.id).subscribe((res) => {
       //
      }, (err) => {
        if (err.status === 200) {
          this.updateProductStream();
        }
      });
    }
  }

  private updateProductStream() {
    if (this.initializationSubscription) {
      this.initializationSubscription.unsubscribe();
    }

    this.initializationSubscription = this.productService.getProducts$().subscribe((products) => {
      this.streamOfProducts$.next(ProductHelper.formatGroup(products));
    })
  }

  ngOnInit(): void {
    this.updateProductStream();
  }

  ngOnDestroy(): void {
    if (this.initializationSubscription !== null) {
      this.initializationSubscription.unsubscribe();    
    }
    if (this.onDeleteSubscription !== null) {
      this.onDeleteSubscription.unsubscribe();    
    }
    if (this.onSearchSubscription !== null) {
      this.onSearchSubscription.unsubscribe();    
    }
  }

  handleSearch(result: string | undefined) {
    if (result !== undefined) {
      if (this.onSearchSubscription) {
        this.onSearchSubscription.unsubscribe();;
      }
      this.onSearchSubscription = this.productService.searchProducts$(result, this.queryByPropNames).subscribe((searchResult) => {
        this.streamOfSearchedProducts$.next(ProductHelper.formatGroup(searchResult));
        this.isSearchActive = true;
      });
    }
  }

  handleAddNewProduct(): void {
    this.router.navigate(['product/create']);
  }

  handleAbortSearch() {
    this.isSearchActive = false;
  }
}
