import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoAccionesComponent } from './catalogo-acciones.component';

describe('CatalogoAccionesComponent', () => {
  let component: CatalogoAccionesComponent;
  let fixture: ComponentFixture<CatalogoAccionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoAccionesComponent]
    });
    fixture = TestBed.createComponent(CatalogoAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
