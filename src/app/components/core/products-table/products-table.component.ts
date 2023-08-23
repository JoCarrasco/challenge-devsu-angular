import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faEllipsisVertical, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { IPaginatedResourcePage, IProduct } from 'src/app/models';
import { Observable, Subscription, of } from 'rxjs';
import { PaginationHelper } from 'src/app/classes/pagination';
import { PRODUCT_SETTINGS  as productSettings } from 'src/app/constants';

export enum OnItemActionType {
  Edit = 'edit',
  Delete = 'delete'
};

export interface IProductsTableComponentOnItemAction {
  action: OnItemActionType,
  id: string;
}

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, OnDestroy {  
  @Input() products$: Observable<IProduct[] | null> = of(null);
  @Output() onItemAction = new EventEmitter<IProductsTableComponentOnItemAction>();

  private productsSubscription: Subscription | null = null;

  currentPageIndex: string = '0';

  activeMenuItemId: string | undefined;
  faEllipsisVertical = faEllipsisVertical;
  faCircleInfo = faCircleInfo;
  
  constructor() { }
  
  ngOnInit(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }

    this.productsSubscription = this.products$.subscribe(() => {
      this.setPage('0');
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();    
    }
  }

  get action() {
    return OnItemActionType;
  }

  get currentPage(): number {
    return parseInt(this.currentPageIndex, 10);
  }

  private paginatedProducts$() {
    return PaginationHelper.paginate$<IProduct>(this.products$, productSettings.productPerPage);
  }

  get pages$() {
    return PaginationHelper.getPages$<IProduct>(this.paginatedProducts$());
  }

  get totalItems$() {
    return PaginationHelper.getTotalItems$<IProduct>(this.paginatedProducts$());
  }

  setPage(index: string) {
    this.currentPageIndex = index;
  }

  isCurrentPage$(page: IPaginatedResourcePage<IProduct[]>): Observable<boolean> {
    return PaginationHelper.isCurrentPage$(of(page), this.currentPage);
  }

  handleItemAction(id: string, action: OnItemActionType) {
    this.onItemAction.emit({
      id,
      action
    });
  }

  handlePageChange(ev: any) {
    this.setPage(ev.target.value);
  }
}
