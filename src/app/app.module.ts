import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsTableComponent } from './components/core/products-table/products-table.component';
import { SearchComponent } from './components/core/search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/core/product-form/product-form.component';
import { ProductCreateComponent } from './components/pages/product-create/product-create.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';

const components = [
  SearchComponent,
  ProductsTableComponent,
  ProductFormComponent
]

const pages = [
  HomeComponent,
  ProductCreateComponent,
]

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ...pages,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    FontAwesomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
