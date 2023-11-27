import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCilComponent } from './edit-cil.component';

describe('EditCilComponent', () => {
  let component: EditCilComponent;
  let fixture: ComponentFixture<EditCilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCilComponent]
    });
    fixture = TestBed.createComponent(EditCilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
