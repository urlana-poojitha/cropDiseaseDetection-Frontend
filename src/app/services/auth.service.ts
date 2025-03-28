import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8088/api/user'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        // Store values only if login is successful
        if (response && response.username) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', response.username);

          // Optional: If backend returns token
          // localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  // Optional: Get token if using JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
