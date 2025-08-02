import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentDTO } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-comment',
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-comment.html',
  styleUrl: './ticket-comment.css'
})
export class TicketComment {
  selectedDepartmentId: number = 0;
  ticketId: number | null = null;
  commenterName: string = '';
  commentText: string = '';
  departmentTickets: any[] = [];

  isError: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';
  loading: boolean = false;

  constructor(private ticketService: TicketService) {}

  fetchDepartmentTickets(): void {
    this.ticketId = null;
    this.departmentTickets = [];
    this.successMsg = '';
    this.errorMsg = '';
    this.isError = false;

    if (!this.selectedDepartmentId || this.selectedDepartmentId <= 0) {
      this.isError = true;
      this.errorMsg = 'Please select a valid department.';
      return;
    }

    this.loading = true;

    this.ticketService.getTickets(this.selectedDepartmentId).subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.status === 'success') {
          this.departmentTickets = resp.data;
          if (!this.departmentTickets.length) {
            this.isError = true;
            this.errorMsg = 'No tickets found for the selected department.';
          }
        } else {
          this.isError = true;
          this.errorMsg = resp.message;
        }
      },
      error: () => {
        this.loading = false;
        this.isError = true;
        this.errorMsg = 'Server error occurred while fetching tickets.';
      }
    });
  }

  submitComment(): void {
    this.isError = false;
    this.successMsg = '';

    if (!this.ticketId || !this.commenterName.trim() || !this.commentText.trim()) {
      this.isError = true;
      this.errorMsg = 'All fields are required.';
      return;
    }

    this.loading = true;

    const payload: CommentDTO = {
      ticketId: this.ticketId,
      commenterName: this.commenterName.trim(),
      commentText: this.commentText.trim()
    };

    this.ticketService.addComment(payload).subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.status === 'success') {
          this.successMsg = resp.message;
          this.ticketId = null;
          this.commenterName = '';
          this.commentText = '';
        } else {
          this.isError = true;
          this.errorMsg = resp.message || 'Failed to submit comment.';
        }
      },
      error: () => {
        this.loading = false;
        this.isError = true;
        this.errorMsg = 'Server error occurred while submitting comment.';
      }
    });
  }
}
