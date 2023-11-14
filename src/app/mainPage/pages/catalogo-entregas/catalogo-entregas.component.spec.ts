import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEntregasComponent } from './catalogo-entregas.component';

describe('CatalogoEntregasComponent', () => {
  let component: CatalogoEntregasComponent;
  let fixture: ComponentFixture<CatalogoEntregasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoEntregasComponent]
    });
    fixture = TestBed.createComponent(CatalogoEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
