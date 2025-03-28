import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes'; // ✅ Import your routes here

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // ✅ Pass routes here instead of []
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormsModule)
  ],
};
