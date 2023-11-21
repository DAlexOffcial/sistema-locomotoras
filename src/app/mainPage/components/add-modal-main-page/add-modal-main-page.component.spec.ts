import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalMainPageComponent } from './add-modal-main-page.component';

describe('AddModalMainPageComponent', () => {
  let component: AddModalMainPageComponent;
  let fixture: ComponentFixture<AddModalMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddModalMainPageComponent]
    });
    fixture = TestBed.createComponent(AddModalMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
