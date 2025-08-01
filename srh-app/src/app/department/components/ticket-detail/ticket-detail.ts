import {
  Component,
  AfterViewChecked,
  ViewChild,
  ElementRef
} from '@angular/core';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';
import { Chart, registerables } from 'chart.js';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule ],
  templateUrl: './ticket-detail.html',
  styleUrls: ['./ticket-detail.css']
})
export class TicketDetail implements AfterViewChecked {
  departmentId: number | null = null;
  tickets: Ticket[] = [];
  errorMsg = '';
  successMsg = '';
  loading = false;
  showCharts = false;

  @ViewChild('statusPieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  private pieChart!: Chart;

  constructor(private ticketService: TicketService) {
    Chart.register(...registerables);
  }

  ngAfterViewChecked(): void {
    if (this.showCharts && this.pieChartRef && !this.pieChart) {
      this.initChart();
    }
  }

  fetchTickets() {
    this.successMsg = '';
    this.errorMsg = '';
    this.showCharts = false;

    if (!this.departmentId) {
      this.errorMsg = 'Please enter a valid Department ID';
      return;
    }

    this.loading = true;
    this.ticketService.getTickets(this.departmentId).subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.status === 'success') {
          this.tickets = resp.data;
          this.successMsg = `${this.tickets.length} tickets loaded`;
          this.showCharts = true;
          this.pieChart = undefined as any; // Reset chart to re-initialize
        } else {
          this.errorMsg = resp.message;
          this.tickets = [];
        }
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Failed to fetch tickets.';
        this.tickets = [];
      }
    });
  }

  acceptTicket(ticketId: number) {
    this.successMsg = '';
    this.errorMsg = '';
    this.ticketService.acceptTicket(ticketId).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          this.successMsg = resp.message;
          this.fetchTickets();
        } else {
          this.errorMsg = resp.message;
        }
      },
      error: () => {
        this.errorMsg = 'Error while accepting ticket.';
      }
    });
  }

  closeTicket(ticketId: number) {
    this.successMsg = '';
    this.errorMsg = '';
    const reason = prompt('Enter reason for closing the ticket:');
    if (!reason) return;

    this.ticketService.closeTicket({ ticketId, reason }).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          this.successMsg = resp.message;
          this.fetchTickets();
        } else {
          this.errorMsg = resp.message;
        }
      },
      error: () => {
        this.errorMsg = 'Error while closing ticket.';
      }
    });
  }

  private initChart() {
    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const statusCount = this.getStatusCount();
    const labels = Object.keys(statusCount);
    const data = Object.values(statusCount);

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ticket Status',
          data: data,
          backgroundColor: [
            '#2b7bff',
            '#4caf50',
            '#f44336',
            '#ff9800',
            '#9c27b0',
            '#ffc107'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  private getStatusCount(): { [key: string]: number } {
    const counts: { [key: string]: number } = {};
    for (const ticket of this.tickets) {
      const status = ticket.status.toUpperCase();
      counts[status] = (counts[status] || 0) + 1;
    }
    return counts;
  }
}
