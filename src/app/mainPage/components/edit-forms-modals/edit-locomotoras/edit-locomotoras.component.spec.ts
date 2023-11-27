import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocomotorasComponent } from './edit-locomotoras.component';

describe('EditLocomotorasComponent', () => {
  let component: EditLocomotorasComponent;
  let fixture: ComponentFixture<EditLocomotorasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLocomotorasComponent]
    });
    fixture = TestBed.createComponent(EditLocomotorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
