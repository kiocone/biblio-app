import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { BookService } from "../../book.service";
import { IBook } from "../../book.interface";

@Component({
  selector: 'book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnChanges {

  @Input() book: string | undefined;

  bookDetail!: IBook | undefined;

  constructor( private bookService: BookService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.bookService.getBookById(this.book as string).subscribe({
      next: (response) => {
        console.log('Book detail response:', response.body);
        if (response.body) {
          this.bookDetail = response.body;
        };
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching book details:', error);
        this.bookDetail = undefined;
        this.cdr.detectChanges()
      }
    });
  }
}