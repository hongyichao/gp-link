import { HttpInterceptor, HttpRequest, HttpEventType, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next) {
      console.log('request is sent');
      console.log(this.authService.IdToken);
      const modifiedRequest = request.clone({headers: request.headers.append('Authorization', this.authService.IdToken)});

      return next.handle(modifiedRequest).pipe(tap(event => {
        if (event instanceof HttpResponse) {
           console.log(event);
         }
      }));
   }
}
