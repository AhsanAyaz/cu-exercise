import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { FilterTablePipe } from './pipes/filter-table.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableComponent, FilterTablePipe],
  imports: [CommonModule, ScrollingModule, DragDropModule, ReactiveFormsModule, MatIconModule],
  exports: [TableComponent],
})
export class AwesomeTableModule {}
