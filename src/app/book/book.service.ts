import { inject, Injectable } from '@angular/core';
import { IBook } from './book.interface';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient);

  httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  lastParams: string = '';

  getBooks(params?: HttpParams) {
    return this.http.get<IBook[]>(
      `${environment.apiUrl}/books`,
      { 
        headers: this.httpHeaders,
        params: params,
        observe: 'response'
      }
    ).pipe(
      tap(response => {
        setTimeout(() => {
          console.log('Books fetched');
        }, 300);
      })
    );
  }

  getBookById(id: string) {
    return this.http.get<IBook>(
      `${environment.apiUrl}/books/${id}`,
      { 
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  }
}
