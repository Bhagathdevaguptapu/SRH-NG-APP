export interface TicketComment {
  commenterName: string;
  commentText: string;
  commenterRole?: string;
  commentedAt?: string;
}

export interface Ticket {
  ticketId: number;
  title?: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  comments?: TicketComment[];
}


export interface UpdateStatusDTO {
  ticketId: number;
  status: string;
}


export interface CommentDTO {
  ticketId: number;
  commentText: string;
  commenterName: string;
}