import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalMainPageComponent } from './edit-modal-main-page.component';

describe('EditModalMainPageComponent', () => {
  let component: EditModalMainPageComponent;
  let fixture: ComponentFixture<EditModalMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditModalMainPageComponent]
    });
    fixture = TestBed.createComponent(EditModalMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
