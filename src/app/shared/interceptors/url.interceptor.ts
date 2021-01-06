import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiReq = req.clone({
      url: `${environment.apiUrl}/${req.url}`,
      headers: req.headers.set('content_type', 'application/json')
    });
    return next.handle(apiReq);
  }
}
