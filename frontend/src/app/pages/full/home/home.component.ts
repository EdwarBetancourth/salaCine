import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  listSubscriptions: Subscription[] = [];
  search: FormControl = new FormControl();

  constructor( private movieService: MovieService ) { }

  ngOnInit(): void {
    this.getAll()
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach( s => s.unsubscribe() );
  }

  getAll (): void {
    const sub$1 = this.movieService.getAll().subscribe( val => this.movies = val );
    const sub$2 = this.movieService.getAll().subscribe( val => this.movies = val );
    this.listSubscriptions.push( sub$2 )
  }

}
