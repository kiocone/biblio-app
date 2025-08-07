import { Injectable } from '@angular/core';
import { IBook } from './book.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) {
  }

  getBooks(params: HttpParams): Observable<HttpResponse<IBook[]>> {
    return this.http.get<IBook[]>(
      `${environment.apiUrl}/books`,
      { 
        headers: this.httpHeaders,
        params: params,
        observe: 'response'
      }
    );
  }

  getBookById(id: number): IBook | undefined {
    return undefined; // This method should be implemented to fetch a book by its ID
  }
}
