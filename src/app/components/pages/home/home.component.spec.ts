import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { SearchComponent } from '../../core/search/search.component';
import { ProductsTableComponent } from '../../core/products-table/products-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    // Configure the testing module
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, RouterTestingModule.withRoutes([]), FontAwesomeModule],
      declarations: [HomeComponent, SearchComponent, ProductsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component fixture
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
