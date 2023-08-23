import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const components = [
  ProductFormComponent,
  ProductsTableComponent,
  SearchComponent
]

@NgModule({
  declarations: [
   ...components
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    ...components
  ]
})
export class CoreModule { }
