import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      console.error('Backend returned status code:', error.status);
      console.error('Response body:', error.message);
    } else {
      // Client Error Happend
      console.error('An error occurred:', error.message);
    }

    // Navigate to error page
    router.navigate(['/error']);

    // Log the error to the console
    console.error('Error:', error);
  }
}