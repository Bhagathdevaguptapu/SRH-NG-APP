import { Component } from '@angular/core';
import { EmployeeDTO, TicketSummary } from '../../models/admin.model';
import { AdminService } from '../../services/admin-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssignTicket } from "../assign-ticket/assign-ticket";
import { CancelTicket } from "../cancel-ticket/cancel-ticket";

@Component({
  selector: 'app-employee-ticket-list',
  imports: [FormsModule, CommonModule, AssignTicket, CancelTicket],
  templateUrl: './employee-ticket-list.html',
  styleUrl: './employee-ticket-list.css'
})
export class EmployeeTicketList {
  employeeId!: number;
  employee?: EmployeeDTO;
  loading = false;
  isError = false;
  errorMsg = '';

  showAssignModal = false;
  showCancelModal = false;
  selectedTicket: TicketSummary | null = null;

  constructor(private adminService: AdminService) { }

  fetchEmployeeTickets() {
    if (!this.employeeId) {
      this.isError = true;
      this.errorMsg = 'Please enter a valid employee ID';
      return;
    }

    this.loading = true;
    this.isError = false;
    this.employee = undefined;

    this.adminService.getEmployeeTicketsById(this.employeeId).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 'success' && res.data) {
          this.employee = res.data;
        } else {
          this.isError = true;
          this.errorMsg = res.message || 'Employee not found or no tickets.';
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

  openAssignPopup(ticket: TicketSummary) {
    this.selectedTicket = ticket;
    this.showAssignModal = true;
  }

  closeAssignPopup() {
    this.showAssignModal = false;
    this.selectedTicket = null;
  }

  openCancelPopup(ticket: TicketSummary) {
    this.selectedTicket = ticket;
    this.showCancelModal = true;
  }

  closeCancelPopup() {
    this.showCancelModal = false;
    this.selectedTicket = null;
  }

  onAssignmentDone() {
    this.closeAssignPopup();            // Close modal
    this.closeCancelPopup();          // Close cancel modal
    this.fetchEmployeeTickets();        // Reload employee tickets
  }

}
