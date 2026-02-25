import { Component, EventEmitter, inject, input, Input, OnChanges, OnInit, Output, resource, signal, SimpleChanges } from '@angular/core';
import { BookService } from './book.service';
import { IBook } from './book.interface';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FinderComponent } from './components/finder/finder.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-book',
  template: `
  <div style="display: flex; flex-direction: column;">
    <finder
      class="book-finder"
      [showBackButton]="showBackButton"
      (searchEvent)="onSearch($event)"
      (backEvent)="onBackClick()"
    />
    @if (loading()) {
      <div class="no-book">Cargando libros...</div>
    } @else {
      <div class="app-book">
        @for (book of bookList; track book) {
          <div class="book-card" (click)="onSelectBook(book.id)">
            <img [src]="book.coverImageUrl" alt="{{ book.title }}" class="book-image" />
            <div class="book-details">
              <h3>{{ book.title }}</h3>
              <p><strong>Autor:</strong> {{ book.author }}</p>
              <p><strong>Año:</strong> {{ book.publishedYear }}</p>
              <p><strong>Editorial:</strong> {{ book.editorial }}</p>
            </div>
          </div>
        }
      </div>
    }
  </div>
  @if (!booksResource.value() && !loading()) {
    <div class="no-book">No se encontraron coincidencias.</div>
  }
  `,
  styles: `
    .book-card {
      display: flex;
      flex-direction: column;
      max-width: 300px;
      min-height: 342px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 16px;
      align-items: center;
      box-shadow: 4px 6px 1px rgba(0, 0, 0, 0.15);

      .book-image {
        max-height: 190px;
        margin-bottom: 16px;
        max-width: 287px;
      }

      .book-details {
        text-align: center;
        flex-grow: 1;

        h3 {
          margin: 0 0 8px;
        }

        p {
          margin: 4px 0;
        }
      }
    }
    .book-card {
      background-color: #fff;
      margin-bottom: auto;
      width: 334px;
    }
    .no-book{
      width: 100%;
      text-align: center;
      font-size: larger;
    }

    .book-finder {
      display: flex;
      margin: 0.5rem 10px !important;
      @media screen and (max-width: 450px) {
        margin: 0.5rem 0px !important;
      } 
    }
    .app-book {
      display: grid;
      width: auto;
      margin: 0.5rem 10px !important;
      padding-bottom: 36px;


      @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        gap: 18px;

        .book-card {
          width: 345px;
        }
      }


      @media (max-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 15px;

        .book-card {
          width: 345px;
        }
      }

      @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 15px;

        .book-card {
          width: 345px;
        }
      }
      @media (max-width: 500px) {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(4, 1fr);
        gap: 10px;
        align-items: center;
        
        .book-card {
          width: 300px;
        }
      }
    }
  `,
  imports: [
    FinderComponent
  ],
  standalone: true
})
export class BookComponent implements OnInit, OnChanges {

  bookList: IBook[] = [];

  bookService = inject(BookService);
  router = inject(Router);

  @Input() findBook: string = '';
  pageIndex = input<number>();
  @Output() selectBook = new EventEmitter<string | undefined>();

  showBackButton: boolean = false;
  selectedBook: boolean = false;
  loading = signal(false);

  httpParams = signal(new HttpParams());

  booksResource = resource({
    loader: () => { 
      this.loading.set(true);
      const url = new URL(`${environment.apiUrl}/books`);
      this.httpParams().keys().forEach(key => {
        url.searchParams.set(key, this.httpParams().get(key) || '');
      });
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.loading.set(false);
        return response.json();
      })
      .then(data => {
        this.bookList = [...this.bookList, ...data];
        return this.bookList;
      })}
  });

  ngOnInit() {
    if (!!this.pageIndex) {
      this.httpParams.update(params => params.set('pageIndex', String(this.pageIndex())));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageIndex'] && changes['pageIndex'].currentValue !== changes['pageIndex'].previousValue) {
      this.httpParams.update(params => params.set('pageIndex', String(this.pageIndex())));
      this.booksResource.reload();
    }
  }

  onSelectBook(bookInfo: string | undefined): void {
    this.router.navigate(['/book', bookInfo]);
  }

  onSearch(event: string): void {
    if (event) {
      this.httpParams.set(new HttpParams().set('search', event));
      this.selectedBook = true;
      this.showBackButton = true;
      this.bookList = [];
      this.booksResource.reload();
    }
  }

  onBackClick(): void {
    this.httpParams.set(new HttpParams().set('pageIndex', '0'));
    this.showBackButton = false;
    this.selectedBook = false;
    this.bookList = [];
    this.booksResource.reload();
  }
}