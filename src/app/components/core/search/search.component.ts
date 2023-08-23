import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { OperationsHelper } from 'src/app/classes/operations';

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
    this.onAbortSearch.emit();
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
    const filtered = OperationsHelper.searchByPropNames<any>(val, this.queryItems, this.queryByPropNames);
    // Emit the search results.
    this.onSearch.emit(filtered);
  }
}
