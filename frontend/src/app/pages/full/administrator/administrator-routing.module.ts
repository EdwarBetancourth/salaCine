import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'create-movie', component: CreateMovieComponent },
  { path: 'create-room', component: CreateRoomComponent },
  { path: 'create-ticket', component: CreateTicketsComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
