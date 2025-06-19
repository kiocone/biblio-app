import { Component, OnInit } from '@angular/core';
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
  
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookList = this.bookService.getBooks();
  }

}
