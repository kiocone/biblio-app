import { Component, EventEmitter, input, Output } from "@angular/core";
import { IBook } from "../../book.interface";

@Component({
  selector: 'book-card',
  template: `
  @if (displayBook) {
    <div class="book-card" (click)="onSelectBook(displayBook.id)">
      <img [src]="displayBook.coverImageUrl" alt="{{ displayBook.title }}" class="book-image" />
      <div class="book-details">
        <h3>{{ displayBook.title }}</h3>
        <p><strong>Autor:</strong> {{ displayBook.author }}</p>
        <p><strong>Año:</strong> {{ displayBook.publishedYear }}</p>
        <p><strong>Editorial:</strong> {{ displayBook.editorial }}</p>
      </div>
    </div>
  } 
  @else {
    <h3>No hay información del libro</h3>
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
  `,
  standalone: true
})
export class BookCardComponent {
  book = input<IBook | undefined>();
  @Output() selectBook = new EventEmitter<string | undefined>();

  displayBook!: IBook | undefined;

  ngOnInit(): void {
  
    if (this.book) {
      this.displayBook = this.book();
    }
  }
  
  onSelectBook(bookId: string | undefined): void {
    this.selectBook.emit(bookId);
  }
}
