import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PUBLIC_PATHES } from '../utils/public-apis-pathes';
// import { SsoService } from '../services/api/sso';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (PUBLIC_PATHES.some((path: string) => req.url.endsWith(path))) {
    return next(req);
  }
  
  const router = inject(Router);
  // const ssoService = inject(SsoService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // ssoService.setAuthToken('');
        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );
};
