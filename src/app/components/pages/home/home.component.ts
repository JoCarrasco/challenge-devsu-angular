import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IApiProduct } from 'src/app/models/api.models';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchByProps = ['name', 'description'];

  products: Observable<IApiProduct[]> = this.api.products$;
  searchedProducts: Observable<IApiProduct[]> = of([]);

  isSearchActive: boolean = false;

  constructor(private api: ApiService, private router: Router) {
    
  }

  handleSearch(result: IApiProduct[] | undefined) {
    if (result !== undefined) {
      this.searchedProducts = of(result);
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
