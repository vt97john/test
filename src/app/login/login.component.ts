import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'Login';
  email = '';
  password = '';

constructor(private router: Router, private loginService: LoginService) {}

  login() {
    if (this.loginService.login(this.email, this.password)) {
      this.router.navigate(['rooms']);
    }
  }
}
