import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from 'src/app/core/services/search.service';
import { Book } from 'src/app/core/models/book-response.model';
import { debounceTime, filter } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TableViewComponent } from 'src/app/shared/table-view/table-view.component';


@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  showSearchResult: boolean = false;
  errorMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private tableView: TableViewComponent) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  isLoading: boolean = false;

  subjectName: string = '';

  allBooks: Book[] = [];

  totalResults: number = 0;


  ngOnInit(): void {

    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).subscribe((value: string) => {
        this.bookSearch.setValue(value)
      });
  }

  clearSearch() {
    this.bookSearch.setValue("");
    this.showSearchResult = false;
  }

  loadNew(paginatorPage: any) {

    let page = 1;
    let offset = (paginatorPage - 1) * 10;
    page = (this.totalResults / 100) > 1 ? (offset / 100) > 1 ? Math.floor(offset / 100) : 1 : 1;
    this.getSearchResults(offset, page);
  }

  getSearchResults(offset: number, page: number) {

    this.isLoading = true;
    this.showSearchResult = true;

    this.searchService.searchBook(this.bookSearch.value, offset, page)
      .pipe(
        catchError(error => {
          this.errorMessage = 'An error occurred while fetching search results. Please try again later.';
          this.isLoading = false;
          this.allBooks = []; // Clear the existing search results if an error occurs
          return []; // Return an empty array as fallback option
        })
      )
      .subscribe((data) => {
        this.processSearchResults(data);
        this.isLoading = false;
      });

  }

  private processSearchResults(data: any) {
    this.allBooks = data.docs;
    this.totalResults = data.numFound;
  }
}
