import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeDTO } from '../../models/admin.model';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-all-employee-tickets',
  imports: [FormsModule,CommonModule],
  templateUrl: './all-employee-tickets.html',
  styleUrl: './all-employee-tickets.css'
})
export class AllEmployeeTickets {

  employees: EmployeeDTO[] = [];
  loading = false;
  isError = false;
  errorMsg = '';

  constructor(private adminService: AdminService) {}

  fetchAllEmployeeTickets(): void {
    this.loading = true;
    this.isError = false;
    this.employees = [];

    this.adminService.getAllEmployeeTickets().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 'success' && res.data?.length > 0) {
          this.employees = res.data;
        } else {
          this.isError = true;
          this.errorMsg = res.message || 'No employee tickets found.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.isError = true;
        this.errorMsg = 'Server error occurred';
        console.error(err);
      }
    });
  }
}
