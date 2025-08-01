

export interface RaiseTicketDTO {
  title: string;
  description: string;
  employeeId: number;
}

export interface FeedbackDTO {
  ticketId: number;
  feedbackText: string;
}

export interface Ticket {
  ticketId: number;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
}

export interface EmployeeDTO {
  employeeId: number;
  name: string;
  email: string;
  tickets: Ticket[];
  

}
