import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) { }

  searchBook(searchKey: string, offset: number, page: number): Observable<BookResponse> {
    const limit = 10; 
    return this.apiService.get(`/search.json?q=${searchKey.toLowerCase().split(' ').join('+')}&page=${page}&limit=${limit}&offset=${offset}`);
    
  }
}
