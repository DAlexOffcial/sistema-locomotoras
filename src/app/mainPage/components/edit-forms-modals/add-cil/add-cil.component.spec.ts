import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCilComponent } from './add-cil.component';

describe('AddCilComponent', () => {
  let component: AddCilComponent;
  let fixture: ComponentFixture<AddCilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCilComponent]
    });
    fixture = TestBed.createComponent(AddCilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
