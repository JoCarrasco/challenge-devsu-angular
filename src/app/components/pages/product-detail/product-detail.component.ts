import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, mergeMap, of } from 'rxjs';
import { IProduct } from '../../../models';
import { ProductService } from '../../../services';
import { ProductHelper } from 'src/app/classes/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnDestroy {
  private submitSubscription: Subscription | null = null;
  product$: Observable<IProduct | undefined> = ProductHelper.formatDate$(this.getProductByParamId());
  
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  private getProductByParamId() {
    return this.route.paramMap.pipe(mergeMap((params) => {
      const id = params.get('id')
      return id ? this.productService.getProduct$(id) : of(undefined);
    }));
  }

  handleSubmit(product: IProduct) {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
    
    this.submitSubscription = this.productService.updateProduct$(product).subscribe(() => {
      this.router.navigate(['home']);
    });
  }

  ngOnDestroy(): void {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  }
}
