import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnItemActionType, ProductsTableComponent } from './products-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';
import { IProduct } from 'src/app/models';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ProductHelper } from 'src/app/classes/product';

const products: IProduct[] = ProductHelper.formatGroup([
  { id: 'tjk-313', logo: 'logo1.png', name: 'Product 1', description: 'Description 1', date_release: '2023-08-24T00:00:00.000+00:00', date_revision: '2023-08-24T00:00:00.000+00:00' },
  { id: 'tjk-314', logo: 'logo2.png', name: 'Product 2', description: 'Description 2', date_release: '2024-08-24T00:00:00.000+00:00', date_revision: '2024-08-24T00:00:00.000+00:00' },
]);

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsTableComponent],
      imports: [FontAwesomeModule, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit an onItemAction event when the handleItemAction() method is called', () => {
    const spy = spyOn(component.onItemAction, 'emit');
    component.handleItemAction('123', OnItemActionType.Edit);
    expect(spy).toHaveBeenCalledWith({
      id: '123',
      action: OnItemActionType.Edit
    });
  });

  it('should change the currentPageIndex when the handlePageChange() method is called', () => {
    component.currentPageIndex = '0';
    component.handlePageChange({
      target: {
        value: '1'
      }
    });
    fixture.detectChanges();
    expect(component.currentPageIndex).toBe('1');
  });

  it('should render table rows with the resources provided', () => {
    component.products$ = of(products);
    fixture.detectChanges();
    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(products.length);
  });

  it('should update table rows when the resources are updated', () => {
    component.products$ = of(products);
    fixture.detectChanges();
    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(products.length);
    component.products$ = of([products[0]]);
    fixture.detectChanges();
    const updatedTableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(updatedTableRows.length).toBe(1);
  });

  it('should change the currentPageIndex when the setPage is called', async () => {
    const spy = spyOn(component, 'setPage');
    component.setPage('1');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('1');
    component.setPage('0');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('0');
  });
});
