import { Component } from '@angular/core';
import { BookComponent } from './book/book';
import { FinderComponent } from './book/components/finder/finder.component';
import { BookDetailComponent } from './book/components/book-detail/book-detail.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { LoginComponent } from './auth/components/login/login.component';
import { ToastComponent } from './utils/components/toast/toast.component';
import { IUserLoggedIn } from './auth/components/types/user-info.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BookComponent,
    LoginComponent,
    ToastComponent,
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
  showLogin: boolean = false;
  pageIndex: number = 0;
  pageSize!: number;

  // Observable to get the user information from localStorage
  user$: Observable<IUserLoggedIn | null>;

  constructor(
    private authService: AuthService,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.user$ = this.authService.user;
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

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadNextPage(): void {
    this.pageIndex += 1;
    const pageHeight = document.documentElement.scrollHeight;
    window.setTimeout(() => {
      window.scrollTo({ top: pageHeight, behavior: 'smooth' });
    }, 500);
  }

  login() {
    this.showLogin = true;
  }

  logout() {
    this.showLogin = false;
    this.authService.logout();
  }

}