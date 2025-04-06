import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IExceptionResponse } from '../models/exception-response.model';

@Injectable({
  providedIn: 'root',
})
// EXPORT
export class HttpErrorService {
  public handleError(error: HttpErrorResponse): Observable<never> {
    let exceptionResponse: IExceptionResponse = {
      businessErrorDescription: 'An unknown error occurred.',
      businessErrorCode: error.status,
    };

    console.info(error);

    if (error.status === 0) {
      // Client-side error
      exceptionResponse.businessErrorDescription =
        'A client-side error occurred. Please check your internet connection.';
    } else if (error.error) {
      // Server-side error, assuming the server returns a structured error object
      exceptionResponse = {
        businessErrorCode: error.status,
        businessErrorDescription:
          error.error.businessErrorDescription ||
          'A server-side error occurred.',
        error: error.error.error,
        validationErrors: error.error.validationErrors,
        errors: error.error.errors,
      };
    }

    // Log the error for debugging purposes
    console.error('HTTP Error:', exceptionResponse);

    // Throw the error as an observable
    return throwError(() => exceptionResponse);
  }
}
