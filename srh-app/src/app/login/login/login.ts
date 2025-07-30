import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../department/models/login.model'; 
import { LoginService } from '../../department/services/login-service'; 
import { Home } from '../../department/components/home/home'; 

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
    role: 'department' // default to department
  };

  errorMsg: string = '';

  constructor(private loginservice: LoginService, private router: Router) {}

  onSubmit() {
    this.loginservice.login(this.loginData).subscribe({
      next: (response: any) => {
        // Adjust if response is nested (console.log to confirm structure)
        if (response?.status === 'success') {
          this.router.navigate(['home']); // Navigate to home
        } else {
          this.errorMsg = response.message || 'Invalid login.';
        }
      },
      error: (err) => {
        this.errorMsg = 'Login failed. Please try again.';
      }
    });
  }

  resetForm() {
    this.loginData = { email: '', password: '', role: 'department' };
    this.errorMsg = '';
  }
}
