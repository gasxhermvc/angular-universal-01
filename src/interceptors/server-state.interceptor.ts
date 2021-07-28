import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import * as memoryCache from 'memory-cache';
import { of } from 'rxjs';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState, private ngZone: NgZone) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('server state', req.url);
    const cachedData = memoryCache.get(req.url);
    if (cachedData) {
      console.log('has cache');
      this.transferState.set(makeStateKey(req.url), cachedData);
      return of(new HttpResponse({ body: cachedData, status: 200 }));
    }

    return next.handle(req).pipe(
      tap((event) => {
        console.log('event...');
        if (
          event instanceof HttpResponse &&
          (event.status === 200 || event.status === 202)
        ) {
          this.transferState.set(makeStateKey(req.url), event.body);
          this.ngZone.runOutsideAngular(() => {
            memoryCache.put(req.url, event.body, 6000 * 5);
          });
        }
      })
    );
  }
}
