import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookComponent } from './book/book';
import { FinderComponent } from './book/components/finder/finder.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BookComponent,
    FinderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'biblio-app';
  searchTerm: string = '';

  onSearch(event: string): void {
    this.searchTerm = event;
  }

  onSelectBook(bookId: number | undefined): void {
    console.log(`Selected book ID: ${bookId}`);
  }
}
