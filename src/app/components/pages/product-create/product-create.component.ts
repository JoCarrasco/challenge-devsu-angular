import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { Subscription, map } from 'rxjs';
import { IProduct } from 'src/app/models';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnDestroy {
  private submitSubscription: Subscription | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  handleSubmit(product: IProduct) {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }

    this.submitSubscription = this.productService.createProduct$(product).subscribe((res) => {
      this.router.navigate(['home']);
    });
  }

  isProductIdValid$ = (id: string) => {
    return this.productService.getProductVerification$(id).pipe(map((isValid) => !isValid))
  }

  ngOnDestroy(): void {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();    
    }
  }
}
