import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCliComponent } from './catalogo-cli.component';

describe('CatalogoCliComponent', () => {
  let component: CatalogoCliComponent;
  let fixture: ComponentFixture<CatalogoCliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoCliComponent]
    });
    fixture = TestBed.createComponent(CatalogoCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
