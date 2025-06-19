import { Component, Input } from "@angular/core";
import { IBook } from "../../book.interface";

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  standalone: true
})
export class BookCardComponent {
  @Input() book: IBook | undefined;
}
