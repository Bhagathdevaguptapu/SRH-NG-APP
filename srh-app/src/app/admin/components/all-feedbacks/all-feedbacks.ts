import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { EmployeeDTO, TicketFeedbackDTO, TicketSummary } from '../../models/admin.model';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


interface FeedbackViewModel {
  ticketId: number;
  departmentName: string;
  employeeId: number;
  employeeName: string;
  feedbackText: string;
}


@Component({
  selector: 'app-all-feedbacks',
  imports: [CommonModule],
  templateUrl: './all-feedbacks.html',
  styleUrl: './all-feedbacks.css'
})
export class  AllFeedbacksComponent {
goBack() {
this.router.navigate(['admin-home']);
}
  loading = false;
  isError = false;
  errorMsg = '';

  feedbacksWithDetails: FeedbackViewModel[] = [];

  constructor(private adminService: AdminService,private router: Router) {}

  fetchAllFeedbacks() {
    this.loading = true;
    this.isError = false;
    this.errorMsg = '';

    this.adminService.getAllFeedbacks().subscribe({
      next: feedbacksResp => {
        if (feedbacksResp.status !== 'success') {
          this.loading = false;
          this.isError = true;
          this.errorMsg = 'Failed to load feedbacks.';
          return;
        }

        this.adminService.getAllEmployees().subscribe({
          next: employeesResp => {
            if (employeesResp.status !== 'success') {
              this.loading = false;
              this.isError = true;
              this.errorMsg = 'Failed to load employees.';
              return;
            }

            this.adminService.getAllTickets().subscribe({
              next: ticketsResp => {
                this.loading = false;

                if (ticketsResp.status !== 'success') {
                  this.isError = true;
                  this.errorMsg = 'Failed to load tickets.';
                  return;
                }

                const employeeMap = new Map<number, EmployeeDTO>();
                employeesResp.data.forEach(e => employeeMap.set(e.employeeId, e));

                const ticketMap = new Map<number, TicketSummary>();
                ticketsResp.data.forEach(t => ticketMap.set(t.ticketId, t));

                this.feedbacksWithDetails = feedbacksResp.data.map(fb => {
                  const employee = employeeMap.get(fb.employeeId);
                  const ticket = ticketMap.get(fb.ticketId);

                  return {
                    ticketId: fb.ticketId,
                    departmentName: ticket?.assignedToDepartmentName || 'Unknown',
                    employeeId: fb.employeeId,
                    employeeName: employee?.name || 'Unknown',
                    feedbackText: fb.feedbackText
                  };
                });
              },
              error: err => {
                this.loading = false;
                this.isError = true;
                this.errorMsg = 'Server error while fetching tickets.';
                console.error(err);
              }
            });
          },
          error: err => {
            this.loading = false;
            this.isError = true;
            this.errorMsg = 'Server error while fetching employees.';
            console.error(err);
          }
        });
      },
      error: err => {
        this.loading = false;
        this.isError = true;
        this.errorMsg = 'Server error while fetching feedbacks.';
        console.error(err);
      }
    });
  }
}