import { Component } from '@angular/core';
import { EmployeeDTO } from '../../models/admin.model';
import { AdminService } from '../../services/admin-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-ticket-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './employee-ticket-list.html',
  styleUrl: './employee-ticket-list.css'
})
export class EmployeeTicketList {
  employeeId!: number;
  employee?: EmployeeDTO;
  loading = false;
  isError = false;
  errorMsg = '';

  constructor(private adminService: AdminService) {}

  fetchEmployeeTickets() {
    if (!this.employeeId) {
      this.isError = true;
      this.errorMsg = 'Please enter a valid employee ID';
      return;
    }

    this.loading = true;
    this.isError = false;
    this.employee = undefined;

    this.adminService.getEmployeeTicketsById(this.employeeId).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 'success' && res.data) {
          this.employee = res.data;
        } else {
          this.isError = true;
          this.errorMsg = res.message || 'Employee not found or no tickets.';
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
