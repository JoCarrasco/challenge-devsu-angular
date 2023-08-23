import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the search results when the user enters a value', async () => {
    const spy = spyOn(component.onSearch, 'emit');
    const searchTerm = 'hello world';
    component.handleInputChange(searchTerm);
    expect(spy).toHaveBeenCalledWith(searchTerm);
  });

  it('should emit the abort search event when the user clears the search input', async () => {
    const spy = spyOn(component.onAbortSearch, 'emit');
    component.handleInputChange('');
    expect(spy).toHaveBeenCalled();
  });
});
