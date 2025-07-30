import { Routes } from '@angular/router';
import { Home } from './admin/components/home/home';
import { AllEmployeeTickets } from './admin/components/all-employee-tickets/all-employee-tickets';
import { AssignTicket } from './admin/components/assign-ticket/assign-ticket';
import { CancelTicket } from './admin/components/cancel-ticket/cancel-ticket';
import { EmployeeTicketList } from './admin/components/employee-ticket-list/employee-ticket-list';
import { Login } from './login/login/login';

export const routes: Routes = [{
    path: 'admin-home',
    component: Home
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
    path: 'cancel-ticket',
    component: CancelTicket
}, {
    path: 'employee-ticket-list',
    component: EmployeeTicketList
}];
