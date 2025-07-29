import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';
import { CancelTicketRequest } from '../../models/admin.model';

@Component({
  selector: 'app-cancel-ticket',
  imports: [FormsModule,CommonModule],
  templateUrl: './cancel-ticket.html',
  styleUrl: './cancel-ticket.css'
})
export class CancelTicket {
   ticketId: number | null = null;
  cancelReason: string = '';

  message: string = '';
  isError: boolean = false;
  loading: boolean = false;

  constructor(private adminService: AdminService) {}

  cancel() {
    if (!this.ticketId || !this.cancelReason.trim()) {
      this.isError = true;
      this.message = 'Both Ticket ID and Cancel Reason are required.';
      return;
    }

    this.loading = true;
    this.isError = false;
    this.message = '';

    const request: CancelTicketRequest = {
      ticketId: this.ticketId,
      cancelReason: this.cancelReason
    };

    this.adminService.cancelTicket(request).subscribe({
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
      }
    });
  }

}
