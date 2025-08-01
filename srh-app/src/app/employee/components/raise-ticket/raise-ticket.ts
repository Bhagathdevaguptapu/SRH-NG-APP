import { Component, OnInit } from '@angular/core';
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
export class RaiseTicket implements OnInit {
  ticket: RaiseTicketDTO = {
    title: '',
    description: '',
    employeeId: 0
  };

  message: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  constructor(private ticketService: EmployeeTicketService, private router: Router) {}

  ngOnInit(): void {
    const empIdStr = localStorage.getItem('employeeId');
    if (empIdStr) {
      this.ticket.employeeId = parseInt(empIdStr, 10);
    } else {
      this.errorMsg = 'Employee ID not found. Please login again.';
    }
  }

  raiseTicket() {
    console.log("Raise ticket triggered", this.ticket);

    if (!this.ticket.title.trim() || !this.ticket.description.trim()) {
      this.errorMsg = "Title and description are required.";
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMsg = '';

    this.ticketService.raiseTicket(this.ticket).subscribe({
      next: (res: { message: any }) => {
        this.loading = false;
        this.message = res.message || "Ticket raised successfully.";
        setTimeout(() => this.router.navigate(['home']), 2000);
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

  goToHome() {
    this.router.navigate(['home']);
  }
}