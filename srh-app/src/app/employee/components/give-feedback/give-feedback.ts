import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket, FeedbackDTO } from '../../models/ticket.model';
import { EmployeeTicketService } from '../../services/employee-ticket';

@Component({
  selector: 'app-give-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [EmployeeTicketService],
  templateUrl: './give-feedback.html',
  styleUrls: ['./give-feedback.css']
})
export class GiveFeedback implements OnInit {
  tickets: Ticket[] = [];
  selectedTicketId: number | null = null;
  selectedTicket: Ticket | undefined;

  feedback: FeedbackDTO = {
    ticketId: 0,
    feedbackText: ''
  };

  message: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  constructor(private ticketService: EmployeeTicketService, private router: Router) {}

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeId');
    if (empId) {
      const id = +empId;
      this.ticketService.viewTickets(id).subscribe({
        next: (res: any) => {
          if (res.status === 'success' && res.data && res.data.tickets) {
            this.tickets = res.data.tickets;
          } else {
            this.tickets = [];
          }
        },
        error: () => {
          this.errorMsg = "Failed to load tickets.";
        }
      });
    }
  }

  onTicketSelect(): void {
    this.selectedTicket = this.tickets.find(t => t.ticketId === +this.selectedTicketId!);
    this.feedback.ticketId = this.selectedTicketId!;
    this.feedback.feedbackText = '';
    this.message = '';
    this.errorMsg = '';
  }

  submitFeedback(): void {
    if (!this.feedback.ticketId || !this.feedback.feedbackText.trim()) {
      this.errorMsg = "Please enter feedback before submitting.";
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMsg = '';

    this.ticketService.giveFeedback(this.feedback).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = res.message || "Feedback submitted successfully.";
        setTimeout(() => this.router.navigate(['home']), 2000);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = "Failed to submit feedback.";
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }
}
