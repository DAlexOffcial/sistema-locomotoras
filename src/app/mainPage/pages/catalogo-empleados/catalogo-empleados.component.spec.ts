import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEmpleadosComponent } from './catalogo-empleados.component';

describe('CatalogoEmpleadosComponent', () => {
  let component: CatalogoEmpleadosComponent;
  let fixture: ComponentFixture<CatalogoEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoEmpleadosComponent]
    });
    fixture = TestBed.createComponent(CatalogoEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
