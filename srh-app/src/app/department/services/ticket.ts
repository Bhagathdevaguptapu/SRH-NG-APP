import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentDTO, UpdateStatusDTO } from '../models/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private httpClient:HttpClient){ }


   baseUrl:String= '/api/department';

  getTickets(departmentId: number) {
    return this.httpClient.get<any>(`${this.baseUrl}/tickets/${departmentId}`);
  }

   updateTicketStatus(dto: UpdateStatusDTO): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/ticket/status`, dto);
  }

  addComment(dto: CommentDTO):  Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}/ticket/comment`, dto);
  }

  acceptTicket(ticketId: number): Observable<any> {
  return this.httpClient.put<any>(`${this.baseUrl}/ticket/accept/${ticketId}`, {});
}

  closeTicket(dto: { ticketId: number, reason: string }): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/ticket/close`, dto);
  }
}
