import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMantenedoresComponent } from './edit-mantenedores.component';

describe('EditMantenedoresComponent', () => {
  let component: EditMantenedoresComponent;
  let fixture: ComponentFixture<EditMantenedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMantenedoresComponent]
    });
    fixture = TestBed.createComponent(EditMantenedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
