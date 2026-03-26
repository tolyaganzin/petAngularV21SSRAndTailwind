import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HTTP_MESSAGE_OPTIONS } from '../utils/errors-list';

// import { inject } from '@angular/core';
// import { MessageService } from 'primeng/api';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  
  // const messageService = inject(MessageService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string = HTTP_MESSAGE_OPTIONS.SomethingWentWrong;

      if (error.error?.header && error.error?.message && error.error?.level) {
        // prime ng framework message service example
        // messageService.add({ severity: error.error.level.toLowerCase(), summary: error.error.header, detail: error.error.message });
      }
      
      if (error.status === 0) {
        message = HTTP_MESSAGE_OPTIONS.ServerUnreachable;
      } else if (error.status === 400) {
        message = HTTP_MESSAGE_OPTIONS.BadRequest;
      } else if (error.status === 401) {
        message = HTTP_MESSAGE_OPTIONS.Unauthorized;
      } else if (error.status === 403) {
        message = HTTP_MESSAGE_OPTIONS.Forbidden;
      } else if (error.status === 404) {
        message = HTTP_MESSAGE_OPTIONS.NotFound;
      } else if (error.status === 429) {
        message = HTTP_MESSAGE_OPTIONS.TooManyRequests;
      } else if (error.status === 500) {
        message = HTTP_MESSAGE_OPTIONS.InternalServerError;
      } else if (error.status === 501) {
        message = HTTP_MESSAGE_OPTIONS.NotImplemented;
      } else if (error.status === 502) {
        message = HTTP_MESSAGE_OPTIONS.BadGateway;
      } else if (error.status === 503) {
        message = HTTP_MESSAGE_OPTIONS.ServiceUnavailable;
      } else if (error.status === 504) {
        message = HTTP_MESSAGE_OPTIONS.GatewayTimeout;
      }

      // Optionally, log or display the error message here
      return throwError(() => ({ ...error, friendlyMessage: message }));
    })
  );
};
