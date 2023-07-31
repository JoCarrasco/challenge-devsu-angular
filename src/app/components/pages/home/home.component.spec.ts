import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { ApiService } from 'src/app/services/api/api.service';
import { IApiProduct } from 'src/app/models/api.models';
import { By } from '@angular/platform-browser';
import { SearchComponent } from '../../core/search/search.component';
import { ProductsTableComponent } from '../../core/products-table/products-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// const mockedItems: IApiProduct[] = [
//   { id: 'tjk-313', logo: 'logo1.png', name: 'Product 1', description: 'Description 1', date_release: '2022-01-01', date_revision: '2022-01-05' },
//   { id: 'tjk-314', logo: 'logo1.png', name: 'Product 1', description: 'Description 1', date_release: '2022-01-01', date_revision: '2022-01-05' }
// ]

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   let apiServiceStub: Partial<ApiService>;

//   beforeEach(async () => {
//     // Configure the testing module
//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule, FontAwesomeModule],
//       declarations: [HomeComponent, SearchComponent, ProductsTableComponent],
//       providers: [{ provide: ApiService, useValue: apiServiceStub }]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     // Create the component fixture
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should display products table when search is not active', () => {
//     // Set searchActive to false
//     component.isSearchActive = false;
//     fixture.detectChanges();

//     // Select the products table element
//     const productsTable = fixture.debugElement.query(By.css('.products-table'));

//     // Assert that the products table is visible
//     expect(productsTable).toBeTruthy();
//   });

 

//   it('should navigate to product creation page on add new product click', () => {
//     // Spy on the router navigate method
//     const routerSpy = spyOn(component.router, 'navigate');

//     // Trigger the add new product click event
//     const addButton = fixture.debugElement.query(By.css('.brand-btn'));
//     addButton.triggerEventHandler('click', null);

//     // Assert that the router navigate method was called with the correct route
//     expect(routerSpy).toHaveBeenCalledWith(['product/create']);
//   });

//   it('should set searchActive to false on handleAbortSearch', () => {
//     // Set searchActive to true
//     component.isSearchActive = true;
//     fixture.detectChanges()


//     // Call the handleAbortSearch method
//     component.handleAbortSearch();

//     // Assert that searchActive is set to false
//     expect(component.isSearchActive.valueOf()).toBe(false);
//   });
// });
