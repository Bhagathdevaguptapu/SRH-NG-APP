import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeTicketService } from '../../services/employee-ticket';
import { Ticket } from '../../models/ticket.model';

type TicketWithExpand = Ticket & { expanded?: boolean };

@Component({
  selector: 'app-view-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-tickets.html',
  styleUrls: ['./view-tickets.css']
})
export class ViewTicketsComponent {
  employeeId: number | null = null;
  tickets: TicketWithExpand[] = [];

  errorMsg: string = '';
  loading: boolean = false;

  constructor(
    private service: EmployeeTicketService,
    private router: Router
  ) {}

  viewTickets() {
    this.errorMsg = '';
    this.tickets = [];

    if (!this.employeeId) {
      this.errorMsg = 'Please enter a valid Employee ID';
      return;
    }

    this.loading = true;

    this.service.viewTickets(this.employeeId).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.status === 'success' && res.data && res.data.tickets) {
          this.tickets = res.data.tickets.map((t: Ticket) => ({
            ...t,
            expanded: false
          }));
        } else {
          this.errorMsg = res.message || 'No tickets found.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Server error while fetching tickets.';
        console.error(err);
      }
    });
  }

  toggleDetails(ticket: TicketWithExpand) {
    ticket.expanded = !ticket.expanded;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
