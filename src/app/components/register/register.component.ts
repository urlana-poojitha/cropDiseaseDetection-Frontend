import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgModel, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const userData = {
      username: this.user.username,
      fullName: `${this.user.firstname} ${this.user.lastname}`,
      email: this.user.email,
      password: this.user.password,
      confirmPassword: this.user.confirmPassword
    };

    this.http.post('http://localhost:8088/api/user/register', userData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error.message || 'Registration failed!';
      }
    });
  }
}
