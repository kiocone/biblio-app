import { Component, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { LoginComponent } from './auth/components/login/login.component';
import { ToastComponent } from './utils/components/toast/toast.component';
import { IUserLoggedIn } from './auth/components/types/user-info.interface';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    LoginComponent,
    ToastComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'biblio-app';

  router = inject(Router);

  isLoggedIn$: Observable<boolean>;
  showLogin: boolean = false;
  pageIndex: number = 1;

  // Observable to get the user information from localStorage
  user$: Observable<IUserLoggedIn | null>;

  constructor(
    private authService: AuthService,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.user$ = this.authService.user;
  }

  scrollToTop(): void {
    console.log('Scrolling to top');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadNextPage(): void {
    this.pageIndex++;
    this.router.navigate(['pageIndex', this.pageIndex]);
    const pageHeight = document.documentElement.scrollHeight;
    window.setTimeout(() => {
      window.scrollTo({ top: pageHeight, behavior: 'smooth' });
    }, 600);
  }

  login() {
    console.log('Login initiated');
    this.showLogin = true;
  }

  logout() {
    console.log('Logout initiated');
    this.showLogin = false;
    this.authService.logout();
  }
}