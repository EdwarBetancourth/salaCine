import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Movie, Room } from 'src/app/interfaces';
import { MovieService } from 'src/app/services/movie/movie.service';
import { RoomService } from 'src/app/services/room/room.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  rooms: Room[] = [];
  listSubscriptions: Subscription[] = [];
  search: string = "";

  constructor( 
    private movieService: MovieService,
    private roomService: RoomService,
    private searchService:SearchService
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
    const sub$1 = this.movieService.getAll().subscribe( val => this.movies = val );
    const sub$2 = this.roomService.getAll().pipe(tap(console.log)).subscribe( val => this.rooms = val );
    this.listSubscriptions.push( sub$1, sub$2 )
  }

}
