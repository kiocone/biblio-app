import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserCredentials } from '../types/user-credentials.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {

  loginError$: Observable<boolean>;

  @Output() cancelLogin = new EventEmitter<void>();

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) { this.loginError$ = this.authService.loginError; }

  login() {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      const userCredentials: IUserCredentials = {
        userName: username,
        password: password
      };

      this.authService.login(userCredentials);
    }
  }

  cancel() {
    this.cancelLogin.emit();
  }
}