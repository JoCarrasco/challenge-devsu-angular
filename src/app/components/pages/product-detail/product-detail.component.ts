import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, of, switchMap } from 'rxjs';
import { IApiProduct } from 'src/app/models/api.models';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: IApiProduct | undefined;
  
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (res) => {
      const id = res.get('id');
      console.log(id);
      if (id !== null) {
        const products = await lastValueFrom(this.api.getProducts());
        console.log(products);
        if (products !== null) {
          const product = products.find((p) => p.id === id);
          if (product !== undefined) {
            this.product = product;
          }
        }
      }
    })
  }

  async handleSubmit(product: IApiProduct) {
    try {
      await lastValueFrom(this.api.updateProduct(product));
      this.router.navigate(['home']);
    } catch (err) {
      console.error(err);
    }
  }
}
