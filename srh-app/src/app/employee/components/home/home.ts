import { Component } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
constructor(private router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']); // Redirect to login page
  }
}
