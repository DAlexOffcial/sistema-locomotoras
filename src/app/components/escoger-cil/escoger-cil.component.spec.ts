import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerCilComponent } from './escoger-cil.component';

describe('EscogerCilComponent', () => {
  let component: EscogerCilComponent;
  let fixture: ComponentFixture<EscogerCilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EscogerCilComponent]
    });
    fixture = TestBed.createComponent(EscogerCilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
