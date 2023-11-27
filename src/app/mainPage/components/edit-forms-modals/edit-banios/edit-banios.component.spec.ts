import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBaniosComponent } from './edit-banios.component';

describe('EditBaniosComponent', () => {
  let component: EditBaniosComponent;
  let fixture: ComponentFixture<EditBaniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBaniosComponent]
    });
    fixture = TestBed.createComponent(EditBaniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
