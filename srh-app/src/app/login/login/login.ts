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

  modalVisible = false; // modal visibility state

  loginData: LoginRequest = {
    email: '',
    password: '',
    role: 'department' 
  };

  errorMsg: string = '';

  constructor(private loginservice: LoginService, private router: Router) {}

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  onSubmit() {
    this.errorMsg = '';
    this.loginservice.login(this.loginData).subscribe({
      next: (response: any) => {
        if (response?.status === 'success') {
          // Role-based navigation and storage logic
          if (this.loginData.role === 'employee') {
            const empId = response.id; // Adjust based on your backend response structure
            if (empId) {
              localStorage.setItem('employeeId', empId.toString());
              this.router.navigate(['home']);
              this.closeModal();
            } else {
              this.errorMsg = 'Employee ID not found.';
            }
          } else if (this.loginData.role === 'admin') {
            this.router.navigate(['admin-home']);
            this.closeModal();
          } else if (this.loginData.role === 'department') {
            this.router.navigate(['dept-home']);
            this.closeModal();
          } else {
            this.errorMsg = 'Invalid role.';
          }
        } else {
          this.errorMsg = response.message || 'Invalid login.';
        }
      },
      error: () => {
        this.errorMsg = 'Login failed. Please try again.';
      }
    });
  }

  resetForm() {
    this.loginData = { email: '', password: '', role: 'department' };
    this.errorMsg = '';
  }
}