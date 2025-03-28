import { Component } from '@angular/core';
import { PlantDiseaseService } from '../../services/plant-disease.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  isDragging = false;

  constructor(
    private plantDiseaseService: PlantDiseaseService,
    private router: Router
  ) {}

  // Drag and drop handlers
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFileSelection(event.dataTransfer.files[0]);
    }
  }

  // File selection handlers
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileSelection(input.files[0]);
    }
  }

  private handleFileSelection(file: File): void {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      this.errorMessage = 'Please upload a valid image file (JPG, PNG, or WEBP)';
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'File size exceeds 5MB limit';
      return;
    }

    this.errorMessage = null;
    this.selectedFile = file;
  }

  // Image preview
  getImagePreview(): string {
    return this.selectedFile ? URL.createObjectURL(this.selectedFile) : '';
  }

  clearFile(): void {
    if (this.selectedFile) {
      URL.revokeObjectURL(this.getImagePreview());
      this.selectedFile = null;
    }
  }

  // Form submission
  onSubmit(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image first';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.plantDiseaseService.predictDisease(this.selectedFile).subscribe({
      next: (response) => {
        // Convert image to base64 for passing through route
        const reader = new FileReader();
        reader.onload = () => {
          const imageBase64 = reader.result as string;
          this.router.navigate(['/result'], {
            state: {
              prediction: response,
              image: imageBase64
            }
          });
        };
        reader.readAsDataURL(this.selectedFile as Blob);
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while processing your image. Please try again.';
        this.isLoading = false;
        console.error('Prediction error:', error);
      }
    });
  }

  // Cleanup
  ngOnDestroy(): void {
    if (this.selectedFile) {
      URL.revokeObjectURL(this.getImagePreview());
    }
  }
}