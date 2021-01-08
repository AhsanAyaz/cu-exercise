import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import DEFAULT_AT_CONFIG from '../../constants/defaultATConfig';
import { SortType } from '../../constants/sort-type';
import { IAwesomeTableConfig } from '../../interfaces/at-config';
import { ISorting } from '../../interfaces/sorting';
import { FilterTablePipe } from '../../pipes/filter-table.pipe';

@Component({
  selector: 'at-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() atConfig: IAwesomeTableConfig;
  tableForm = new FormGroup({
    searchTerm: new FormControl('', [])
  })
  filteredTableItems = [];
  isComponentAlive = false;
  filterTablePipe = new FilterTablePipe();
  sortableColumns = {};
  sortType = SortType;
  constructor() {}

  ngOnInit(): void {
    this.isComponentAlive = true;
    this.atConfig = this.atConfig ? {
      ...DEFAULT_AT_CONFIG,
      ...this.atConfig,
    } : {
      ...DEFAULT_AT_CONFIG
    }
    this.filterItems(this.atConfig.data, null, this.atConfig.headings);
    this.handleSearchQuery();
    this.configureSorting();
  }

  ngOnDestroy() {
    this.isComponentAlive = false;
  }

  getCurrentSortedColumn(): ISorting {
    const column = Object.keys(this.sortableColumns).find(key => this.sortableColumns[key] !== SortType.None);
    return {
      column,
      sortType: this.sortableColumns[column]
    }
  }

  configureSorting(config:IAwesomeTableConfig = this.atConfig) {
    if (!config.sortingColumns || !config.sortingColumns.length) {
      return;
    }
    config.sortingColumns.map(column => {
      this.sortableColumns[column] = SortType.None;
    })
  }

  sortByColumn(column: string) {
    if (this.sortableColumns[column] === undefined) {
      return;
    }
    let sortType = this.sortableColumns[column];
    switch (sortType) {
      case SortType.None:
        sortType = SortType.ASC;
        break;
      case SortType.ASC:
        sortType = SortType.DESC;
        break;
      case SortType.DESC:
        sortType = SortType.None;
      break;
    }
    for (let key in this.sortableColumns) {
      this.sortableColumns[key] = key === column ? sortType : SortType.None;
    }
    const searchTerm = this.tableForm.get('searchTerm').value;
    this.filterItems(this.atConfig.data, searchTerm, this.atConfig.headings, {
      column,
      sortType
    });
  }

  handleSearchQuery() {
    this.tableForm.get('searchTerm').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        const sorting: ISorting = this.getCurrentSortedColumn();
        this.filterItems(this.atConfig.data, searchTerm, this.atConfig.headings, sorting);
      })
  }

  filterItems(dataArr, searchTerm, headings, sorting: ISorting = null) {
    this.filteredTableItems = [...this.filterTablePipe.transform(dataArr, searchTerm, headings, sorting)]
  }

  dropItem(event: CdkDragDrop<string[]>) {
    const array = [...this.atConfig.headings];
    moveItemInArray(
      array,
      event.previousIndex,
      event.currentIndex
    );
    this.atConfig.headings = [...array];
  }
}
