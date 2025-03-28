import { Component } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disease-prediction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './disease-prediction.component.html',
  styleUrl: './disease-prediction.component.css'
})
export class DiseasePredictionComponent {
  selectedFile: File | null = null;
  predictionResult: string = '';
  errorMessage: string = '';

  constructor(private predictionService: PredictionService) {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onPredict() {
    if (this.selectedFile) {
      this.predictionService.predictDisease(this.selectedFile).subscribe({
        next: (response) => {
          this.predictionResult = `Prediction: ${response.prediction}`;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.predictionResult = '';
        }
      });
    } else {
      this.errorMessage = 'Please select an image.';
    }
  }
}
