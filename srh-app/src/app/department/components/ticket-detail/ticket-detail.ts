import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetail {
  departmentId: number | null = null;
  tickets: Ticket[] = [];
  errorMsg: string = '';
  successMsg: string = '';
  loading: boolean = false;

  constructor(private ticketService: TicketService) {}

  fetchTickets() {
    this.successMsg = '';
    this.errorMsg = '';
    if (!this.departmentId) {
      this.errorMsg = 'Please enter a valid Department ID';
      return;
    }

    this.loading = true;
    this.ticketService.getTickets(this.departmentId).subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.status === 'success') {
          this.tickets = resp.data;
        } else {
          this.errorMsg = resp.message;
          this.tickets = [];
        }
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Failed to fetch tickets.';
      }
    });
  }

  acceptTicket(ticketId: number) {
    this.successMsg = '';
    this.errorMsg = '';
    this.ticketService.acceptTicket(ticketId).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          this.successMsg = resp.message;
          this.fetchTickets(); // Refresh tickets
        } else {
          this.errorMsg = resp.message;
        }
      },
      error: () => {
        this.errorMsg = 'Error while accepting ticket.';
      }
    });
  }

  closeTicket(ticketId: number) {
    this.successMsg = '';
    this.errorMsg = '';
    const reason = prompt('Enter reason for closing the ticket:');
    if (!reason) return;

    this.ticketService.closeTicket({ ticketId, reason }).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          this.successMsg = resp.message;
          this.fetchTickets(); // Refresh tickets
        } else {
          this.errorMsg = resp.message;
        }
      },
      error: () => {
        this.errorMsg = 'Error while closing ticket.';
      }
    });
  }
}