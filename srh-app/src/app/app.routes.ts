import { Routes } from '@angular/router';
import { AdminHome } from './admin/components/home/home';
import { AllEmployeeTickets } from './admin/components/all-employee-tickets/all-employee-tickets';
import { AssignTicket } from './admin/components/assign-ticket/assign-ticket';
import { AdminCancelTicket } from './admin/components/cancel-ticket/cancel-ticket';
import { EmployeeTicketList } from './admin/components/employee-ticket-list/employee-ticket-list';
import { Login } from './login/login/login';
import { AllFeedbacksComponent } from './admin/components/all-feedbacks/all-feedbacks';
import { RaiseTicket } from './employee/components/raise-ticket/raise-ticket';
import { ViewTicketsComponent } from './employee/components/view-tickets/view-tickets';
import { GiveFeedback } from './employee/components/give-feedback/give-feedback';
import { Home } from './employee/components/home/home';
import { CancelTicket } from './employee/components/cancel-ticket/cancel-ticket';
import { TicketList } from './department/components/ticket-list/ticket-list';
import { TicketDetail } from './department/components/ticket-detail/ticket-detail';
import { TicketStatusUpdate } from './department/components/ticket-status-update/ticket-status-update';
import { TicketComment } from './department/components/ticket-comment/ticket-comment';
import { DeptHome } from './department/components/home/home';

export const routes: Routes = [{
    path: 'admin-home',
    component: AdminHome
}, {
    path: '',
    component: Login
}, {
    path: 'all-employee-tickets',
    component: AllEmployeeTickets
}, {
    path: 'assign-ticket',
    component: AssignTicket
}, {
    path: 'admin-cancel-ticket',
    component: AdminCancelTicket
}, {
    path: 'employee-ticket-list',
    component: EmployeeTicketList
}, {
    path: 'all-feedbacks',
    component: AllFeedbacksComponent
}, {
    path: 'home',
    component: Home
},
{
    path: 'raise-ticket',
    component: RaiseTicket
},
{
    path: 'view-tickets',
    component: ViewTicketsComponent
},
{
    path: 'cancel-ticket',
    component: CancelTicket
},
{
    path: 'give-feedback',
    component: GiveFeedback
},{
    path: 'dept-home',
    component: DeptHome
},{ 
    path: 'tickets', 
    component: TicketList
 },{ 
    path: 'ticket/details', 
    component: TicketDetail
},{
    path: 'ticket/status',
    component: TicketStatusUpdate
},{
    path: 'ticket/comment',
    component: TicketComment
}];


