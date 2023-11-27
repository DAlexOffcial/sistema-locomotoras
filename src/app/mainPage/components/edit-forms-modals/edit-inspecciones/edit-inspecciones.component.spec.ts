import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInspeccionesComponent } from './edit-inspecciones.component';

describe('EditInspeccionesComponent', () => {
  let component: EditInspeccionesComponent;
  let fixture: ComponentFixture<EditInspeccionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInspeccionesComponent]
    });
    fixture = TestBed.createComponent(EditInspeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
