import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BookService } from './book.service';
import { IBook } from './book.interface';
import { BookCardComponent } from './components/book-card/book-card.component';

@Component({
  selector: 'app-book',
  imports: [BookCardComponent],
  templateUrl: './book.html',
  styleUrl: './book.scss'
})
export class BookComponent implements OnInit {

  bookList: IBook[] = [];

  @Input() findBook: string = '';
  @Output() selectBook = new EventEmitter<number>();

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookList = this.bookService.getBooks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['findBook']) {
      this.filterBooks();
    }
  }

  private filterBooks(): void {
    if (this.findBook) {
      this.bookList = this.bookList.filter(book =>
        book.title.toLowerCase().includes(this.findBook.toLowerCase()) ||
        book.author!.toLowerCase().includes(this.findBook.toLowerCase()) ||
        book.publishedYear!.toString().includes(this.findBook) ||
        book.genre!.toLowerCase().includes(this.findBook.toLowerCase()) ||
        book.description!.toLowerCase().includes(this.findBook.toLowerCase())
      );
    } else {
      this.bookList = this.bookService.getBooks();
    }
  }

  onSelectBook(bookId: number | undefined): void {
    this.selectBook.emit(bookId);
  }
}