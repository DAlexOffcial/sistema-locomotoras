import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoLocomotorasComponent } from './catalogo-locomotoras.component';

describe('CatalogoLocomotorasComponent', () => {
  let component: CatalogoLocomotorasComponent;
  let fixture: ComponentFixture<CatalogoLocomotorasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoLocomotorasComponent]
    });
    fixture = TestBed.createComponent(CatalogoLocomotorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
