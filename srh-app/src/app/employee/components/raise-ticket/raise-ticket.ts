import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RaiseTicketDTO } from '../../models/ticket.model';
import { EmployeeTicketService } from '../../services/employee-ticket';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-raise-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [EmployeeTicketService],
  templateUrl: './raise-ticket.html',
  styleUrls: ['./raise-ticket.css']
})
export class RaiseTicket {
  ticket: RaiseTicketDTO = {
    title: '',
    description: '',
    employeeId: 0
  };

  message: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  constructor(private ticketService: EmployeeTicketService, private router: Router) {}

  raiseTicket() {
    console.log("Raise ticket triggered", this.ticket);

    if (!this.ticket.title.trim() || !this.ticket.description.trim() || this.ticket.employeeId <= 0) {
      this.errorMsg = "All fields are required and employee ID must be valid.";
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMsg = '';

    this.ticketService.raiseTicket(this.ticket).subscribe({
      next: (res: { message: any }) => {
        this.loading = false;
        this.message = res.message || "Ticket raised successfully.";

        // Redirect to home after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err: any) => {
        this.loading = false;
        console.error("Error while raising ticket:", err);

        if (err.status === 500) {
          this.errorMsg = "Server error: Please ensure the Employee ID exists.";
        } else if (err.status === 404) {
          this.errorMsg = "API not found. Check proxy config or backend server.";
        } else {
          this.errorMsg = "Failed to raise ticket. Try again.";
        }
      }
    });
  }
}
