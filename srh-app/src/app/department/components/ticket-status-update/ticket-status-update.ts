import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateStatusDTO } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-status-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-status-update.html',
  styleUrls: ['./ticket-status-update.css']
})
export class TicketStatusUpdate {
  selectedDepartmentId: number | null = null;
  ticketId: number | null = null;
  newStatus: string = '';
  departmentTickets: any[] = [];
  selectedTicket: any | null = null;
  isError = false;
  errorMsg = '';
  successMsg = '';
  loading = false;

  statusOptions = ['ASSIGNED', 'IN_PROGRESS', 'ISSUE_RESOLVED', 'CLOSED'];

  constructor(private ticketService: TicketService) {}

  fetchDepartmentTickets(): void {
    this.ticketId = null;
    this.selectedTicket = null;
    this.departmentTickets = [];
    this.successMsg = '';
    this.errorMsg = '';
    this.isError = false;

    if (!this.selectedDepartmentId) {
      this.isError = true;
      this.errorMsg = 'Please select a valid department.';
      return;
    }

    this.loading = true;
    console.log('Fetching tickets for department:', this.selectedDepartmentId);

    this.ticketService.getTickets(this.selectedDepartmentId).subscribe({
      next: (resp) => {
        this.loading = false;
        console.log('Tickets response:', resp);
        if (resp.status === 'success') {
          this.departmentTickets = resp.data;
          if (!this.departmentTickets.length) {
            this.isError = true;
            this.errorMsg = 'No tickets found for the selected department.';
          }
        } else {
          this.isError = true;
          this.errorMsg = resp.message || 'Failed to fetch tickets.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.isError = true;
        this.errorMsg = 'Server error occurred while fetching tickets.';
        console.error(err);
      }
    });
  }

  onTicketSelect() {
    this.selectedTicket = this.departmentTickets.find(t => t.ticketId === this.ticketId) || null;
    this.successMsg = '';
    this.errorMsg = '';
  }

  updateStatus(): void {
    this.isError = false;
    this.successMsg = '';

    if (!this.ticketId || !this.newStatus) {
      this.isError = true;
      this.errorMsg = 'Please select both a ticket and a status.';
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
          this.selectedTicket = null;
          this.departmentTickets = [];
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
