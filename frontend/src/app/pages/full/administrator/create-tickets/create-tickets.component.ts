import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movie, Room } from 'src/app/interfaces';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { RoomService } from 'src/app/services/room/room.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-create-tickets',
  templateUrl: './create-tickets.component.html',
  styleUrls: ['./create-tickets.component.scss']
})

export class CreateTicketsComponent implements OnInit, OnDestroy{

  formTicket!: FormGroup;
  listSubscriptions: Subscription[] = [];
  rooms: Room[] = []
  movies: Movie[] = []

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private ticketsService: TicketsService,
    private roomService: RoomService,
    private movieService: MovieService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getSelectedData()
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach( s => s.unsubscribe )
  } 

  getSelectedData() {
    const sub$1 = this.roomService.getAll().subscribe( val => this.rooms = val )
    const sub$2 = this.movieService.getAll().subscribe( val => this.movies = val )
    this.listSubscriptions.push( sub$1, sub$2 )
  }

  get controls() {
    return this.formTicket.controls;
  }

  buildForm(): void {
    this.formTicket = this.fb.group({
      movie_id: ['', Validators.required],
      room_id: ['', Validators.required],
      hour: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.formTicket.valid) {
      const sub$ = this.ticketsService.create(this.formTicket.value).subscribe(() => {
        this.alertService.alertSuccess()
        this.formTicket.reset()
      })
      this.listSubscriptions.push(sub$)
    }
  }

}
