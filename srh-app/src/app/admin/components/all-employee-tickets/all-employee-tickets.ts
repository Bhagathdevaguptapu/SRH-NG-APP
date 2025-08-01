import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeDTO, TicketSummary } from '../../models/admin.model';
import { AdminService } from '../../services/admin-service';
import { AssignTicket } from "../assign-ticket/assign-ticket";
import { CancelTicket } from "../cancel-ticket/cancel-ticket";
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-employee-tickets',
  imports: [FormsModule, CommonModule, AssignTicket, CancelTicket],
  templateUrl: './all-employee-tickets.html',
  styleUrl: './all-employee-tickets.css'
})

export class AllEmployeeTickets {
  employees: EmployeeDTO[] = [];
  loading = false;
  isError = false;
  errorMsg = '';

  showAssignModal = false;
  showCancelModal = false;
  selectedTicket: TicketSummary | null = null;

  constructor(private adminService: AdminService, private router: Router) { }

  fetchAllEmployeeTickets() {
    this.loading = true;
    this.isError = false;
    this.errorMsg = '';

    this.adminService.getAllEmployeeTickets().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 'success') {
          this.employees = res.data;
        } else {
          this.isError = true;
          this.errorMsg = 'Failed to load employee tickets (bad response status).';
          this.employees = [];
        }
      },
      error: (err) => {
        this.loading = false;
        this.isError = true;
        this.errorMsg = 'Failed to load employee tickets (server error).';
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
    this.fetchAllEmployeeTickets();     // Reload employee tickets
  }

  goBack() {
    this.router.navigate(['/admin-home']);  // or [''] if home is root
  }
}
