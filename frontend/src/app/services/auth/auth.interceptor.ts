import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request
    let access_token = localStorage.getItem('access_token');
    if (access_token) {
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${access_token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error?.message) {
          this.alertService.alertError(`${error.error.message}`)
        }
        return throwError(error);
      }
      )
    )
  }
}
