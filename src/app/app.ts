import { Component } from '@angular/core';
import { BookComponent } from './book/book';
import { FinderComponent } from './book/components/finder/finder.component';
import { BookDetailComponent } from './book/components/book-detail/book-detail.component';

@Component({
  selector: 'app-root',
  imports: [
    BookComponent,
    FinderComponent,
    BookDetailComponent,
    // TODO: crear componente para el footer responsive
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'biblio-app';
  searchTerm: string = '';
  bookDetailView: boolean = false;
  selectedBook: number | undefined;

  onSearch(event: string): void {
    this.searchTerm = event;
  }

  onSelectBook(bookId: number | undefined): void {
    if ( typeof bookId === 'number' && bookId > 0 ) {
      this.selectedBook = bookId;
      this.bookDetailView = true;
    }
  }

  onMainViewClick(): void {
    this.selectedBook = undefined;
    this.bookDetailView = false;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
