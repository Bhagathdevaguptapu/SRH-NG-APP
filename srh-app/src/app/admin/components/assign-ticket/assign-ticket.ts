import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';
import { AssignTicketRequest } from '../../models/admin.model';

@Component({
  selector: 'app-assign-ticket',
  imports: [FormsModule, CommonModule],
  templateUrl: './assign-ticket.html',
  styleUrl: './assign-ticket.css'
})
export class AssignTicket {
  @Input() ticketId: number | null | undefined = null;
  departmentId: number | null = null;

  message = '';
  isError = false;
  loading = false;

  constructor(private adminService: AdminService) { }

  assign() {
    if (!this.ticketId || !this.departmentId) {
      this.isError = true;
      this.message = 'Department ID is required.';
      return;
    }

    this.loading = true;
    this.message = '';
    this.isError = false;

    const request: AssignTicketRequest = {
      ticketId: this.ticketId,
      departmentId: this.departmentId,
    };

    this.adminService.assignTicket(request).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = res.message;
        this.isError = res.status !== 'success';
      },
      error: (err) => {
        this.loading = false;
        this.message = 'Server error occurred';
        this.isError = true;
        console.error(err);
      },
    });
  }
}
