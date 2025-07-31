import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { TicketFeedbackDTO } from '../../models/admin.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-feedbacks',
  imports: [CommonModule],
  templateUrl: './all-feedbacks.html',
  styleUrl: './all-feedbacks.css'
})
export class AllFeedbacksComponent {
  feedbacks: TicketFeedbackDTO[] = [];
  loading = false;
  isError = false;
  errorMsg = '';

  constructor(private adminService: AdminService) { }

  fetchAllFeedbacks() {
    this.loading = true;
    this.isError = false;
    this.errorMsg = '';

    this.adminService.getAllFeedbacks().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 'success') {
          this.feedbacks = res.data;
        } else {
          this.isError = true;
          this.errorMsg = 'Failed to load feedbacks.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.isError = true;
        this.errorMsg = 'Server error while fetching feedbacks.';
        console.error(err);
      }
    });
  }
}
