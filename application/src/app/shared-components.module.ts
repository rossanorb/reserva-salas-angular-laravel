import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { PaginateComponent } from './paginate/paginate.component';
import { ToastComponent } from './toast/toast.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    HeaderComponent,
    PaginateComponent,
    ToastComponent,
    DialogComponent
  ],
  exports: [
    HeaderComponent,
    PaginateComponent,
    ToastComponent,
    DialogComponent
  ]
})

export class SharedComponents {}
