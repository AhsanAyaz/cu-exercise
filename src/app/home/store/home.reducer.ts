import { Action, createReducer, on } from '@ngrx/store';
import { IUser } from '../../interfaces/user.interface';
import * as HomeActions from './home.actions';

export interface HomeState {
  users: IUser[];
  loadingUsers: boolean;
}

export const initialState: HomeState = {
  users: null,
  loadingUsers: null
};

const homeReducer = createReducer(
  initialState,
  on(HomeActions.getUsers, state => ({ ...state, users: null, loadingUsers: true })),
  on(HomeActions.getUsersSuccess, (state, { users }) => ({ ...state, users, loadingUsers: false })),
  on(HomeActions.getUsersFailure, state => ({ ...state, users: null, loadingUsers: false })),
);

export function reducer(state: HomeState | undefined, action: Action) {
  return homeReducer(state, action);
}
