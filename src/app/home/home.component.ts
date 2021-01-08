import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';
import { IAwesomeTableConfig } from '../awesome-table/interfaces/at-config';
import { IUser } from '../interfaces/user.interface';
import { HOME_TABLE_CONSTANTS } from './constants/home-table-constants';
import { getUsers } from './store/home.actions';
import { HomeState } from './store/home.reducer';
import { AppState, selectLoadingUsers, selectUsers } from './store/home.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  loadingUsers$: Observable<boolean>;
  componentIsAlive = false;
  tableConfig: IAwesomeTableConfig = null;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.componentIsAlive = true;
    this.users$ = this.store.select(selectUsers);
    this.loadingUsers$ = this.store.select(selectLoadingUsers);
    this.store.dispatch(getUsers());
    this.users$.pipe(
      takeWhile(() => this.componentIsAlive),
      filter(
        users => users !== null
      )
    ).subscribe((users) => {
      this.tableConfig = {
        headings: HOME_TABLE_CONSTANTS.HEADINGS,
        data: users,
        tableClasses: 'table-striped',
        sortingColumns: ['first', 'last', 'email']
      }
    })
  }

  ngOnDestroy() {
    this.componentIsAlive = false;
  }

}
