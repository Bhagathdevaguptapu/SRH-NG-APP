import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeTicketService } from '../../services/employee-ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [EmployeeTicketService],
  templateUrl: './cancel-ticket.html',
  styleUrls: ['./cancel-ticket.css']
})
export class CancelTicket {
  ticketId: number = 0;
  message: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  constructor(private ticketService: EmployeeTicketService, private router: Router) {}

  cancelTicket() {
    if (!this.ticketId || this.ticketId <= 0) {
      this.errorMsg = "Please enter a valid Ticket ID.";
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.message = '';

    this.ticketService.cancelTicket(this.ticketId).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = res.message || "Ticket cancelled successfully.";

        // Delay redirect to home
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err: any) => {
        this.loading = false;
        console.error("Error cancelling ticket:", err);

        if (err.status === 500) {
          this.errorMsg = "Server error. Ticket may not exist.";
        } else if (err.status === 404) {
          this.errorMsg = "API not found or invalid ticket ID.";
        } else {
          this.errorMsg = "Failed to cancel ticket.";
        }
      }
    });
  }
}
