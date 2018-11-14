import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    HeaderComponent
  ]
})
export class HeaderModule { }
