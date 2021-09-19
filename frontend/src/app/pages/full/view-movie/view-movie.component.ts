import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Movie, Ticket } from 'src/app/interfaces';
import { MovieService } from 'src/app/services/movie/movie.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.scss']
})
export class ViewMovieComponent implements OnInit {

  movie_id!: number;
  selectedMovie!: Movie;
  listSubscriptions: Subscription[] = [];
  tickets: Ticket[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private ticketsService: TicketsService
  ) { }

  ngOnInit(): void {
    this.movie_id = this.route.snapshot.params.id;
    this.getOne(this.movie_id)
  }

  getOne(id: number): void {
    const sub$1 = this.movieService.getOne(id).subscribe(val => this.selectedMovie = val);
    const sub$2 = this.ticketsService.getAll().pipe(
      filter((tickets: any) => {
        return tickets.filter((ticket: Ticket) => ticket.movie_id === id);
      })
    ).subscribe(val => {
      this.tickets = val
    });
    this.listSubscriptions.push(sub$1, sub$2);
  }

}
