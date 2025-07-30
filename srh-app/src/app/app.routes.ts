import { Routes } from '@angular/router';
import { Home } from './employee/components/home/home';
import { RaiseTicket } from './employee/components/raise-ticket/raise-ticket';

import { CancelTicket } from './employee/components/cancel-ticket/cancel-ticket';
import { GiveFeedback } from './employee/components/give-feedback/give-feedback';
import { ViewTicketsComponent } from './employee/components/view-tickets/view-tickets';
import { Login } from './login/login/login';


export const routes: Routes = [
    {
        path:'home',
        component:Home
    },
    {
        path:'raise-ticket',
        component:RaiseTicket
    },
    {
        path:'view-tickets',
        component:ViewTicketsComponent
    },
    {
        path:'cancel-ticket',
        component:CancelTicket
    },
    {
        path:'give-feedback',
        component:GiveFeedback
    },
    {
        path:'',
        component:Login
    }
   
];
