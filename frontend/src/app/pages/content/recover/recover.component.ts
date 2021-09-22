import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MustMatch } from 'src/app/shared/directives/must-match.directive';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnDestroy {

  formRecover!: FormGroup;
  listSubscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach( s => s.unsubscribe() )
  }

  get controls() {
    return this.formRecover.controls;
  }

  buildForm() {
    this.formRecover = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordc: ['', Validators.required]
    }, {
      Validator: MustMatch('password', 'passwordc')
    })
  }

  onSubmit() {
    if (this.formRecover.valid) {
      const sub$ = this.authService.recover(this.formRecover.value).subscribe( () =>
        this.alert.alertSuccess()
      )
      this.listSubscriptions.push( sub$ )
    }
  }


}
