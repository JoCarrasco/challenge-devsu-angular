import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IApiProduct } from 'src/app/models/api.models';
import { faEllipsisVertical, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnChanges {
  @Input() products: IApiProduct[] | null = null;
  @Output() onChange = new EventEmitter();

  constructor(private router: Router, private api: ApiService) { }

  activeMenuItemId: string | undefined;
  faEllipsisVertical = faEllipsisVertical;
  faCircleInfo = faCircleInfo;
  pagesOfProducts: IApiProduct[][] = [];
  paginationOptions: { name: number;  value: number}[] = [];
  currentPagination = 0;

  ngOnChanges(): void {
    this.paginateProducts();
  }

  handleItemAction(id: string, action: 'edit' | 'delete') {
    if (action === 'edit') {
      this.router.navigate([`product/${id}`]);
    } else {
      this.api.deleteProduct(id).then(() => {
        this.api.updateProductsObs();
      });
    }
  }

  paginateProducts(): void {
    if (this.products === null) {
      return;
    }

    const pageSize = 5;
    const pageCount = Math.ceil(this.products.length / pageSize);
  
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      const startIndex = i * pageSize;
      const endIndex = startIndex + pageSize;
  
      const page = this.products.slice(startIndex, endIndex);
      this.paginationOptions.push({ name: i + 1, value: i });
      pages.push(page);
    }
  
    this.pagesOfProducts = pages;
  }

  handlePageChange(ev: any) {
    this.currentPagination = ev.target.value;
  }
}
