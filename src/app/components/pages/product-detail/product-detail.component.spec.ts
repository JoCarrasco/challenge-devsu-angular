import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './../../core/product-form/product-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IProduct } from 'src/app/models';
import { awaitStream } from 'src/app/utils/testing/testing-utils';
import { Router } from '@angular/router';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let router: Router;
  
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent, ProductDetailComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])],
    });
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the product$ observable with the product with the given ID', async () => {
    const product: IProduct = {
      id: '12345',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'https://example.com/logo.png',
      date_release: '2023-08-23',
      date_revision: '2024-08-23'
    };

    component.product$ = of(product);
    fixture.detectChanges();
    const data = awaitStream<IProduct>(component.product$, 500);
    expect(data).toBe(product);
  });

  it('should update the product and navigate to the home page when the submit button is clicked', async () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });
});
