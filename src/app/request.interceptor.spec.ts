import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { RequestInterceptor } from './request.interceptor';

describe('RequestInterceptor', () => {
  let interceptor: RequestInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestInterceptor]
    });

    interceptor = TestBed.inject(RequestInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept and handle the request', () => {
    const httpRequest = new HttpRequest('GET', '/test');
    const httpHandler: HttpHandler = {
      handle: (req: HttpRequest<any>) => of({} as HttpEvent<any>)
    };

    interceptor.intercept(httpRequest, httpHandler).subscribe(event => {
      expect(event).toBeTruthy();
    });
  });
});