import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { BookService } from "../../book.service";
import { IBook } from "../../book.interface";

@Component({
  selector: 'book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit, OnChanges {

  @Input() book: number | undefined;

  bookDetail!: IBook | undefined;

  constructor( private bookService: BookService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (typeof this.book === 'number') {
      this.bookDetail = this.bookService.getBookById(this.book);
    }
  }

  ngOnChanges(): void {
    if (typeof this.book === 'number') {
      this.bookDetail = this.bookService.getBookById(this.book);
    }
  }

}