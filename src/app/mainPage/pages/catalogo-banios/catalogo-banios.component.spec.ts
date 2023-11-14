import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoBaniosComponent } from './catalogo-banios.component';

describe('CatalogoBaniosComponent', () => {
  let component: CatalogoBaniosComponent;
  let fixture: ComponentFixture<CatalogoBaniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoBaniosComponent]
    });
    fixture = TestBed.createComponent(CatalogoBaniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
