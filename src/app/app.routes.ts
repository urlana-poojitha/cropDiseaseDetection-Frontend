import { Routes } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResultComponent } from './components/result/result.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadComponent },
  {path: 'result', component: ResultComponent }
];
