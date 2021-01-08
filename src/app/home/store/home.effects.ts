import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { getUsersFailure, getUsersSuccess, HOME_ACTIONS } from './home.actions';

@Injectable()
export class UserEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HOME_ACTIONS.GET_USERS),
      mergeMap(() =>
        this.userService.getUsers()
      ),
      map(
        (users) => getUsersSuccess({ users }),
      ),
      catchError((e) => of(getUsersFailure({ error: e.message })))
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
