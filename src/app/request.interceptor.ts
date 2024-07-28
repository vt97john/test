import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST') {
      const modifiedReq = req.clone({
        headers: new HttpHeaders({ token: '-----fkjdflgjsdlfghsd;fgsdlkfjsldfn;dasbnf' })
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}