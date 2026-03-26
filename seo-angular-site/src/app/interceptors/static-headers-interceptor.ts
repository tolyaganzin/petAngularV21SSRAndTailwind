import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PUBLIC_PATHES } from '../utils/public-apis-pathes';

export const staticHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.staticHeaders?.length || PUBLIC_PATHES.some(path => req.url.endsWith(path))
  ) {
    return next(req);
  }

  let headers = req.headers;
  for (const { key, value } of environment.staticHeaders) {
    headers = headers.set(key, value);
  }

  return next(req.clone({ headers }));
};
