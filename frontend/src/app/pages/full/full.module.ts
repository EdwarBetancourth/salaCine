import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullRoutingModule } from './full-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { MoviesComponent } from './movies/movies.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdministratorComponent,
    MoviesComponent
  ],
  imports: [
    CommonModule,
    FullRoutingModule,
    SharedModule
  ]
})

export class FullModule { }
