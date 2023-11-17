import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMainPageComponent } from './tabla-main-page.component';

describe('TablaMainPageComponent', () => {
  let component: TablaMainPageComponent;
  let fixture: ComponentFixture<TablaMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaMainPageComponent]
    });
    fixture = TestBed.createComponent(TablaMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
