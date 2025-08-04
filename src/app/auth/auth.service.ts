import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
  ) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(credentials: { userName: string; password: string }) {
    console.log('environment.apiUrl:', environment.apiUrl)
    this.http.post<HttpResponse<any>>(
      `${environment.apiUrl}/users/login`,
      {
        credentials
      }).subscribe({
        next: (response) => {
          console.log('Login successful:', response.status);
          this.loggedIn.next(true);
        },
        error: (error) => {
          if (error.status === 401) {
            console.error('Invalid credentials');
          } else {
            console.error('An error occurred during login:', error.message);
          }
        }
      });
  }

  logout() {
    this.loggedIn.next(false);
  }
}