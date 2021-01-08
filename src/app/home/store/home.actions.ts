import { createAction, props } from '@ngrx/store';
import { ITableUser, IUser } from 'src/app/interfaces/user.interface';
const PREFIX = '[Home Page]';

export const HOME_ACTIONS = {
  GET_USERS: `${PREFIX} Get Users`,
  GET_USERS_SUCCESS: `${PREFIX} Get Users Success`,
  GET_USERS_FAILURE: `${PREFIX} Get Users Failure`,
}


export const getUsers = createAction(
  HOME_ACTIONS.GET_USERS
);

export const getUsersSuccess = createAction(
  HOME_ACTIONS.GET_USERS_SUCCESS,
  props<{ users: ITableUser[]; }>()
);

export const getUsersFailure = createAction(
  HOME_ACTIONS.GET_USERS_FAILURE,
  props<{ error: string; }>()
);
