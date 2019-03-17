import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedComponents } from '../shared-components.module';
import { UserService } from '../services/user.service';
import { PaginateService } from '../services/paginate.service';
import { ToastService } from '../services/toast.service';
import { DialogService } from '../services/dialog.service';

import { UsersComponent } from './users.component';
import { UsersNewComponent } from './users-new.component';
import { UsersEditComponent } from './users-edit.component';

//import { OrderlistDirective } from './../directives/orderlist.directive';

const appRoutes: Routes = [
    {path: 'users', component: UsersComponent},
    {path: 'users/new', component: UsersNewComponent},
    {path: 'users/edit/:id', component: UsersEditComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    SharedComponents
  ],
  declarations: [
    UsersComponent,
    UsersNewComponent,
    UsersEditComponent,
   // OrderlistDirective
  ],
  providers: [UserService, PaginateService, ToastService, DialogService]

})
export class UsersModule { }
