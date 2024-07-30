import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';
import { RoomsGuard } from './rooms.guard';

describe('RoomsGuard', () => {
  let guard: RoomsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomsGuard]
    });
    guard = TestBed.inject(RoomsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Add more tests here to check the behavior of the guard
});