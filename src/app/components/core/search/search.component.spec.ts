import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let onSearchSpy: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    onSearchSpy = spyOn(component.onSearch, 'emit');
  });

  it('should initialize the component with the default values', () => {
    expect(component.queryItems).toEqual([]);
    expect(component.queryByPropNames).toEqual([]);
  });

  it('should filter the query items when the search input changes', () => {
    component.queryItems = ['item1', 'item2', 'item3'];
    component.queryByPropNames = ['name'];

    component.handleInputChange('item');
    fixture.detectChanges();

    expect(onSearchSpy).toHaveBeenCalledWith(['item1', 'item2']);
  });
});
