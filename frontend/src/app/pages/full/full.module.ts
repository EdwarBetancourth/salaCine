import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullRoutingModule } from './full-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewMovieComponent } from './view-movie/view-movie.component';


@NgModule({
  declarations: [
    HomeComponent,
    AdministratorComponent,
    MoviesComponent,
    ViewMovieComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FullRoutingModule
  ]
})

export class FullModule { }
