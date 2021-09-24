import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Movie, Room, Ticket } from 'src/app/interfaces';
import { MovieService } from 'src/app/services/movie/movie.service';
import { RoomService } from 'src/app/services/room/room.service';
import { SearchService } from 'src/app/services/search/search.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  tickets: Ticket[] = [];
  listSubscriptions: Subscription[] = [];
  search: string = "";

  constructor( 
    private searchService:SearchService,
    private ticketService: TicketsService
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
    const sub$ = this.ticketService.getAll()
      .subscribe(
        val => this.tickets = val
      )
    this.listSubscriptions.push( sub$ )
  }

}
