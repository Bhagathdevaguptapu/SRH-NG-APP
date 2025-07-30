import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = '/api';

 
  login(request: LoginRequest): Observable<LoginResponse> {
    let url = '';
    switch (request.role) {
      case 'admin':
        url = `${this.baseUrl}/admin/login`;
        break;
      case 'employee':
        url = `${this.baseUrl}/login`;
        break;
      case 'department':
        url = `${this.baseUrl}/login`;
        break;
    }
    return this.httpClient.post<LoginResponse>(url, request);
  }
}
