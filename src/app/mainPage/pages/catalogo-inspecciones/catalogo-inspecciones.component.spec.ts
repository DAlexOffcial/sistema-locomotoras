import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoInspeccionesComponent } from './catalogo-inspecciones.component';

describe('CatalogoInspeccionesComponent', () => {
  let component: CatalogoInspeccionesComponent;
  let fixture: ComponentFixture<CatalogoInspeccionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoInspeccionesComponent]
    });
    fixture = TestBed.createComponent(CatalogoInspeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
