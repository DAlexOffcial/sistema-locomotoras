import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmpleadosComponent } from './edit-empleados.component';

describe('EditEmpleadosComponent', () => {
  let component: EditEmpleadosComponent;
  let fixture: ComponentFixture<EditEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmpleadosComponent]
    });
    fixture = TestBed.createComponent(EditEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
