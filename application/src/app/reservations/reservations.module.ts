import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

import { SharedComponents } from '../shared-components.module';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';

import { ReservationsComponent } from './reservations.component';

const appRoutes: Routes = [
    {path: 'reservations', component: ReservationsComponent}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        SharedComponents,
        MaterializeModule,
    ],
    declarations: [
        ReservationsComponent,
    ],
    providers: [ReservationService, RoomService]
})

export class ReservationsModule {}


