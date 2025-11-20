import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BookService } from './book.service';
import { IBook } from './book.interface';
import { BookCardComponent } from './components/book-card/book-card.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-book',
  imports: [BookCardComponent],
  templateUrl: './book.html',
  styleUrl: './book.scss'
})
export class BookComponent implements OnInit {

  bookList: IBook[] = [];

  @Input() findBook: string = '';
  @Input() pageSize: number = 0;
  private _pageIndex: number = 0;
  @Input()
  set pageIndex(value: number) {
    if (typeof value !== 'number' ) {
      this._pageIndex = 0;
      this.updateBooksOnPageChange();
    } else if (this._pageIndex !== value) {
      this._pageIndex = value;
      this.updateBooksOnPageChange();
    }
  }
  get pageIndex(): number {
    return this._pageIndex;
  }

  private updateBooksOnPageChange(): void {
    this.httpParams = this.httpParams.set('pageIndex', this.pageIndex.toString());
    this.populateBooks();
  }
  @Output() selectBook = new EventEmitter<string | undefined>();

  httpParams = new HttpParams()
    .set('pageSize', this.pageSize.toString());

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.populateBooks();
    this.cdr.detectChanges()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['findBook']) {
      this.filterBooks();
    }
    this.cdr.detectChanges()
  }

  private filterBooks(): void {
    if (this.findBook) {
    this.httpParams = new HttpParams().set('search', this.findBook);
      this.bookService.getBooks(this.httpParams).subscribe({
        next: response => {
          if (!response.body) return;
          this.bookList = response.body;
        }
      });
    } else {
      this.populateBooks();
    }
    this.cdr.detectChanges()
  }

  onSelectBook(bookInfo: string | undefined): void {
    this.selectBook.emit(bookInfo);
    this.cdr.detectChanges()
  }

  populateBooks(): void {
    this.bookService.getBooks(this.httpParams).subscribe(books => {
      if (!books.body) return;
      for (const book of books.body) {
        const randomNum = Math.floor(Math.random() * 9) + 1;
        book.coverImageUrl = book.coverImageUrl == null ? `/assets/portada${randomNum}.png` : book.coverImageUrl;
      }
      this.bookList.push(...books.body);
    });
    this.cdr.detectChanges()
  }
}