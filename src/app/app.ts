import { Component } from '@angular/core';
import { BookComponent } from './book/book';
import { FinderComponent } from './book/components/finder/finder.component';
import { BookDetailComponent } from './book/components/book-detail/book-detail.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BookComponent,
    FinderComponent,
    BookDetailComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'biblio-app';
  searchTerm: string = '';
  bookDetailView: boolean = false;
  selectedBook: number | undefined;
  isLoggedIn$: Observable<boolean>;
  currentUrl: string | undefined;

  constructor(
    private authService: AuthService,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

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

  logout() {
    this.authService.logout();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}