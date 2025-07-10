import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login() {
    // Aquí iría la lógica de autenticación real
    this.loggedIn.next(true);
    this.router.navigate(['/']);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}