import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

/**
 * This function normalizes a string by replacing allaccented characters with their lowercase counterparts.
 * @param val The string to be normalized.
 * @returns The normalized string.
 */
function normalizeTxt(val: string) {
  val = val.replace(/[áàãâä]/g, 'a');
  val = val.replace(/[ÁÀÃÂÄ]/g, 'a');
  val = val.replace(/[éèêë]/g, 'e');
  val = val.replace(/[ÉÈÊË]/g, 'e');
  val = val.replace(/[íìîï]/g, 'i');
  val = val.replace(/[ÍÌÎÏ]/g, 'i');
  val = val.replace(/[óòõôö]/g, 'o');
  val = val.replace(/[ÓÒÕÔÖ]/g, 'o');
  val = val.replace(/[úùûü]/g, 'u');
  val = val.replace(/[ÚÙÛÜ]/g, 'u');
  val = val.replace(/[ç]/g, 'c');
  val = val.replace(/[Ç]/g, 'c');
  return val.toLowerCase();
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // The Font Awesome icon for the search icon.
  faCircleXmark = faCircleXmark;

  // The query items to be searched.
  @Input() queryItems: any[] | null = [];

  // The property names to be used for searching.
  @Input() queryByPropNames: string[] | null = [];

  // The output event for emitting the search results.
  @Output() onSearch = new EventEmitter<any | undefined>();

  // The output event for emitting the abort search event.
  @Output() onAbortSearch = new EventEmitter<void>();

  /**
   * Handles the event when the user aborts the search.
   */
  handleAbortSearch() {
    this.onAbortSearch.next();
  }

  /**
   * Handles the event when the user changes the search input.
   * @param val The new search input value.
   */
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

    // Filter the query items based on the search input value.
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

    // Emit the search results.
    this.onSearch.next(filtered.length > 0 ? filtered : undefined);
  }
}
