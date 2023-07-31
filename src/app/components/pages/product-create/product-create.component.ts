import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IApiProduct } from 'src/app/models/api.models';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  constructor(private api: ApiService, private router: Router) {

  }

  async handleSubmit(product: IApiProduct) {
    try {
      await lastValueFrom(this.api.createProduct(product));
      this.router.navigate(['home']);
    } catch (err) {
      console.error(err);
    }
  }

}
