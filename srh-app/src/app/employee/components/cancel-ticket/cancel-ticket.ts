import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { EmployeeTicketService } from '../../services/employee-ticket';

@Component({
  selector: 'app-cancel-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cancel-ticket.html',
  styleUrls: ['./cancel-ticket.css'],
  providers: [EmployeeTicketService]
})
export class CancelTicket implements OnInit {
  tickets: Ticket[] = [];
  employeeId: number = 0;
  errorMsg: string = '';
  message: string = '';
  loading: boolean = false;

  constructor(
    private ticketService: EmployeeTicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeId');
    if (empId) {
      this.employeeId = +empId;
      this.fetchTickets(this.employeeId);
    } else {
      this.errorMsg = 'Employee not logged in.';
    }
  }

  fetchTickets(empId: number): void {
    this.ticketService.viewTickets(empId).subscribe({
      next: (res: any) => {
        if (res.status === 'success' && Array.isArray(res.data?.tickets)) {
          // Filter non-cancelled tickets (case-insensitive)
          this.tickets = res.data.tickets.filter(
            (ticket: any) => ticket.status?.toLowerCase() !== 'cancelled'
          );
          this.errorMsg = '';
        } else {
          this.tickets = [];
          this.errorMsg = 'No tickets found for the given employee.';
        }
      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
        this.errorMsg = 'Failed to fetch tickets. Please try again later.';
      }
    });
  }

  cancel(ticketId: number): void {
    if (confirm('Are you sure you want to cancel this ticket?')) {
      this.loading = true;
      this.ticketService.cancelTicket(ticketId).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res.status === 'success') {
            this.message = 'Ticket cancelled successfully.';
            this.errorMsg = '';
            this.fetchTickets(this.employeeId); // Refresh list
          } else {
            this.errorMsg = res.message || 'Failed to cancel ticket.';
            this.message = '';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Error cancelling ticket:', err);
          this.errorMsg = 'An error occurred while cancelling the ticket.';
          this.message = '';
        }
      });
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}