import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SpinnerService } from '../shared/services/spinner.service';

@Injectable()
export class GiphyApiInterceptor implements HttpInterceptor {
  private readonly apiKey = environment.giphyApiKey;

  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.apiKey) {
      this.spinnerService.show();
      req = req.clone({
        setParams: {
          api_key: this.apiKey,
        },
      });
    }
    return next.handle(req).pipe(
      finalize(() => {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 500);
      })
    );
  }
}
