import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { PaginateComponent } from './paginate/paginate.component';
import { ToastComponent } from './toast/toast.component';
import { DialogComponent } from './dialog/dialog.component';

import { OrderlistDirective } from './directives/orderlist.directive';


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    HeaderComponent,
    PaginateComponent,
    ToastComponent,
    DialogComponent,
    OrderlistDirective
  ],
  exports: [
    HeaderComponent,
    PaginateComponent,
    ToastComponent,
    DialogComponent,
    OrderlistDirective
  ]
})

export class SharedComponents {}
