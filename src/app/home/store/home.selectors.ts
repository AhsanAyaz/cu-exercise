import { createSelector } from '@ngrx/store';
import { IUser } from 'src/app/interfaces/user.interface';
import { HomeState } from './home.reducer';


export interface AppState {
  home: HomeState;
}

export const selectHome = (state: AppState) => state.home;

export const selectUsers = createSelector(
  selectHome,
  (state: HomeState): IUser[] => state.users
);

export const selectLoadingUsers = createSelector(
  selectHome,
  (state: HomeState): boolean => state.loadingUsers
);
