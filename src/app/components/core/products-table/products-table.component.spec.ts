import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsTableComponent } from './products-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IApiProduct } from 'src/app/models/api.models';
import { By } from '@angular/platform-browser';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsTableComponent],
      imports: [FontAwesomeModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render table with correct number of rows', () => {
    const products: IApiProduct[] = [
      { id: 'tjk-313', logo: 'logo1.png', name: 'Product 1', description: 'Description 1', date_release: '2022-01-01', date_revision: '2022-01-05' },
      { id: 'tjk-314', logo: 'logo2.png', name: 'Product 2', description: 'Description 2', date_release: '2022-02-01', date_revision: '2022-02-05' },
    ];
  
    component.products = products;
    fixture.detectChanges();
  
    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(products.length);
  });
  
  it('should render product logo with correct source', () => {
    const products: IApiProduct[] = [{ id: 'tjk-234', logo: 'logo1.png', name: 'Product 1', description: 'Description 1', date_release: '2022-01-01', date_revision: '2022-01-05' }];
  
    component.products = products;
    fixture.detectChanges();
  
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.getAttribute('src')).toBe(products[0].logo);
  });
});
