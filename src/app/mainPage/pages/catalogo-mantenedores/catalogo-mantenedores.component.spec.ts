import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoMantenedoresComponent } from './catalogo-mantenedores.component';

describe('CatalogoMantenedoresComponent', () => {
  let component: CatalogoMantenedoresComponent;
  let fixture: ComponentFixture<CatalogoMantenedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoMantenedoresComponent]
    });
    fixture = TestBed.createComponent(CatalogoMantenedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
