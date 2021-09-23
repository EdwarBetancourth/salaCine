import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces';
import { MovieService } from 'src/app/services/movie/movie.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  listSubscriptions: Subscription[] = [];
  search: string = "";

  constructor( 
    private movieService: MovieService,
    private searchService: SearchService
    ) { }

  ngOnInit(): void {
    this.getAll()
    this.searchTerm()
  }

  searchTerm(): void{
    const sub$ = this.searchService.search.subscribe( (val) => this.search = val )
    this.listSubscriptions.push( sub$ )
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach( s => s.unsubscribe() );
  }

  getAll (): void {
    const sub$ = this.movieService.getAll().subscribe( val => this.movies = val );
    this.listSubscriptions.push( sub$ ) 
  }


}
