import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';

@NgModule({
  declarations: [
    CreateMovieComponent,
    CreateRoomComponent,
    CreateTicketsComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministratorModule { }
