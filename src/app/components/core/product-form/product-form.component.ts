import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IApiProduct } from 'src/app/models/api.models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() product: IApiProduct | undefined;

  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    date_release: new FormControl(''),
    date_revision: new FormControl(''),
  });

  productFormSubscription: Subscription;

  constructor() {
    this.productFormSubscription = this.productForm.valueChanges.subscribe(() => {
      this.updateReleaseDate();
    });
  }

  ngOnInit(): void {
   
  }

  
  updateReleaseDate() {
    // const revisionDate = this.form.get('revisionDate').value;
    // if (revisionDate) {
    //   const releaseDate = new Date(revisionDate);
    //   releaseDate.setFullYear(releaseDate.getFullYear() + 1);
    //   // this.productForm.get('releaseDate').setValue(this.datePipe.format(releaseDate));
    // }
  }

  ngOnDestroy(): void {
    this.productFormSubscription.unsubscribe();
  }
}
