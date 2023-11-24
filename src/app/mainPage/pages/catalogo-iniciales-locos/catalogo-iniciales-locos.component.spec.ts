import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoInicialesLocosComponent } from './catalogo-iniciales-locos.component';

describe('CatalogoInicialesLocosComponent', () => {
  let component: CatalogoInicialesLocosComponent;
  let fixture: ComponentFixture<CatalogoInicialesLocosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoInicialesLocosComponent]
    });
    fixture = TestBed.createComponent(CatalogoInicialesLocosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
