import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEllipsisVertical, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { IPaginatedResourcePage, IProduct } from 'src/app/models';
import { Observable, of } from 'rxjs';
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
export class ProductsTableComponent {
  @Input() products$: Observable<IProduct[] | null> = of(null);
  @Output() onItemAction = new EventEmitter<IProductsTableComponentOnItemAction>();

  currentPageIndex: string = '0';
  
  constructor() { }

  activeMenuItemId: string | undefined;
  faEllipsisVertical = faEllipsisVertical;
  faCircleInfo = faCircleInfo;

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
    this.currentPageIndex = ev.target.value;
  }
}
