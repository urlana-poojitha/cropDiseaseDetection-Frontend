import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FooterComponent, HeaderComponent],
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