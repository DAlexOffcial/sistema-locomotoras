import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccionesComponent } from './edit-acciones.component';

describe('EditAccionesComponent', () => {
  let component: EditAccionesComponent;
  let fixture: ComponentFixture<EditAccionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAccionesComponent]
    });
    fixture = TestBed.createComponent(EditAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
