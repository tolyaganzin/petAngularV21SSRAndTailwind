import { HttpInterceptorFn } from '@angular/common/http';
import { PUBLIC_PATHES } from '../utils/public-apis-pathes';

// Replace this with your actual token retrieval logic
function getBearerToken(): string | null {
  return localStorage.getItem('access_token');
}

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (PUBLIC_PATHES.some((path: string) => req.url.endsWith(path))) {
    return next(req);
  }

  const token = getBearerToken();
  if (!token) {
    return next(req);
  }

  const headers = req.headers.set('Authorization', `${token}`);
  return next(req.clone({ headers }));
};