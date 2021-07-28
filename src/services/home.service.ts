import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

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
}
