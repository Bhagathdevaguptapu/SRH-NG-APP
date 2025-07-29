import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateStatusDTO } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-status-update',
  imports: [FormsModule,CommonModule],
  templateUrl: './ticket-status-update.html',
  styleUrl: './ticket-status-update.css'
})
export class TicketStatusUpdate {
  ticketId: number | null = null;
  newStatus: string = '';
  isError = false;
  errorMsg = '';
  successMsg = '';
  loading = false;

  statusOptions = [
    'RAISED',
    'ASSIGNED',
    'STARTED',
    'IN_PROGRESS',
    'ISSUE_RESOLVED',
    'CLOSED',
    'CANCELLED'
  ];

  constructor(private ticketService: TicketService) {}

  updateStatus(): void {
    this.isError = false;
    this.successMsg = '';

    if (!this.ticketId || !this.newStatus) {
      this.isError = true;
      this.errorMsg = 'Please enter valid Ticket ID and select a Status.';
      return;
    }

    this.loading = true;

    const payload: UpdateStatusDTO = {
      ticketId: this.ticketId,
      status: this.newStatus
    };

    this.ticketService.updateTicketStatus(payload).subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.status === 'success') {
          this.successMsg = resp.message;
          this.ticketId = null;
          this.newStatus = '';
        } else {
          this.isError = true;
          this.errorMsg = resp.message || 'Failed to update status.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.isError = true;
        this.errorMsg = 'Server error occurred while updating status.';
        console.error(err);
      }
    });
  }
}
