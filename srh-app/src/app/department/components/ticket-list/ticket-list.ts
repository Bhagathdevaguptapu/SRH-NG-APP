import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket'; 
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList{
 departmentId: number | null = null;
  tickets: any[] = [];
  isError: boolean = false;
  errorMsg: string = '';
  loading: boolean = false;

  constructor(private ticketService: TicketService) {}

  fetchTickets() {
    if (!this.departmentId) {
      this.isError = true;
      this.errorMsg = 'Please enter a valid Department ID';
      this.tickets = [];
      return;
    }

    this.isError = false;
    this.loading = true;
    this.tickets = [];

    this.ticketService.getTickets(this.departmentId).subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.status === 'success') {
          this.tickets = resp.data;
        } else {
          this.isError = true;
          this.errorMsg = resp.message;
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
