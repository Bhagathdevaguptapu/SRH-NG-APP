
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../models/login.model';
import { LoginService } from '../service/login-service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginData: LoginRequest = {
    email: '',
    password: '',
    role: '' as any
  };

  errorMsg: string = '';

  constructor(private loginservice: LoginService, private router: Router) {}

  onSubmit() {
    this.loginservice.login(this.loginData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          if (this.loginData.role === 'admin') {
            this.router.navigate(['admin-home']);
          } else if (this.loginData.role === 'employee') {
            this.router.navigate(['home']);
          } else if (this.loginData.role === 'department') {
            this.router.navigate(['/department/dashboard']);
          }
        } else {
          this.errorMsg = response.message;
        }
      },
      error: (err) => {
        this.errorMsg = 'Login failed. Please try again.';
      }
    });
  }

  resetForm() {
    this.loginData = { email: '', password: '', role: '' as any };
    this.errorMsg = '';
  }
}
