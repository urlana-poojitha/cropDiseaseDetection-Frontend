import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = this.authService.getUsername(); // get from service or localStorage
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}