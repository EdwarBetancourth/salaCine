import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageBrokenDirective } from './directives/image-broken.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SmallMovieComponent } from './components/small-movie/small-movie.component';
import { ViewMovieComponent } from './components/view-movie/view-movie.component';
import { GeneralPipe } from './pipes/general.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRolDirective } from './directives/admin-rol.directive';

@NgModule({
  declarations: [
    ImageBrokenDirective,
    NavbarComponent,
    SmallMovieComponent,
    ViewMovieComponent,
    GeneralPipe,
    AdminRolDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ImageBrokenDirective,
    NavbarComponent,    
    SmallMovieComponent,
    ViewMovieComponent,
    GeneralPipe,
    AdminRolDirective
  ]
})

export class SharedModule { }
