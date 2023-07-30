import { Component, Input } from '@angular/core';
import { IApiProduct } from 'src/app/models/api.models';
import { faEllipsisVertical, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  faEllipsisVertical = faEllipsisVertical;
  faCircleInfo = faCircleInfo;

  @Input() products: IApiProduct[] | null = null;
}
