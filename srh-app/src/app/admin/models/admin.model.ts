export interface Ticket {
  createdBy: number;
  ticketId: number;
  subject: string;
  status: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  assignedToDepartment: number;

}

export interface TicketSummary {
  ticketId: number;
  title: string;
  description: string;
  createdAt: string;
  assignedToDepartment: number;
  assignedToDepartmentName: string;
  status: string;
  updatedAt: string;
  cancelReason?: string;
  closeReason?: string;
}


export interface EmployeeDTO {
  employeeId: number;
  name: string;
  email: string;
  tickets: TicketSummary[];
}


export interface AssignTicketRequest {
  ticketId: number;
  departmentId: number;
}


export interface CancelTicketRequest {
  ticketId: number;
  cancelReason: string;
}
export interface TicketFeedbackDTO {
  feedbackId: number;
  ticketId: number;
  employeeId: number;
  feedbackText: string;
  givenAt: string;
}

interface FeedbackViewModel {
  ticketId: number;
  departmentName: string;
  employeeId: number;
  employeeName: string;
  feedbackText: string;
}

export interface TicketFeedbackDTO {
  feedbackId: number;
  ticketId: number;
  employeeId: number;
  feedbackText: string;
  givenAt: string;
}
export interface EmployeeDTO {
  employeeId: number;
  name: string;
  email: string;
  tickets: TicketSummary[];
}
export interface TicketSummary {
  ticketId: number;
  assignedToDepartmentName: string;
  // (other fields)
}
