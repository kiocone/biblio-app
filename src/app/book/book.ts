import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Output() selectBook = new EventEmitter<number>();

  httpParams = new HttpParams()
    .set('pageSize', this.pageSize.toString());

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.populateBooks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['findBook']) {
      this.filterBooks();
    }
  }

  private filterBooks(): void {
    // get property names of the IBook interface with string type
    const IBookProperties: (keyof IBook)[] = ['title', 'author', 'genre', 'description', 'editorial']; // Explicitly define as keys of IBook

    if (this.findBook) {
      this.bookList = this.bookList.filter(book =>
        book.title.toLowerCase().includes(this.findBook.toLowerCase()) ||
        book.author!.toLowerCase().includes(this.findBook.toLowerCase()) ||
        book.publishedYear!.toString().includes(this.findBook) ||
        book.genre!.toLowerCase().includes(this.findBook.toLowerCase()) ||
        book.description!.toLowerCase().includes(this.findBook.toLowerCase()) ||
        book.editorial!.toLowerCase().includes(this.findBook.toLowerCase())
      );
    } else {
      this.populateBooks();
    }
  }

  onSelectBook(bookId: number | undefined): void {
    this.selectBook.emit(bookId);
  }

  populateBooks(): void {
    this.bookService.getBooks(this.httpParams).subscribe(books => {
      this.bookList.push(...(books.body || []));
    });
  }
}