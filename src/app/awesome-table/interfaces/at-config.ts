export interface IATHeading {
  key: string;
  label: string;
}

export interface IAwesomeTableConfig {
  headings: IATHeading[];
  data: any[];
  tableClasses?: string;
  searchEnabled?: boolean;
  searchInputPlaceholder?: string;
  sortingColumns?: string[]
}
