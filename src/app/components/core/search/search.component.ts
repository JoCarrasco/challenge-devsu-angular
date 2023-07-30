import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function normalizeTxt(val: string) {
  val = val.replace(/[áàãâä]/g, 'a')
  val = val.replace(/[ÁÀÃÂÄ]/g, 'a')
  val = val.replace(/[éèêë]/g, 'e')
  val = val.replace(/[ÉÈÊË]/g, 'e')
  val = val.replace(/[íìîï]/g, 'i')
  val = val.replace(/[ÍÌÎÏ]/g, 'i')
  val = val.replace(/[óòõôö]/g, 'o')
  val = val.replace(/[ÓÒÕÔÖ]/g, 'o')
  val = val.replace(/[úùûü]/g, 'u')
  val = val.replace(/[ÚÙÛÜ]/g, 'u')
  val = val.replace(/[ç]/g, 'c')
  val = val.replace(/[Ç]/g, 'c')
  return val.toLowerCase();
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  faCircleXmark = faCircleXmark;

  @Input() queryItems: any[] | null = [];
  @Input() queryByPropNames: string[] | null = [];

  @Output() onSearch = new EventEmitter<any | undefined>();
  @Output() onAbortSearch = new EventEmitter<void>();

  handleAbortSearch() {
    this.onAbortSearch.next();
  }

  handleInputChange(val: string): void {
    if (this.queryByPropNames === undefined || this.queryByPropNames === null || this.queryByPropNames.length < 1) {
      return;
    }

    if (this.queryItems === undefined || this.queryItems === null || this.queryItems.length < 1) {
      return;
    }

    if (val === '') {
      this.handleAbortSearch();
      return;
    }

    const filtered = this.queryItems.filter((item) => {
      let isMatch: boolean = false;
      for (let index = 0; index < this.queryByPropNames!.length; index++) {
        const value: string = item[this.queryByPropNames![index]];
        const isCurrentPropMatch = normalizeTxt(value).includes(normalizeTxt(val));
        if (isCurrentPropMatch) {
          isMatch = true;
        }
      }
      return isMatch;
    });

    this.onSearch.next(filtered.length > 0 ? filtered : undefined);
  }
}
