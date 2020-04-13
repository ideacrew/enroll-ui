import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<{}>,
    next: HttpHandler
  ): Observable<HttpEvent<{}>> {
    if (this.authService) {
      const authReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.authService.token}`
        ),
      });

      return next.handle(authReq);

      // .pipe(
      //   catchError((error: Error) => {
      //     if (
      //       error instanceof HttpErrorResponse &&
      //       // tslint:disable-next-line:no-magic-numbers
      //       ((error as HttpErrorResponse).status === 401 ||
      //         // tslint:disable-next-line:no-magic-numbers
      //         (error as HttpErrorResponse).status === 403)
      //     ) {
      //       this.authService.logout();
      //     }

      //     return throwError(error);
      //   }),
      // )
    }

    return next.handle(req);

    // .pipe(
    //   catchError((error: Error) => {
    //     if (
    //       error instanceof HttpErrorResponse &&
    //       // tslint:disable-next-line:no-magic-numbers
    //       ((error as HttpErrorResponse).status === 401 ||
    //         // tslint:disable-next-line:no-magic-numbers
    //         (error as HttpErrorResponse).status === 403)
    //     ) {
    //       this.authService.logout();
    //     }

    //     return throwError(error);
    //   }),
    // );
  }
}

export const authInterceptorInit = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};
