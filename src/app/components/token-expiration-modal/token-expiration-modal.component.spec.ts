import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenExpirationModalComponent } from './token-expiration-modal.component';

describe('TokenExpirationModalComponent', () => {
  let component: TokenExpirationModalComponent;
  let fixture: ComponentFixture<TokenExpirationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenExpirationModalComponent]
    });
    fixture = TestBed.createComponent(TokenExpirationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
