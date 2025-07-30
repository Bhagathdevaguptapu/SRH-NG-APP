import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackDTO } from '../../models/ticket.model';
import { EmployeeTicketService } from '../../services/employee-ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-give-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [EmployeeTicketService],
  templateUrl: './give-feedback.html',
  styleUrls: ['./give-feedback.css']
})
export class GiveFeedback {
  feedback: FeedbackDTO = {
    ticketId: 0,
    feedbackText: ''
  };

  message: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  constructor(private ticketService: EmployeeTicketService, private router: Router) {}

  submitFeedback() {
    if (!this.feedback.ticketId || !this.feedback.feedbackText.trim()) {
      this.errorMsg = "Ticket ID and feedback are required.";
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMsg = '';

    this.ticketService.giveFeedback(this.feedback).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = res.message || "Feedback submitted successfully.";

        // Redirect after 2 seconds
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 2000);
      },
      error: (err: any) => {
        this.loading = false;
        console.error("Error submitting feedback:", err);
        this.errorMsg = "Failed to submit feedback.";
      }
    });
  }
}
