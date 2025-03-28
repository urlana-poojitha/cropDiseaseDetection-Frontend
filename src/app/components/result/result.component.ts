import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface DiseaseTreatment {
  symptoms?: string;
  severity?: string;
  causes?: string;
  treatment?: string;
  prevention?: string;
  recommended_pesticide?: string;
  organic_treatment?: string;
  message?: string;
}

interface PredictionResult {
  prediction: string;
  confidence: string;
  treatment: DiseaseTreatment;
}

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  prediction: PredictionResult | null = null;
  image: string | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  currentDate: Date = new Date();

  constructor(private router: Router) {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    try {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as {
        prediction: PredictionResult;
        image: string;
      };

      if (state?.prediction && state?.image) {
        this.prediction = state.prediction;
        this.image = state.image;
        this.isLoading = false;
      } else {
        this.handleMissingState();
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleMissingState(): void {
    this.error = 'No analysis data found. Please upload an image first.';
    setTimeout(() => {
      this.router.navigate(['/upload']);
    }, 3000);
  }

  private handleError(error: unknown): void {
    console.error('Error processing results:', error);
    this.error = 'An error occurred while loading results.';
    this.isLoading = false;
  }

  formatDiseaseName(name: string): string {
    if (!name) return 'Unknown Disease';
    return name
      .replace(/_/g, ' ')
      .replace(/___/g, ' - ')
      .replace(/__/g, ' ');
  }

  getSeverityClass(severity?: string): string {
    if (!severity) return 'severity-unknown';
    
    const severityLower = severity.toLowerCase();
    
    if (severityLower.includes('high')) return 'severity-high';
    if (severityLower.includes('medium')) return 'severity-medium';
    if (severityLower.includes('low')) return 'severity-low';
    return 'severity-unknown';
  }

  hasTreatmentData(): boolean {
    if (!this.prediction?.treatment) return false;
    if (this.prediction.treatment.message) return false;
    
    return !!(
      this.prediction.treatment.symptoms ||
      this.prediction.treatment.causes ||
      this.prediction.treatment.treatment ||
      this.prediction.treatment.prevention ||
      this.prediction.treatment.recommended_pesticide ||
      this.prediction.treatment.organic_treatment
    );
  }

  navigateToUpload(): void {
    this.router.navigate(['/upload']);
  }

  getConfidenceValue(): number {
    if (!this.prediction?.confidence) return 0;
    const numericValue = parseFloat(this.prediction.confidence.replace('%', ''));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  getConfidenceColor(): string {
    const confidence = this.getConfidenceValue();
    if (confidence > 80) return 'high-confidence';
    if (confidence > 50) return 'medium-confidence';
    return 'low-confidence';
  }

  downloadReport(): void {
    if (!this.prediction || !this.image) {
      console.error('No data available to generate report');
      return;
    }

    // Create report content
    const reportContent = this.generateReportContent();

    // Create blob and download
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plant_health_report_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private generateReportContent(): string {
    const reportLines = [];
    reportLines.push('PLANT HEALTH ANALYSIS REPORT');
    reportLines.push(`Generated on: ${this.currentDate.toLocaleString()}`);
    reportLines.push('\n--- DIAGNOSIS ---');
    reportLines.push(`Disease: ${this.formatDiseaseName(this.prediction!.prediction)}`);
    reportLines.push(`Confidence: ${this.prediction!.confidence}`);
    
    if (this.prediction!.treatment?.severity) {
      reportLines.push(`Severity: ${this.prediction!.treatment.severity}`);
    }

    if (this.hasTreatmentData()) {
      reportLines.push('\n--- TREATMENT INFORMATION ---');
      if (this.prediction!.treatment?.symptoms) {
        reportLines.push(`Symptoms: ${this.prediction!.treatment.symptoms}`);
      }
      if (this.prediction!.treatment?.causes) {
        reportLines.push(`Causes: ${this.prediction!.treatment.causes}`);
      }
      if (this.prediction!.treatment?.treatment) {
        reportLines.push(`Treatment: ${this.prediction!.treatment.treatment}`);
      }
      if (this.prediction!.treatment?.prevention) {
        reportLines.push(`Prevention: ${this.prediction!.treatment.prevention}`);
      }
      if (this.prediction!.treatment?.recommended_pesticide) {
        reportLines.push(`Recommended Pesticide: ${this.prediction!.treatment.recommended_pesticide}`);
      }
      if (this.prediction!.treatment?.organic_treatment) {
        reportLines.push(`Organic Treatment: ${this.prediction!.treatment.organic_treatment}`);
      }
    } else if (this.prediction!.treatment?.message) {
      reportLines.push(`\nNote: ${this.prediction!.treatment.message}`);
    }

    return reportLines.join('\n');
  }
}