import { Pipe, PipeTransform } from '@angular/core';
import { SortType } from '../constants/sort-type';
import { IATHeading } from '../interfaces/at-config';
import { ISorting } from '../interfaces/sorting';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(tableDataArr: any[], searchTerm: string = '', headings: IATHeading[] = [], sorting: ISorting = null): any[] {
    tableDataArr = tableDataArr || [];
    if (!searchTerm || (searchTerm && !headings)) {
      return this.sortData(tableDataArr, sorting);
    }
    const keys = headings.map(heading => heading.key);
    let matchingArr = tableDataArr.filter(row => {
      return keys.find(key => {
        const query = searchTerm.toLowerCase();
        return row[key] && row[key].toLowerCase().includes(query);
      })
    })
    return this.sortData(matchingArr, sorting);
  }

  sortData(data: any[], sorting: ISorting): any[] {
    if (!sorting || sorting.sortType === SortType.None) {
      return data;
    }
    const { sortType, column } = sorting;
    return [...data].sort((a, b) => {
      if (sortType === SortType.ASC) {
        return a[column] < b[column] ? -1 : 1;
      } else if (sortType === SortType.DESC) {
        return b[column] < a[column] ? -1 : 1;
      }
    })
  }

}
