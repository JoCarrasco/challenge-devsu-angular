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

  it('should emit onAbortSearch event when handleAbortSearch is called', () => {
    spyOn(component.onAbortSearch, 'emit');
    component.handleAbortSearch();
    fixture.detectChanges();
    expect(component.onAbortSearch.emit).toHaveBeenCalled();
  });
  
  it('should filter queryItems and emit onSearch event when handleInputChange is called', () => {
    spyOn(component.onSearch, 'emit');
    const mockQueryItems = [
      { name: 'Apple', category: 'Fruit' },
      { name: 'Banana', category: 'Fruit' },
      { name: 'Carrot', category: 'Vegetable' },
    ];
    component.queryItems = mockQueryItems;
    component.queryByPropNames = ['name'];
    const val = 'ap';
    component.handleInputChange(val);
    fixture.detectChanges()
    expect(component.onSearch.emit).toHaveBeenCalledWith([mockQueryItems[0]]);
  });
  
  it('should not emit onSearch event when handleInputChange is called with empty input', () => {
    spyOn(component.onSearch, 'emit');
    component.handleInputChange('');
    fixture.detectChanges();
    expect(component.onSearch.emit).not.toHaveBeenCalled();
  });
});
