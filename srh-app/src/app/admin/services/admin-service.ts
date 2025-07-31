import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = '/api/admin';

  getAllEmployeeTickets() {
    return this.httpClient.get<any>(`${this.baseUrl}/employees/tickets`);
  }
  getEmployeeTicketsById(employeeId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/employee/tickets/${employeeId}`);
  }

  assignTicket(request: { ticketId: number; departmentId: number }): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/assign-ticket`, request);
  }

  cancelTicket(request: { ticketId: number; cancelReason: string }): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/ticket/cancel`, request);
  }

  getAllFeedbacks() {
  return this.httpClient.get<any>(`${this.baseUrl}/feedbacks`);
}


 
}
