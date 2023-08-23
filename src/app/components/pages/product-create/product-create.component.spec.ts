import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './../../core/product-form/product-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreateComponent } from './product-create.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let router: Router;
  
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent, ProductCreateComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])]
    });
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the product and navigate to the home page when the submit button is clicked', async () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });
});
