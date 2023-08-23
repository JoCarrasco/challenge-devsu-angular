import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductDetailComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class PagesModule { }
