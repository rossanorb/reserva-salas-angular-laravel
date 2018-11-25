import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';

import { LoginComponent } from './login.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
      CommonModule,
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(appRoutes)
  ],
  declarations: [
      LoginComponent
  ],
  providers: [LoginService]
})
export class LoginModule { }
