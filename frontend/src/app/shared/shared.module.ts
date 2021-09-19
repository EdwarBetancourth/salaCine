import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageBrokenDirective } from './directives/image-broken.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SmallMovieComponent } from './components/small-movie/small-movie.component';
import { ViewMovieComponent } from './components/view-movie/view-movie.component';
import { GeneralPipe } from './pipes/general.pipe';

@NgModule({
  declarations: [
    ImageBrokenDirective,
    NavbarComponent,
    SmallMovieComponent,
    ViewMovieComponent,
    GeneralPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ImageBrokenDirective,
    NavbarComponent,    
    SmallMovieComponent,
    ViewMovieComponent,
    GeneralPipe
  ]
})

export class SharedModule { }
