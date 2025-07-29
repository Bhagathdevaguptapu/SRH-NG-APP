import { Component } from '@angular/core';
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

  constructor(private ticketService: EmployeeTicketService) {}

 raiseTicket() {
  console.log("Raise ticket triggered", this.ticket);

  if (!this.ticket.title.trim() || !this.ticket.description.trim() || this.ticket.employeeId <= 0) {
    alert("All fields are required and employee ID must be valid.");
    return;
  }

  this.ticketService.raiseTicket(this.ticket).subscribe({
    next: (res: { message: any }) => {
      alert(res.message || "Ticket raised successfully.");
    },
    error: (err: any) => {
      console.error("Error while raising ticket:", err);

      if (err.status === 500) {
        alert("Server error: Please ensure the Employee ID exists.");
      } else if (err.status === 404) {
        alert("API not found. Check proxy config or backend server.");
      } else {
        alert("Failed to raise ticket. Try again.");
      }
    }
  });
}

}
