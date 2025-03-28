import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private flaskUrl = 'http://localhost:5001/predict'; // Flask API URL

  constructor(private http: HttpClient) {}

  predict(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(this.flaskUrl, formData);
  }
}
