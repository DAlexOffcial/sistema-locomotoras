import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEmpleadosComponent } from './password-empleados.component';

describe('PasswordEmpleadosComponent', () => {
  let component: PasswordEmpleadosComponent;
  let fixture: ComponentFixture<PasswordEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordEmpleadosComponent]
    });
    fixture = TestBed.createComponent(PasswordEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
