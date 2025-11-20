import { ChangeDetectorRef, Component, OnChanges } from '@angular/core';
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
export class App implements OnChanges {
  protected title = 'biblio-app';
  searchTerm: string = '';
  bookDetailView: boolean = false;
  selectedBook: string | undefined;
  isLoggedIn$: Observable<boolean>;
  showLogin: boolean = false;
  pageIndex: number = 0;
  pageSize!: number;

  // Observable to get the user information from localStorage
  user$: Observable<IUserLoggedIn | null>;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.user$ = this.authService.user;
  }

  ngOnChanges(): void {
    console.log('App component changes detected');
    this.cdr.detectChanges()
  }

  onSearch(event: string): void {
    console.log('Search event received in App component:', event);
    this.searchTerm = event;
    this.cdr.detectChanges()
  }

  onSelectBook(bookId: string | undefined): void {
    console.log('Book selected in App component:', bookId);
    this.bookDetailView = true;
    this.selectedBook = bookId;
    this.scrollToTop();
    this.cdr.detectChanges()
  }

  onMainViewClick(): void {
    console.log('Main view clicked in App component');
    this.bookDetailView = false;
    this.selectedBook = undefined;
    this.cdr.detectChanges()
  }

  scrollToTop(): void {
    console.log('Scrolling to top');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.cdr.detectChanges()
  }

  loadNextPage(): void {
    console.log('Loading next page');
    this.pageIndex += 1;
    const pageHeight = document.documentElement.scrollHeight;
    window.setTimeout(() => {
      window.scrollTo({ top: pageHeight, behavior: 'smooth' });
    }, 600);
    this.cdr.detectChanges()
  }

  login() {
    console.log('Login initiated');
    this.showLogin = true;
    this.cdr.detectChanges()
  }

  logout() {
    console.log('Logout initiated');
    this.showLogin = false;
    this.authService.logout();
    this.cdr.detectChanges()
  }
}