import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';

import { AuthenticationHttpService } from './login/authentication-http.service';

const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
      BrowserModule,
      MaterializeModule,
      LoginModule,
      RoomsModule,
      UsersModule,
      ReservationsModule,
      RouterModule.forRoot(appRoutes),
      HttpModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: Http, useClass: AuthenticationHttpService }
  ]
})
export class AppModule { }
