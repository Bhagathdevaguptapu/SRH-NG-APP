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
  ticketId: number | null = null;
  commenterName: string = '';
  commentText: string = '';
  isError: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';
  loading: boolean = false;

  constructor(private ticketService: TicketService) {}

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
      error: (err) => {
        this.loading = false;
        this.isError = true;
        this.errorMsg = 'Server error occurred while submitting comment.';
        console.error(err);
      }
    });
  }

  
}
