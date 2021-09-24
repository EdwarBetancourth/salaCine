import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Movie, Ticket } from 'src/app/interfaces';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ConcurrentService } from 'src/app/services/concurrent/concurrent.service';
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
  id_user = Number(localStorage.getItem('id_user'))

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private ticketsService: TicketsService,
    private concurrentService: ConcurrentService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.movie_id = this.route.snapshot.params.id;
    this.getOne(this.movie_id)
  }

  getOne(id: number): void {
    const sub$1 = this.movieService.getOne(id).subscribe(val => this.selectedMovie = val);
    const sub$2 = this.ticketsService.getAll().pipe(
      map((tickets: any) => {
        return tickets.filter((ticket: Ticket) => Number(ticket.movie_id) === Number(id));
      })
    ).subscribe(val => {
      this.tickets = val
    });
    this.listSubscriptions.push(sub$1, sub$2);
  }


  addConcurrent(ticket: Ticket) {
    this.concurrentService.create({ticket_id: ticket.id, user_id: this.id_user})
        .subscribe(val => this.alertService.alertSuccess())
  }


}
