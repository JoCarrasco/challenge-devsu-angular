import { Component, EventEmitter, Output } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // The Font Awesome icon for the search icon.
  faCircleXmark = faCircleXmark;

  // The output event for emitting the search results.
  @Output() onSearch = new EventEmitter<string>();

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
    if (val === '') {
      this.handleAbortSearch();
      return;
    }
    // Emit the search results.
    this.onSearch.emit(val);
  }
}
