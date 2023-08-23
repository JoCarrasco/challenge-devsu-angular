import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Subscription, map, of } from 'rxjs';
import { DateTimeHelper } from '../../../classes/datetime';
import { IProduct } from 'src/app/models';

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
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() isEdit: boolean = false;
  @Input() isProductIdValid$: (id: string) => Observable<boolean> = () => of(false);
  @Input() product$: Observable<IProduct | undefined> = of(undefined);
  @Output() onSubmit = new EventEmitter<IProduct>();
  
  private dateReleaseSubscription: Subscription | null = null;
  private plainProduct: IProduct | undefined | null = null;

  productForm: FormGroup<IProductForm> = new FormGroup({
    id: new FormControl({ value: '', disabled: this.isEdit }, [
      Validators.required
    ].concat(
      !this.isEdit ?
        [
          Validators.maxLength(10),
          Validators.minLength(5)
        ] :
        []
      )
    ),
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
    date_revision: new FormControl({value: '', disabled: true}, [
      Validators.required,
    ]),
  });

  constructor() { }

  get today() {
    return DateTimeHelper.today();
  }

  get id() {
    return this.productForm.get('id')!;
  }
  
  get name() {
    return this.productForm.get('name')!;
  }

  get description() {
    return this.productForm.get('description')!;
  }

  get logo() {
    return this.productForm.get('logo')!;
  }

  get date_release() {
    return this.productForm.get('date_release')!;
  }

  get date_revision() {
    return this.productForm.get('date_revision')!;
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    if (!this.isEdit) {
      this.id?.addAsyncValidators(this.isValidId(this.isProductIdValid$));
    } else {
      this.product$.subscribe((product) => {
        this.plainProduct = product;
        this.setValues(product);

      });
    }

    this.setDateReleaseWatcher();
  }

  private setDateReleaseWatcher() {
    const { addOneYearStr } = DateTimeHelper;
    this.dateReleaseSubscription = this.date_release.valueChanges.subscribe((value) => {
      if (value) {
        this.date_revision.setValue(addOneYearStr(value))
      }
    });
  }

  private setValues(product: IProduct | undefined | null) {
    this.id.setValue(product?.id || '')
    this.name.setValue(product?.name || '')
    this.description.setValue(product?.description || '')
    this.logo.setValue(product?.logo || '')
    this.date_release.setValue(product?.date_release || '')
    this.date_revision.setValue(product?.date_revision || '')
  }

  handleReset() {
    if (this.isEdit) {
      if (this.plainProduct !== null && this.plainProduct !== undefined) {
        const { id, name, description,logo, date_release, date_revision } = this.plainProduct;
        this.setValues(
          {
            id,
            name,
            description,
            logo,
            date_release,
            date_revision
          }
        )
      }
    } else {
      this.setValues({
        id: '',
        name:'',
        description: '',
        logo: '',
        date_release: '',
        date_revision: ''
      })
    }
  }

  handleSubmit() {
    if (this.productForm.valid) {
      const product: IProduct = {
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

  private isValidId(isProductIdValid$: (id: string) => Observable<boolean>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return isProductIdValid$(control.value).pipe(map((res) => res === false || res === null ? { validId: true } : null));
    }
  }

  ngOnDestroy(): void {
    if (this.dateReleaseSubscription) {
      this.dateReleaseSubscription.unsubscribe();
    }
  }
}
