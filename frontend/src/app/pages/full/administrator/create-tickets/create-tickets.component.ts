import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Movie, Room, Ticket } from 'src/app/interfaces';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { RoomService } from 'src/app/services/room/room.service';
import { SearchService } from 'src/app/services/search/search.service';
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
  movies: Movie[] = [];
  tickets: Ticket[] = [];
  search: string = "";

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private ticketsService: TicketsService,
    private modalService: NgbModal,
    private roomService: RoomService,
    private movieService: MovieService,
    private searchService: SearchService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getSelectedData()
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach( s => s.unsubscribe )
  } 

  searchTerm(): void {
    const sub$ = this.searchService.search.subscribe((val) => this.search = val)
    this.listSubscriptions.push(sub$)
  }


  getSelectedData() {
    const sub$1 = this.roomService.getAll().subscribe( val => this.rooms = val )
    const sub$2 = this.movieService.getAll().subscribe( val => this.movies = val )
    const sub$3 = this.ticketsService.getAll().subscribe( val => this.tickets = val )
    this.listSubscriptions.push( sub$1, sub$2, sub$3 )
  }

  get controls() {
    return this.formTicket.controls;
  }

  buildForm(): void {
    this.formTicket = this.fb.group({
      id: [],
      movie_id: ['', Validators.required],
      room_id: ['', Validators.required],
      hour: ['', Validators.required]
    })
  }

  delete(id: number): void {
    const sub$ = this.ticketsService.delete(id).subscribe(() => {
      this.getSelectedData();
      this.alertService.alertDelete();
    })
    this.listSubscriptions.push(sub$)
  }


  create(): void {
    const sub$ = this.ticketsService.create(this.formTicket.value).subscribe(() => {
      this.getSelectedData();
      this.alertService.alertSuccess()
      this.formTicket.reset()
    })
    this.listSubscriptions.push(sub$)
  }

  update(): void {
    const sub$ = this.ticketsService.update(this.formTicket.value.id, this.formTicket.value).subscribe(() => {
      this.getSelectedData();
      this.alertService.alertSuccess()
      this.formTicket.reset()
    })
    this.listSubscriptions.push(sub$)
  }

  onSubmit() {
    if (this.formTicket.valid) {
      if (this.formTicket.value.id) {
        this.update()
      } else {
        this.create()
      }
    }
    this.closeModal()
  }


  openModal(content: any, ticket?: Ticket) {
    this.formTicket.reset()
    if (ticket) {
      const { movie, room, ...updateTicket } = ticket;
      this.formTicket.setValue(updateTicket)
    }
    this.modalService.open(content, { centered: true });
  }

  closeModal(){
    this.modalService.dismissAll()
  }


}
