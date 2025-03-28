import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

import { FooterComponent } from './components/footer/footer.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FooterComponent, HeaderComponent,HeroSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ML-AWP';
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    const loggedIn = this.authService.isLoggedIn();
    console.log('Is user logged in?', loggedIn); // ✅ DEBUG
    return loggedIn;
  }
}