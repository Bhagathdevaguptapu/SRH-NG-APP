import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketList } from './components/ticket-list/ticket-list';

const routes: Routes = [
  { path: 'ticket-list', component: TicketList },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
