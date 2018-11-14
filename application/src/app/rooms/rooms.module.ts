import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedComponents } from '../shared-components.module';
import { RoomService } from '../services/room.service';
import { PaginateService } from '../services/paginate.service';
import { ToastService } from '../services/toast.service';
import { DialogService } from '../services/dialog.service';

import { RoomsComponent } from './rooms.component';
import { RoomsNewComponent } from './rooms-new.component';
import { RoomsEditComponent } from './rooms-edit.component';

const appRoutes: Routes = [
    {path: 'rooms', component: RoomsComponent},
    {path: 'rooms/new', component: RoomsNewComponent},
    {path: 'rooms/edit/:id', component: RoomsEditComponent}
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
    RoomsComponent,
    RoomsNewComponent,
    RoomsEditComponent
  ],
  providers: [RoomService, PaginateService, ToastService, DialogService]
})
export class RoomsModule { }
