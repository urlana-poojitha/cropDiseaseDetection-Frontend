// plant-disease.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantDiseaseService {
  private apiUrl = 'http://localhost:5001'; // Update if your Flask server is hosted elsewhere

  constructor(private http: HttpClient) { }

  predictDisease(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.post(`${this.apiUrl}/predict`, formData);
  }
}