import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UmService {
  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private transferState: TransferState
  ) {}

  getRole() {
    return [
      {
        CODE: 1,
        DESCR: 'admin',
      },
      {
        CODE: 2,
        DESCR: 'staff',
      },
      {
        CODE: 3,
        DESCR: 'user',
      },
    ];
  }

  getUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getPosts(): Observable<any> {
    const storedResponse: any = this.transferState.get(
      'https://jsonplaceholder.typicode.com/posts' as any,
      null
    );

    if (storedResponse) {
      console.log('getPosts');
      return of(storedResponse);
    }
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getTopPosts(top: number = 10): Observable<any> {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${top}`
    );
  }
}
