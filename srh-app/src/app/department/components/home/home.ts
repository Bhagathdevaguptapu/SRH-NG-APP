import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']  // fix: it should be styleUrls (plural)
})
export class DeptHome implements OnInit {
  departmentId: number = 1; // Default department

  tickets: Ticket[] = [];
  totalTickets: number = 0;
  openTickets: number = 0;
  closedTickets: number = 0;

  loading: boolean = false;
  errorMsg: string = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.fetchTickets(); // Load default department stats on init
  }

  fetchTickets(): void {
    if (!this.departmentId || this.departmentId <= 0) {
      this.errorMsg = 'Please select a valid department.';
      this.resetCounts();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.ticketService.getTickets(this.departmentId).subscribe({
      next: (res) => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          this.tickets = res.data;
          this.totalTickets = this.tickets.length;
          this.closedTickets = this.tickets.filter(
            ticket => ticket.status?.toLowerCase() === 'closed'
          ).length;
          this.openTickets = this.totalTickets - this.closedTickets;
        } else {
          this.errorMsg = res.message || 'No tickets found.';
          this.resetCounts();
        }
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error fetching tickets. Please try again.';
        this.resetCounts();
        this.loading = false;
      }
    });
  }

  resetCounts(): void {
    this.tickets = [];
    this.totalTickets = 0;
    this.openTickets = 0;
    this.closedTickets = 0;
  }
}
