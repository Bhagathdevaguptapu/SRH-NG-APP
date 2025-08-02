import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RaiseTicketDTO, FeedbackDTO, Ticket } from '../models/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTicketService {
  baseurl: string = '/api';

  constructor(private http: HttpClient) { }

  raiseTicket(dto: RaiseTicketDTO): Observable<any> {
    return this.http.post(`${this.baseurl}/emp/raiseTicket`, dto);
  }

  // viewTickets(employeeId: number) {
  //   return this.http.get(this.baseurl + "/emp/viewMyTickets/" + employeeId);
  // }


  //   cancelTicket(ticketId: number) {
  //     return this.http.post(this.baseurl + "/emp/cancleMyTicket/" + ticketId, {});
  //   }

  viewTickets(employeeId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseurl}/emp/viewMyTickets/${employeeId}`);
  }

  cancelTicket(ticketId: number) {
    return this.http.post(this.baseurl + "/emp/cancelMyTicket/" + ticketId, {});
  }


  giveFeedback(feedback: FeedbackDTO) {
    return this.http.post(this.baseurl + "/emp/giveFeedback", feedback);
  }
}
