import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = '/api/admin';

  // ✅ Fetch all employee tickets
  getAllEmployeeTickets() {
    return this.httpClient.get<any>(`${this.baseUrl}/employees/tickets`);
  }
  // Fetch tickets for a specific employee by ID
  getEmployeeTicketsById(employeeId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/employee/tickets/${employeeId}`);
  }

   assignTicket(request: { ticketId: number; departmentId: number }): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/assign-ticket`, request);
  }

  cancelTicket(request: { ticketId: number; cancelReason: string }): Observable<any> {
  return this.httpClient.post<any>(`${this.baseUrl}/ticket/cancel`, request);
}



}
