import { Routes } from '@angular/router';
import { TicketComment } from './department/components/ticket-comment/ticket-comment';
import { TicketDetail } from './department/components/ticket-detail/ticket-detail';
import { TicketList } from './department/components/ticket-list/ticket-list';
import { TicketStatusUpdate } from './department/components/ticket-status-update/ticket-status-update';
import { Home } from './department/components/home/home';

export const routes: Routes = [ {
    path: '',
    component: Home
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
