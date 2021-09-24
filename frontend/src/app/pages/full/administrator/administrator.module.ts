import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    CreateMovieComponent,
    CreateRoomComponent,
    CreateTicketsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule
  ]
})
export class AdministratorModule { }
