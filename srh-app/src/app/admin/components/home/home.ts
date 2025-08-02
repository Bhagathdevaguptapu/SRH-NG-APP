import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class AdminHome {
  constructor(private router: Router) { }
  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
