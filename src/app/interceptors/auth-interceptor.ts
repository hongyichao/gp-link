import { HttpInterceptor, HttpRequest, HttpEventType, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';


export class AuthInterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next) {
      console.log('request is sent');


      const modifiedRequest = request.clone({headers: request.headers.append('Auth', 'xyz')});

      modifiedRequest.headers.append('Access-Control-Allow-Origin', '*');
      return next.handle(modifiedRequest).pipe(tap(event => {

        console.log('XD:' + event);

        if (event instanceof HttpResponse) {
           console.log('Again!! ' + event);
         }

      }));
   }
}
