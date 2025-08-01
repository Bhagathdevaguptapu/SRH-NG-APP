import { CommonModule } from "@angular/common";
import { TicketList } from "./components/ticket-list/ticket-list";
import { DepartmentRoutingModule } from "./department-routing-module";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    HttpClientModule,
  ]
})
export class DepartmentModule { }
