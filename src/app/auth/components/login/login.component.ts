import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserCredentials } from '../types/user-credentials.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) { }

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
}