import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { Observable, of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from 'src/app/models';
import { awaitStream } from 'src/app/utils/testing/testing-utils';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  
  beforeEach(() => {
      jasmine.clock().install();
  });

  afterEach(() => {
      jasmine.clock().uninstall();
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should initialize the form with the correct values', () => {
     component.isEdit = true;
    const product = {
      id: '12345',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'https://example.com/logo.png',
      date_release: '2023-08-23',
      date_revision: '2024-08-23',
    };
    component.isEdit = false;
    component.product$ = of(product);
    fixture.detectChanges();
    const data = awaitStream<IProduct>(component.product$, 500);
    expect(data).toBe(product);
  });

  it('should validate the form when the user submits it', () => {
    component.isEdit = false;
    component.setValues({
      id: 'trj-123',
      name: 'Product Name Examaple',
      description: 'Product Description',
      logo: 'https://example.com/logo.png',
      date_release: '2023-08-23',
      date_revision: '2023-08-23',
    });

    fixture.detectChanges();

    expect(component.productForm).toBeTruthy();

    component.productForm.setValue({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });

    fixture.detectChanges();

    expect(component.productForm.valid).toBeFalsy();
  });

  it('should emit the onSubmit event when the form is submitted', async () => {
    component.isEdit = false;
    const spy = spyOn(component.onSubmit, 'emit');
    const product: IProduct = {
      id: '12345',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'https://example.com/logo.png',
      date_release: '2023-08-23',
      date_revision: '2023-08-23'
    }

    component.setValues(product);
    fixture.detectChanges();
    expect(component.productForm).toBeTruthy();
    component.onSubmit.emit(product);
  
    expect(spy).toHaveBeenCalled();
  });
});


