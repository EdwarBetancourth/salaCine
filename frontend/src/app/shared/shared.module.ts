import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageBrokenDirective } from './directives/image-broken.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SmallMovieComponent } from './components/small-movie/small-movie.component';
import { ViewMovieComponent } from './components/view-movie/view-movie.component';

@NgModule({
  declarations: [
    ImageBrokenDirective,
    NavbarComponent,
    SmallMovieComponent,
    ViewMovieComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ImageBrokenDirective,
    NavbarComponent,    
    SmallMovieComponent,
    ViewMovieComponent
  ]
})

export class SharedModule { }
