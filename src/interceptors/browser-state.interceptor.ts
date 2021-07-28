import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import * as memoryCache from 'memory-cache';

@Injectable({
  providedIn: 'root',
})
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('browser-state');

    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedData = memoryCache.get(req.url);
    if (cachedData) {
      console.log('has cache');
      this.transferState.set(makeStateKey(req.url), cachedData);
      return of(new HttpResponse({ body: cachedData, status: 200 }));
    }

    const storedResponse: void | null = this.transferState.get(
      makeStateKey(req.url),
      null
    );

    if (storedResponse) {
      const response = new HttpResponse({ body: storedResponse, status: 200 });
      return of(response);
    }

    return next.handle(req);

    // if (req.method === 'GET') {
    //   const key = makeStateKey(req.url);
    //   const storedResponse: any = this.transferState.get(key, null);
    //   console.log('cache store', storedResponse);
    //   if (storedResponse) {
    //     const response = new HttpResponse({
    //       body: storedResponse,
    //       status: 200,
    //     });
    //     return of(response);
    //   }
    // }

    // return next.handle(req);
  }
}
