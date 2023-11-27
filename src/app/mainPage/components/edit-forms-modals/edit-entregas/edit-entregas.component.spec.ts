import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntregasComponent } from './edit-entregas.component';

describe('EditEntregasComponent', () => {
  let component: EditEntregasComponent;
  let fixture: ComponentFixture<EditEntregasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEntregasComponent]
    });
    fixture = TestBed.createComponent(EditEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
