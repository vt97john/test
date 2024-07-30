import { TestBed } from '@angular/core/testing';
import { CanDeactivate } from '@angular/router';
import { BookingGuard, CanComponentDeactivate } from './booking.guard'; // Import the BookingGuard class
import { Component } from '@angular/core';

// Mock component to test CanDeactivate guard
@Component({
  template: ''
})
class MockComponent implements CanComponentDeactivate {
  bookingForm: any;
  injector: any;
}

describe('BookingGuard', () => {
  let guard: BookingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      providers: [BookingGuard]
    });
    guard = TestBed.inject(BookingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Add more tests here to check the behavior of the guard
  it('should allow deactivation', () => {
    const component = new MockComponent();
    const result = guard.canDeactivate(component);
    expect(result).toBe(true); // Adjust based on actual guard logic
  });
});