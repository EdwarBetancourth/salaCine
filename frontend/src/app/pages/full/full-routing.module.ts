import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMovieComponent } from './view-movie/view-movie.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { 
    path: 'administrator', 
    component: AdministratorComponent,
    loadChildren: () => import('./administrator/administrator.module').then( m => m.AdministratorModule )
  },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'view-movie/:id', component: ViewMovieComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FullRoutingModule { }
