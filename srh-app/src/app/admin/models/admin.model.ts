export interface Ticket {
  ticketId: number;
  subject: string;
  status: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeDTO {
  employeeId: number;
  name: string;
  email: string;
  tickets: Ticket[];
}

export interface AssignTicketRequest {
  ticketId: number;
  departmentId: number;
}

export interface CancelTicketRequest {
  ticketId: number;
  cancelReason: string;
}
