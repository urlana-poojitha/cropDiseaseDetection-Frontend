import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterModule],
  standalone: true,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username: string | null = null; // Replace with actual user data
  menuActive: boolean = false;

  constructor(private router: Router) {
    // Example: Get username from auth service
    // this.username = this.authService.getUsername();
  }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  logout(): void {
    // Implement logout logic
    // this.authService.logout();
    this.username = null;
    this.router.navigate(['/login']);
  }

  logoutAndClose(): void {
    this.logout();
    this.menuActive = false;
  }
}