import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';
import { CancelTicketRequest } from '../../models/admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-ticket',
  standalone: true,               // Needed if you use imports in Component decorator
  imports: [FormsModule, CommonModule],
  templateUrl: './cancel-ticket.html',
  styleUrls: ['./cancel-ticket.css']  // Note: 'styleUrls' is plural, not 'styleUrl'
})
export class CancelTicket {
  @Input() ticketId: number | null | undefined = null;
  cancelReason = '';
  @Output() assignmentCompleted = new EventEmitter<void>();

  message = '';
  isError = false;
  loading = false;

  // Inject Router and AdminService
  constructor(private adminService: AdminService, private router: Router) { }



  cancel() {
    if (!this.ticketId || !this.cancelReason.trim()) {
      this.isError = true;
      this.message = 'Cancel reason is required.';
      return;
    }

    this.loading = true;
    this.message = '';
    this.isError = false;

    const request: CancelTicketRequest = {
      ticketId: this.ticketId,
      cancelReason: this.cancelReason,
    };

    this.adminService.cancelTicket(request).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = res.message;
        this.isError = res.status !== 'success';
        if (res.status === 'success') {
          this.assignmentCompleted.emit();
        }
      },
      error: (err) => {
        this.loading = false;
        this.message = 'Server error occurred';
        this.isError = true;
        console.error(err);
      },
    });
  }
}
