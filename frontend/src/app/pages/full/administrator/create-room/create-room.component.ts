import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { RoomService } from 'src/app/services/room/room.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from 'src/app/interfaces';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit, OnDestroy {

  rooms: Room[] = [];
  formRoom!: FormGroup;
  listSubscriptions: Subscription[] = [];
  search: string = "";

  constructor( 
    private fb: FormBuilder,
    private alertService: AlertService,
    private roomService: RoomService,
    private modalService: NgbModal,
    private searchService: SearchService,
    ) { 
      this.buildForm();
    }

  ngOnInit(): void {
    this.getAll();
    this.searchTerm();
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach( s => s.unsubscribe() );
  }

  searchTerm(): void {
    const sub$ = this.searchService.search.subscribe((val) => this.search = val)
    this.listSubscriptions.push(sub$)
  }

  getAll(): void {
    const sub$ = this.roomService.getAll().subscribe( val => this.rooms = val )
    this.listSubscriptions.push( sub$ )
  }

  get controls() {
    return this.formRoom.controls;
  }

  buildForm(): void {
    this.formRoom = this.fb.group({
      id: [],
      name : ['', Validators.required],
    })
  }

  delete(id: number): void {
    const sub$ = this.roomService.delete(id).subscribe(() => {
      this.getAll();
      this.alertService.alertDelete();
    })
    this.listSubscriptions.push(sub$)
  }

  create(): void {
    const sub$ = this.roomService.create(this.formRoom.value).subscribe(() => {
      this.getAll();
      this.alertService.alertSuccess()
      this.formRoom.reset()
    })
    this.listSubscriptions.push(sub$)
  }

  update(): void {
    const sub$ = this.roomService.update(this.formRoom.value.id, this.formRoom.value).subscribe(() => {
      this.getAll();
      this.alertService.alertSuccess()
      this.formRoom.reset()
    })
    this.listSubscriptions.push(sub$)
  }

  onSubmit(): void {
    if (this.formRoom.valid) {
      if (this.formRoom.value.id) {
        this.update()
      } else {
        this.create()
      }
    }
    this.modalService.dismissAll()
  }

  openModal(content: any, room?: Room) {
    this.formRoom.reset()
    if (room) this.formRoom.setValue(room)
    this.modalService.open(content, { centered: true });
  }

  closeModal(){
    this.modalService.dismissAll()
  }

}
