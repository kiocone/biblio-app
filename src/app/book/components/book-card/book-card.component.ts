import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IBook } from "../../book.interface";

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  standalone: true
})
export class BookCardComponent {
  @Input() book: IBook | undefined;
  @Output() selectBook = new EventEmitter<string | undefined>();

  constructor() {}

  onSelectBook(bookId: string | undefined): void {
    this.selectBook.emit(bookId);
  }
}
