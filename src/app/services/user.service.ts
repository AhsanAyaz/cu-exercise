import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, timer } from 'rxjs';
import { catchError, delayWhen, map, retry, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { httpRetryStrategy } from '../classes/http-retry-strategy';
import { ITableUser, IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ITableUser[]> {
    return this.http.get<{results: IUser[]}>('https://randomuser.me/api?results=100')
      .pipe(
        retryWhen(httpRetryStrategy()),
        map(res => res.results.map(user => ({
          first: user.name.first,
          last: user.name.last,
          email: user.email
        }))),
        catchError((err) => {
          throw err;
        }),
        shareReplay()
      )
  }
}
