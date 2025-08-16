import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAuthResponse, IUserLoggedIn } from './components/types/user-info.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private loggedIn = new BehaviorSubject<boolean>(false);
  private userInfo = new BehaviorSubject<IUserLoggedIn | null>(null);
  private loginErr = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
  ) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get user() {
    return this.userInfo.asObservable();
  }

  get loginError() {
    return this.loginErr.asObservable();
  }

  login(credentials: { userName: string; password: string }) {

    this.http.post<IAuthResponse>(
      `${environment.apiUrl}/users/login`,
      credentials,
      {
        headers: this.httpHeaders,
        observe: 'response'
      }).subscribe({
        next: (response) => {
          console.log('Login successful:', response.status);
          this.loggedIn.next(true);
          // Store token or user info
          if (response.body && response.body.authUser) {
            localStorage.setItem('user', JSON.stringify(response.body.authUser));
            localStorage.setItem('token', JSON.stringify(response.body.token));
            this.userInfo.next(response.body.authUser);
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.loginErr.next(true);
            console.error('Invalid credentials');
          } else {
            this.loginErr.next(true);
            console.error('An error occurred during login:', error.message);
          }
          this.loggedIn.next(false);
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.userInfo.next(null);
  }

}