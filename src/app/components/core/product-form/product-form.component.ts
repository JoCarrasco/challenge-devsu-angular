import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { IApiProduct } from 'src/app/models/api.models';
import { ApiService } from 'src/app/services/api/api.service';

interface IProductForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  logo: FormControl<string | null>;
  date_release: FormControl<string | null>;
  date_revision: FormControl<string | null>;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() isEdit = false;
  @Input() product: IApiProduct | undefined;
  @Output() onSubmit = new EventEmitter<IApiProduct>();

  isIdTaken = false;
  productForm: FormGroup<IProductForm>;

  private strDateToDatePickerStr(dateStr: string) {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const newDate = new Date(year, month, day);
    return this.datePipe.transform(newDate, 'yyyy-MM-dd');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.product !== undefined) {
      this.id?.setValue(this.product.id);
      this.description?.setValue(this.product.description);
      this.name?.setValue(this.product.name);
      this.logo?.setValue(this.product.logo);
      
      this.date_release?.setValue(this.strDateToDatePickerStr(this.product.date_release));
      this.date_revision?.setValue(this.strDateToDatePickerStr(this.product.date_revision));
    }
  }

  constructor(private datePipe: DatePipe, public api: ApiService) {
    this.productForm = new FormGroup({
      id: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      logo: new FormControl('', [
        Validators.required
      ]),
      date_release: new FormControl('',
        Validators.required
      ),
      date_revision: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  get today() {
    return new Date().toISOString().split('T')[0];
  }

  get id() {
    return this.productForm.get('id');
  }
  
  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get logo() {
    return this.productForm.get('logo');
  }

  get date_release() {
    return this.productForm.get('date_release');
  }

  get date_revision() {
    return this.productForm.get('date_revision');
  }

  isValidId(api: ApiService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return api.getIsIdValid(control.value).pipe(map((res) => res ? { validId: true } : null))
    }
  }

  ngOnInit(): void {
    if (this.isEdit === false) {
      this.id?.addAsyncValidators(this.isValidId(this.api));
      this.id?.updateValueAndValidity();
    }
  }

  updateReleaseDate() {
    const revisionDateStr = this.productForm.get('date_release')?.value;
    if (revisionDateStr) {
      const releaseDate = new Date(revisionDateStr);

      const year = releaseDate.getUTCFullYear();
      const month = releaseDate.getUTCMonth();
      const day = releaseDate.getUTCDate();
      const yearAhead = new Date(year + 1, month, day);
      
      this.productForm.get('date_revision')?.setValue(this.datePipe.transform(yearAhead, 'yyyy-MM-dd'));
    }
  }

  handleReset() {
    this.id?.setValue(this.product !== undefined ? this.product?.id : '')
    this.name?.setValue(this.product !== undefined ? this.product?.name : '')
    this.description?.setValue(this.product !== undefined ? this.product?.description : '')
    this.logo?.setValue(this.product !== undefined ? this.product?.logo : '')
    this.date_release?.setValue(this.product !== undefined ? this.product?.date_release : '')
    this.date_revision?.setValue(this.product !== undefined ? this.product?.date_revision : '')
  }

  handleSubmit() {
    if (this.productForm.valid) {
      const product: IApiProduct = {
        id: this.id!.value!,
        name: this.name!.value!,
        description: this.description!.value!,
        logo: this.logo!.value!,
        date_release: this.date_release!.value!,
        date_revision: this.date_revision!.value!,
      };

      this.onSubmit.emit(product);
    }
  }
}
