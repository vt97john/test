import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
  bookingForm: {
    pristine: boolean;
  };
  injector: {
    get: (token: any) => any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BookingGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private snackBar: MatSnackBar) {}

  canDeactivate(component: CanComponentDeactivate): boolean {
    if (component.bookingForm.pristine) {
      return true;
    } else {
      this.snackBar.open('You have unsaved changes. Do you want to continue?', 'Yes', { duration: 5000 });
      return false;
    }
  }
}