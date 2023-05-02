import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})

export class TableViewComponent {

  //pagination
  p: number = 1;
  tableSize: number = 10

  @Input() booksList: Book[] = [];
  @Input() subjectName: string = '';
  @Input() showSearchResult: boolean = false;
  @Input() totalResults: number = 0;

  @Output() paginatorPage = new EventEmitter<number>();

  pageChanged(event: any): void {
    this.p = event;
    this.paginatorPage.emit(this.p);
  }
}
