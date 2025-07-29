import { Routes } from '@angular/router';
import { Home } from './admin/components/home/home';
import { AdminLogin } from './admin/components/admin-login/admin-login';
import { AllEmployeeTickets } from './admin/components/all-employee-tickets/all-employee-tickets';
import { AssignTicket } from './admin/components/assign-ticket/assign-ticket';
import { CancelTicket } from './admin/components/cancel-ticket/cancel-ticket';
import { EmployeeTicketList } from './admin/components/employee-ticket-list/employee-ticket-list';

export const routes: Routes = [{
    path: '',
    component: Home
}, {
    path: 'admin-login',
    component: AdminLogin
}, {
    path: 'all-employee-tickets',
    component: AllEmployeeTickets
}, {
    path: 'assign-ticket',
    component: AssignTicket
}, {
    path: 'cancel-ticket',
    component: CancelTicket
}, {
    path: 'employee-ticket-list',
    component: EmployeeTicketList
}];
