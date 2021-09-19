import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnDestroy {

  formRoom!: FormGroup;
  listSubscriptions: Subscription[] = []

  constructor( 
    private fb: FormBuilder,
    private alertService: AlertService,
    private roomService: RoomService
    ) { 
      this.buildForm();
    }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach( s => s.unsubscribe() );
  }

  get controls() {
    return this.formRoom.controls;
  }

  buildForm(): void {
    this.formRoom = this.fb.group({
      name : ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.formRoom.valid) {
      const sub$ = this.roomService.create(this.formRoom.value).subscribe(() => {
        this.alertService.alertSuccess()
        this.formRoom.reset()
      })
      this.listSubscriptions.push( sub$ )
    }
  }

}
