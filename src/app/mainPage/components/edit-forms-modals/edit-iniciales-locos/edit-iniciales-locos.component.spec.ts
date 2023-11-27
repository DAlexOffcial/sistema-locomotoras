import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInicialesLocosComponent } from './edit-iniciales-locos.component';

describe('EditInicialesLocosComponent', () => {
  let component: EditInicialesLocosComponent;
  let fixture: ComponentFixture<EditInicialesLocosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInicialesLocosComponent]
    });
    fixture = TestBed.createComponent(EditInicialesLocosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
