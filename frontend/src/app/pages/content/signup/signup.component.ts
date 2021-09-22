import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MustMatch } from 'src/app/shared/directives/must-match.directive'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy {

  formSignup!: FormGroup;
  listSubscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm()
  }
  ngOnDestroy(): void {
    this.listSubscriptions.forEach(s => s.unsubscribe() );
  }

  buildForm() {
    this.formSignup = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordc: ['', [Validators.required]],
      acepted: [false, Validators.requiredTrue],
      rol: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'passwordc')
    })
  }

  get controls() {
    return this.formSignup.controls;
  }

  onSubmit() {
    if (this.formSignup.valid) {
      const sub$ = this.authService.signup(this.formSignup.value).subscribe( () => 
        this.router.navigate(['full'])
      )
      this.listSubscriptions.push( sub$ )
    }
  }

}
