import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
   @Input() ticketId: number | null | undefined  = null;
  cancelReason = '';

  message = '';
  isError = false;
  loading = false;

  constructor(private adminService: AdminService) {}

  cancel() {
    if (!this.ticketId || !this.cancelReason.trim()) {
      this.isError = true;
      this.message = 'Cancel reason is required.';
      return;
    }

    this.loading = true;
    this.message = '';
    this.isError = false;

    const request: CancelTicketRequest = {
      ticketId: this.ticketId,
      cancelReason: this.cancelReason,
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
      },
    });
  }

}
