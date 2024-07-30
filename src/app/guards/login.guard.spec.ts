import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard]
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Add more tests here to check the behavior of the guard
});